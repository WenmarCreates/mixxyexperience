Update the Little Mixxy landing page with new hero copy, corrected Mini Mixxy package details, and a new Tap & Go Wall package.

## Scope
1. **Hero Section** — Replace headline and description copy.
2. **Pricing Section** — Fix Mini Mixxy Satellite Bar features; add new "Mixxy Tap & Go" package card.
3. **Booking Form** — Add Tap & Go Wall as a selectable add-on option (same pattern as Mini Mixxy Satellite Bar) and include it in the webhook payload.

## Details

### 1. HeroSection.tsx
Update to:
- Subtitle: "Welcome to"
- Title: "LITTLE MIXXY"
- Tagline: "Atlanta's Luxury Mobile Beverage Experience"
- Body: "From our authentic Italian-inspired Piaggio Ape 6-tap beverage cart to our Mini Mixxy Satellite Bar and luxury Tap & Go Self-Serve Wall, we create unforgettable beverage experiences for weddings, corporate events, brand activations, festivals, and private celebrations. Let's Get Mixxy!"

Keep existing styling, animations, and CTA buttons.

### 2. PricingSection.tsx

#### Mini Mixxy Satellite Bar — update features to:
- 2-Hour Minimum
- 2 Licensed bartenders
- Drinkware, napkins, straws, ice & garnishes
- Full setup & breakdown
- Luxury bar décor & custom drink signage
- Insurance included
- Service within a 30-mile radius

#### Add Mixxy Tap & Go Wall — new card:
- Name: "Mixxy Tap & Go"
- Subtitle: "Luxury 4-Tap Self-Serve Wall"
- Description: "Perfect for weddings, cocktail hours, corporate events, private parties, brand activations, and upscale celebrations."
- Price: "$250/hr"
- Features:
  - 4-tap self-serve beverage wall
  - 2-Hour Minimum
  - Any combination of four: beer, wine, champagne, prosecco, signature cocktails, or mocktails
  - 1 Tap-Tender
  - Elegant fluted wall design with LED lighting
  - Drinkware, napkins, straws, ice & garnishes
  - Full setup & breakdown
  - Luxury bar décor & custom drink signage
  - Insurance included
  - Service within a 30-mile radius

Place the Tap & Go card alongside Mini Mixxy Satellite Bar in a 2-column row below the main 4 packages, so both hourly/secondary packages sit together.

### 3. BookingSection.tsx
- Add a new selectable option for "Mixxy Tap & Go Wall" (value: "tap-and-go", label: "Mixxy Tap & Go Wall", $250/hr) using the same checkbox/toggle pattern as Mini Mixxy Satellite Bar.
- Allow it to be selected together with a main package, just like Mini Mixxy.
- Include it in the webhook payload as `"Mixxy Tap & Go Wall": "Yes"` when selected.
- Update Mini Mixxy option label/sub text if needed for consistency.

## Verification
- Run TypeScript check and build.
- Confirm pricing cards render correctly on desktop and mobile.
- Confirm booking form selection and payload include the new Tap & Go option.
