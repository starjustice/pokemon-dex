## 1. Create TiltImage Component

- [x] 1.1 Create `components/TiltImage.tsx` as a client component. Accept `src`, `alt`, `size` props. Implement mouse/touch tracking with `onMouseMove`/`onTouchMove`, calculate rotateX/Y from normalized position, apply via inline `transform` style with `perspective(1000px)`. Reset on leave/end with 0.6s ease-out transition. Include rAF throttle.
- [x] 1.2 Add shine overlay inside TiltImage — an absolute-positioned div with a linear-gradient that shifts `background-position` based on tilt angle (opacity 0.15).

## 2. Add Animated Sprite

- [x] 2.1 Add `animatedSprite` URL field to `PokemonDetail` type in `lib/pokemon.ts`. Set it to the Showdown sprite URL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/{id}.gif`.
- [x] 2.2 In the detail page hero section, render the animated sprite as a small (64px) image below the main artwork with an "Animated" label. Use `onError` to hide if 404.

## 3. Integrate TiltImage in Detail Page

- [x] 3.1 Replace the static `<Image>` in the detail page hero with `<TiltImage>` wrapping the existing Next.js Image.

## 4. Verify

- [x] 4.1 Run build and confirm no errors.
