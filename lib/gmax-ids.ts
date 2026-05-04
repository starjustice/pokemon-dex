/**
 * Static map of base Pokemon IDs that have a Gigantamax form.
 * Maps base dex ID → G-Max form name (PokeAPI name).
 * 34 Gigantamax forms introduced in Gen 8 (Sword/Shield).
 */
export const GMAX_MAP: Record<number, string> = {
  3:   "venusaur-gmax",
  6:   "charizard-gmax",
  9:   "blastoise-gmax",
  12:  "butterfree-gmax",
  25:  "pikachu-gmax",
  52:  "meowth-gmax",
  68:  "machamp-gmax",
  94:  "gengar-gmax",
  99:  "kingler-gmax",
  131: "lapras-gmax",
  133: "eevee-gmax",
  143: "snorlax-gmax",
  569: "garbodor-gmax",
  809: "melmetal-gmax",
  812: "rillaboom-gmax",
  815: "cinderace-gmax",
  818: "inteleon-gmax",
  823: "corviknight-gmax",
  826: "orbeetle-gmax",
  834: "drednaw-gmax",
  839: "coalossal-gmax",
  841: "flapple-gmax",
  842: "appletun-gmax",
  844: "sandaconda-gmax",
  849: "toxtricity-amped-gmax",   // amped form; low-key shares same G-Max move
  851: "centiskorch-gmax",
  858: "hatterene-gmax",
  861: "grimmsnarl-gmax",
  869: "alcremie-gmax",
  879: "copperajah-gmax",
  884: "duraludon-gmax",
  892: "urshifu-single-strike-gmax", // single-strike form
};

/**
 * Max Moves by type. Every Dynamax Pokemon can use these moves
 * (one per type, derived from the type of their attack move).
 * Max Guard is used in place of status moves.
 * Data from PokeAPI move IDs 743, 757–774.
 */
export interface MaxMove {
  name: string;
  power: number;
  effect: string;
}

export const MAX_MOVES: Record<string, MaxMove> = {
  normal:   { name: "Max Strike",     power: 100, effect: "Lowers the Speed of all opponents." },
  fire:     { name: "Max Flare",      power: 100, effect: "Intensifies the sun for five turns." },
  water:    { name: "Max Geyser",     power: 100, effect: "Creates rain for five turns." },
  electric: { name: "Max Lightning",  power: 100, effect: "Creates Electric Terrain for five turns." },
  grass:    { name: "Max Overgrowth", power: 100, effect: "Creates Grassy Terrain for five turns." },
  ice:      { name: "Max Hailstorm",  power: 100, effect: "Creates a hailstorm for five turns." },
  fighting: { name: "Max Knuckle",    power: 100, effect: "Raises the Attack of all allies." },
  poison:   { name: "Max Ooze",       power: 100, effect: "Raises the Sp. Atk of all allies." },
  ground:   { name: "Max Quake",      power: 100, effect: "Raises the Sp. Def of all allies." },
  flying:   { name: "Max Airstream",  power: 100, effect: "Raises the Speed of all allies." },
  psychic:  { name: "Max Mindstorm",  power: 100, effect: "Creates Psychic Terrain for five turns." },
  bug:      { name: "Max Flutterby",  power: 100, effect: "Lowers the Sp. Atk of all opponents." },
  rock:     { name: "Max Rockfall",   power: 100, effect: "Creates a sandstorm for five turns." },
  ghost:    { name: "Max Phantasm",   power: 100, effect: "Lowers the Defense of all opponents." },
  dragon:   { name: "Max Wyrmwind",   power: 100, effect: "Lowers the Attack of all opponents." },
  dark:     { name: "Max Darkness",   power: 100, effect: "Lowers the Sp. Def of all opponents." },
  steel:    { name: "Max Steelspike", power: 100, effect: "Raises the Defense of all allies." },
  fairy:    { name: "Max Starfall",   power: 100, effect: "Creates Misty Terrain for five turns." },
  // Status moves become Max Guard
  status:   { name: "Max Guard",      power: 0,   effect: "Protects the user from all attacks this turn." },
};

/**
 * Exclusive G-Max Moves. Only Gigantamax Pokemon can use these
 * instead of the generic Max Move for their type.
 * Keyed by the base G-Max form name.
 */
export interface GMaxMove {
  name: string;
  type: string;
  effect: string;
}

export const GMAX_MOVES: Record<string, GMaxMove> = {
  "venusaur-gmax":              { name: "G-Max Vine Lash",      type: "grass",    effect: "Traps and damages non-Grass-type opponents for four turns." },
  "charizard-gmax":             { name: "G-Max Wildfire",        type: "fire",     effect: "Traps and damages non-Fire-type opponents for four turns." },
  "blastoise-gmax":             { name: "G-Max Cannonade",       type: "water",    effect: "Traps and damages non-Water-type opponents for four turns." },
  "butterfree-gmax":            { name: "G-Max Befuddle",        type: "bug",      effect: "Inflicts poison, paralysis, or sleep on all opponents." },
  "pikachu-gmax":               { name: "G-Max Volt Crash",      type: "electric", effect: "Paralyzes all opponents." },
  "meowth-gmax":                { name: "G-Max Gold Rush",       type: "normal",   effect: "Confuses all opponents and earns extra money after battle." },
  "machamp-gmax":               { name: "G-Max Chi Strike",      type: "fighting", effect: "Raises the critical-hit ratios of the user and allies." },
  "gengar-gmax":                { name: "G-Max Terror",          type: "ghost",    effect: "Prevents all opponents from escaping or switching out." },
  "kingler-gmax":               { name: "G-Max Foam Burst",      type: "water",    effect: "Harshly lowers Speed of all opponents." },
  "lapras-gmax":                { name: "G-Max Resonance",       type: "ice",      effect: "Reduces damage received by the user and allies for five turns." },
  "eevee-gmax":                 { name: "G-Max Cuddle",          type: "normal",   effect: "Infatuates all opponents." },
  "snorlax-gmax":               { name: "G-Max Replenish",       type: "normal",   effect: "Randomly restores Berries that have been used." },
  "garbodor-gmax":              { name: "G-Max Malodor",         type: "poison",   effect: "Poisons all opponents." },
  "melmetal-gmax":              { name: "G-Max Meltdown",        type: "steel",    effect: "Prevents all opponents from using the same move twice in a row." },
  "rillaboom-gmax":             { name: "G-Max Drum Solo",       type: "grass",    effect: "Ignores the target's ability." },
  "cinderace-gmax":             { name: "G-Max Fireball",        type: "fire",     effect: "Ignores the target's ability." },
  "inteleon-gmax":              { name: "G-Max Hydrosnipe",      type: "water",    effect: "Ignores the target's ability." },
  "corviknight-gmax":           { name: "G-Max Wind Rage",       type: "flying",   effect: "Removes screens, hazards, and terrain from the battlefield." },
  "orbeetle-gmax":              { name: "G-Max Gravitas",        type: "psychic",  effect: "Changes gravity for five turns." },
  "drednaw-gmax":               { name: "G-Max Stonesurge",      type: "water",    effect: "Sets Stealth Rock on the opponent's side." },
  "coalossal-gmax":             { name: "G-Max Volcalith",       type: "rock",     effect: "Traps and damages non-Rock-type opponents for four turns." },
  "flapple-gmax":               { name: "G-Max Tartness",        type: "grass",    effect: "Lowers the evasiveness of all opponents." },
  "appletun-gmax":              { name: "G-Max Sweetness",       type: "grass",    effect: "Cures status conditions of the user and allies." },
  "sandaconda-gmax":            { name: "G-Max Sandblast",       type: "ground",   effect: "Traps and damages all opponents in a sandstorm for four turns." },
  "toxtricity-amped-gmax":      { name: "G-Max Stun Shock",      type: "electric", effect: "Poisons or paralyzes all opponents." },
  "centiskorch-gmax":           { name: "G-Max Centiferno",      type: "fire",     effect: "Traps opponents in a vortex of fire for four to five turns." },
  "hatterene-gmax":             { name: "G-Max Smite",           type: "fairy",    effect: "Confuses all opponents." },
  "grimmsnarl-gmax":            { name: "G-Max Snooze",          type: "dark",     effect: "Causes drowsiness that may put the opponent to sleep next turn." },
  "alcremie-gmax":              { name: "G-Max Finale",          type: "fairy",    effect: "Heals the HP of the user and its allies by 1/6 each." },
  "copperajah-gmax":            { name: "G-Max Steelsurge",      type: "steel",    effect: "Sets sharp spikes of steel on the opponent's side." },
  "duraludon-gmax":             { name: "G-Max Depletion",       type: "dragon",   effect: "Reduces the last PP of the target's last used move." },
  "urshifu-single-strike-gmax": { name: "G-Max One Blow",        type: "dark",     effect: "Can strike through Max Guard and Protect." },
  "urshifu-rapid-strike-gmax":  { name: "G-Max Rapid Flow",      type: "water",    effect: "Can strike through Max Guard and Protect." },
};
