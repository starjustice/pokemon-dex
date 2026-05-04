/**
 * Static set of Pokemon IDs that have at least one mega evolution form.
 * This list is fixed — mega evolutions were only introduced in Gen 6/7
 * and no new megas have been added since Sun/Moon.
 */
export const MEGA_IDS = new Set<number>([
  3,   // Venusaur
  6,   // Charizard
  9,   // Blastoise
  15,  // Beedrill
  18,  // Pidgeot
  65,  // Alakazam
  80,  // Slowbro
  94,  // Gengar
  115, // Kangaskhan
  127, // Pinsir
  130, // Gyarados
  142, // Aerodactyl
  150, // Mewtwo
  181, // Ampharos
  208, // Steelix
  212, // Scizor
  214, // Heracross
  229, // Houndoom
  248, // Tyranitar
  254, // Sceptile
  257, // Blaziken
  260, // Swampert
  282, // Gardevoir
  302, // Sableye
  303, // Mawile
  306, // Aggron
  308, // Medicham
  310, // Manectric
  319, // Sharpedo
  323, // Camerupt
  334, // Altaria
  354, // Banette
  359, // Absol
  362, // Glalie
  373, // Salamence
  376, // Metagross
  380, // Latias
  381, // Latios
  384, // Rayquaza
  428, // Lopunny
  445, // Garchomp
  448, // Lucario
  460, // Abomasnow
  475, // Gallade
  531, // Audino
  719, // Diancie
]);

/**
 * Maps base Pokemon ID → array of mega evolution form IDs from PokeAPI.
 * Only includes actual mega evolutions (excludes -mega-z event forms).
 * Used to fetch mega form data alongside base Pokemon in the grid.
 */
export const MEGA_MAP: Record<number, number[]> = {
  3:   [10033],         // venusaur-mega
  6:   [10034, 10035],  // charizard-mega-x, charizard-mega-y
  9:   [10036],         // blastoise-mega
  15:  [10090],         // beedrill-mega
  18:  [10073],         // pidgeot-mega
  65:  [10037],         // alakazam-mega
  80:  [10071],         // slowbro-mega
  94:  [10038],         // gengar-mega
  115: [10039],         // kangaskhan-mega
  127: [10040],         // pinsir-mega
  130: [10041],         // gyarados-mega
  142: [10042],         // aerodactyl-mega
  150: [10043, 10044],  // mewtwo-mega-x, mewtwo-mega-y
  181: [10045],         // ampharos-mega
  208: [10072],         // steelix-mega
  212: [10046],         // scizor-mega
  214: [10047],         // heracross-mega
  229: [10048],         // houndoom-mega
  248: [10049],         // tyranitar-mega
  254: [10065],         // sceptile-mega
  257: [10050],         // blaziken-mega
  260: [10064],         // swampert-mega
  282: [10051],         // gardevoir-mega
  302: [10066],         // sableye-mega
  303: [10052],         // mawile-mega
  306: [10053],         // aggron-mega
  308: [10054],         // medicham-mega
  310: [10055],         // manectric-mega
  319: [10070],         // sharpedo-mega
  323: [10087],         // camerupt-mega
  334: [10067],         // altaria-mega
  354: [10056],         // banette-mega
  359: [10057],         // absol-mega
  362: [10074],         // glalie-mega
  373: [10089],         // salamence-mega
  376: [10076],         // metagross-mega
  380: [10062],         // latias-mega
  381: [10063],         // latios-mega
  384: [10079],         // rayquaza-mega
  428: [10088],         // lopunny-mega
  445: [10058],         // garchomp-mega
  448: [10059],         // lucario-mega
  460: [10060],         // abomasnow-mega
  475: [10068],         // gallade-mega
  531: [10069],         // audino-mega
  719: [10075],         // diancie-mega
};
