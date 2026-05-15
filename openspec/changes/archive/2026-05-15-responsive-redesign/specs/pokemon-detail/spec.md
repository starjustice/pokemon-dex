## MODIFIED Requirements

### Requirement: Detail page mobile typography and spacing
The detail page SHALL use responsive typography for mobile readability. Section headings SHALL be `text-lg` on mobile, `text-xl` on `sm+`. Body text (flavor text, descriptions) SHALL be `text-base` on mobile. Horizontal padding SHALL be `px-4` on mobile, `px-6` on `sm`, `px-8` on `lg`. Section vertical spacing SHALL be `space-y-6` on mobile, `space-y-8` on `sm+`.

#### Scenario: Detail page readable on mobile
- **WHEN** viewing a Pokemon detail page on a phone
- **THEN** flavor text is `text-base`, headings are `text-lg`, and horizontal padding is `px-4`

#### Scenario: Detail page spacing on desktop
- **WHEN** viewing a Pokemon detail page on desktop
- **THEN** section spacing is `space-y-8`, padding is `px-8`, headings are `text-xl`

### Requirement: Font family uses Geist
The application SHALL use the Geist font family (loaded via next/font) for all text. The body SHALL not fall back to Arial. The `font-sans` Tailwind utility (which resolves to Geist) SHALL be applied to the body element.

#### Scenario: Geist font applied
- **WHEN** viewing any page
- **THEN** text renders in Geist font (not Arial/Helvetica fallback)
