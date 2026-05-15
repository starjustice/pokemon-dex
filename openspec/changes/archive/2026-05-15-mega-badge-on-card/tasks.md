## 1. Create Static Mega ID Lookup

- [x] 1.1 Create `lib/mega-ids.ts` exporting a `MEGA_IDS = new Set<number>([...])` with all 46 Pokemon IDs that have mega evolutions: 3, 6, 9, 15, 18, 65, 80, 94, 115, 127, 130, 142, 150, 181, 208, 212, 214, 229, 248, 254, 257, 260, 282, 302, 303, 306, 308, 310, 315, 319, 323, 334, 354, 359, 362, 373, 376, 380, 381, 384, 428, 445, 448, 460, 475, 531.

## 2. Add Badge to PokemonCard

- [x] 2.1 Import `MEGA_IDS` in `components/PokemonCard.tsx`. When `MEGA_IDS.has(pokemon.id)` is true, render a small "MEGA" badge in the top-left of the card. Style as a purple rounded-full pill with white text (`bg-purple-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full`).

## 3. Verify

- [x] 3.1 Run build and confirm no errors.
