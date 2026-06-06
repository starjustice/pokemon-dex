// ─── Types ────────────────────────────────────────────────────────

export interface LocationBasic {
  id: number;
  name: string;
  region: string;
  areaCount: number;
}

export interface EncounterEntry {
  pokemonName: string;
  pokemonId: number;
  method: string;
  minLevel: number;
  maxLevel: number;
  chance: number;
}

export interface AreaEncounter {
  areaName: string;
  encounters: EncounterEntry[];
}

export interface LocationDetail extends LocationBasic {
  areas: AreaEncounter[];
}

// ─── PokeAPI response types ──────────────────────────────────────

interface PokeAPIListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokeAPIRegionResponse {
  id: number;
  name: string;
  locations: { name: string; url: string }[];
}

interface PokeAPILocationResponse {
  id: number;
  name: string;
  region: { name: string } | null;
  areas: { name: string; url: string }[];
}

interface PokeAPILocationAreaResponse {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: { name: string; url: string };
    version_details: {
      version: { name: string };
      max_chance: number;
      encounter_details: {
        min_level: number;
        max_level: number;
        chance: number;
        method: { name: string };
      }[];
    }[];
  }[];
}

export interface VersionGroup {
  name: string;
  versions: string[];
  regions: string[];
  generation: string;
}

interface PokeAPIVersionGroupResponse {
  id: number;
  name: string;
  generation: { name: string };
  versions: { name: string }[];
  regions: { name: string }[];
}

// ─── Caches ───────────────────────────────────────────────────────

let regionMapCache: Map<number, string> | null = null;
let regionLocationsCache: Map<string, Set<number>> | null = null;
let locationNamesCache: { id: number; name: string }[] | null = null;
let versionGroupsCache: VersionGroup[] | null = null;

// ─── Helpers ──────────────────────────────────────────────────────

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function formatLocationName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Data Fetching ────────────────────────────────────────────────

export async function fetchRegionMap(): Promise<Map<number, string>> {
  if (regionMapCache) return regionMapCache;

  const res = await fetch("https://pokeapi.co/api/v2/region/?limit=20");
  const data: PokeAPIListResponse = await res.json();

  const map = new Map<number, string>();
  const regionLocs = new Map<string, Set<number>>();

  await Promise.all(
    data.results.map(async (r) => {
      const regionRes = await fetch(r.url);
      const region: PokeAPIRegionResponse = await regionRes.json();
      const set = new Set<number>();
      for (const loc of region.locations) {
        const locId = extractIdFromUrl(loc.url);
        map.set(locId, region.name);
        set.add(locId);
      }
      regionLocs.set(region.name, set);
    })
  );

  regionMapCache = map;
  regionLocationsCache = regionLocs;
  return map;
}

export async function getRegionLocations(): Promise<Map<string, Set<number>>> {
  if (!regionLocationsCache) await fetchRegionMap();
  return regionLocationsCache!;
}

export async function fetchVersionGroups(): Promise<VersionGroup[]> {
  if (versionGroupsCache) return versionGroupsCache;

  const res = await fetch("https://pokeapi.co/api/v2/version-group/?limit=50");
  const data: PokeAPIListResponse = await res.json();

  versionGroupsCache = await Promise.all(
    data.results.map(async (r) => {
      const detailRes = await fetch(r.url);
      const detail: PokeAPIVersionGroupResponse = await detailRes.json();
      return {
        name: detail.name,
        versions: detail.versions.map((v) => v.name),
        regions: detail.regions.map((reg) => reg.name),
        generation: detail.generation.name,
      };
    })
  );

  return versionGroupsCache;
}

export async function getLocationIdsForGame(versionGroupName: string): Promise<Set<number>> {
  const [versionGroups, regionLocs] = await Promise.all([
    fetchVersionGroups(),
    getRegionLocations(),
  ]);

  const vg = versionGroups.find((v) => v.name === versionGroupName);
  if (!vg) return new Set();

  const ids = new Set<number>();
  for (const regionName of vg.regions) {
    const locs = regionLocs.get(regionName);
    if (locs) for (const id of locs) ids.add(id);
  }
  return ids;
}

export async function getVersionGroupsForRegion(regionName: string): Promise<VersionGroup[]> {
  const versionGroups = await fetchVersionGroups();
  return versionGroups.filter((vg) => vg.regions.includes(regionName));
}

export async function fetchAllLocationNames(): Promise<{ id: number; name: string }[]> {
  if (locationNamesCache) return locationNamesCache;

  const res = await fetch("https://pokeapi.co/api/v2/location/?limit=1100");
  const data: PokeAPIListResponse = await res.json();

  locationNamesCache = data.results.map((r) => ({
    id: extractIdFromUrl(r.url),
    name: r.name,
  }));

  return locationNamesCache;
}

export async function fetchLocationPage(
  offset: number,
  limit: number
): Promise<{ locations: LocationBasic[]; total: number }> {
  const [listRes, regionMap] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/location/?offset=${offset}&limit=${limit}`),
    fetchRegionMap(),
  ]);

  const listData: PokeAPIListResponse = await listRes.json();

  const locations: LocationBasic[] = await Promise.all(
    listData.results.map(async (r) => {
      const id = extractIdFromUrl(r.url);
      const locRes = await fetch(r.url);
      const loc: PokeAPILocationResponse = await locRes.json();
      return {
        id,
        name: loc.name,
        region: loc.region?.name ?? regionMap.get(id) ?? "unknown",
        areaCount: loc.areas.length,
      };
    })
  );

  return { locations, total: listData.count };
}

export async function fetchLocationDetail(id: number): Promise<LocationDetail> {
  const [locRes, regionMap] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/location/${id}/`),
    fetchRegionMap(),
  ]);

  if (!locRes.ok) throw new Error(`Location ${id} not found`);

  const loc: PokeAPILocationResponse = await locRes.json();

  // Fetch all areas with encounters
  const areas: AreaEncounter[] = await Promise.all(
    loc.areas.map(async (area) => {
      const areaRes = await fetch(area.url);
      const areaData: PokeAPILocationAreaResponse = await areaRes.json();

      // Merge encounters across all versions
      const encounterMap = new Map<string, EncounterEntry>();

      for (const pe of areaData.pokemon_encounters) {
        const pokemonId = extractIdFromUrl(pe.pokemon.url);
        for (const vd of pe.version_details) {
          for (const ed of vd.encounter_details) {
            const key = `${pe.pokemon.name}-${ed.method.name}`;
            const existing = encounterMap.get(key);
            if (existing) {
              existing.minLevel = Math.min(existing.minLevel, ed.min_level);
              existing.maxLevel = Math.max(existing.maxLevel, ed.max_level);
              existing.chance = Math.max(existing.chance, ed.chance);
            } else {
              encounterMap.set(key, {
                pokemonName: pe.pokemon.name,
                pokemonId,
                method: ed.method.name,
                minLevel: ed.min_level,
                maxLevel: ed.max_level,
                chance: ed.chance,
              });
            }
          }
        }
      }

      return {
        areaName: area.name,
        encounters: Array.from(encounterMap.values()).sort((a, b) => b.chance - a.chance),
      };
    })
  );

  return {
    id: loc.id,
    name: loc.name,
    region: loc.region?.name ?? regionMap.get(loc.id) ?? "unknown",
    areaCount: loc.areas.length,
    areas,
  };
}
