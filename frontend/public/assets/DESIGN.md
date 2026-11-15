---
name: Agro-Modernist Organic
colors:
  surface: '#f4fbf6'
  surface-dim: '#d4dcd7'
  surface-bright: '#f4fbf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f0'
  surface-container: '#e8f0ea'
  surface-container-high: '#e3eae5'
  surface-container-highest: '#dde4df'
  on-surface: '#161d1a'
  on-surface-variant: '#404945'
  inverse-surface: '#2b322f'
  inverse-on-surface: '#ebf2ed'
  outline: '#707974'
  outline-variant: '#c0c9c3'
  surface-tint: '#376757'
  primary: '#003629'
  on-primary: '#ffffff'
  primary-container: '#1b4d3e'
  on-primary-container: '#8abda9'
  inverse-primary: '#9ed1bd'
  secondary: '#825500'
  on-secondary: '#ffffff'
  secondary-container: '#ffbd5e'
  on-secondary-container: '#754c00'
  tertiary: '#0e351f'
  on-tertiary: '#ffffff'
  tertiary-container: '#274c34'
  on-tertiary-container: '#93bc9d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baeed9'
  primary-fixed-dim: '#9ed1bd'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#1d4f40'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#fcba5b'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#c2edcb'
  tertiary-fixed-dim: '#a7d1b0'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#294e36'
  background: '#f4fbf6'
  on-background: '#161d1a'
  surface-variant: '#dde4df'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses an earthy yet technologically sophisticated ethos tailored for modern precision agriculture, smart crop management, and field-to-cloud agricultural intelligence. It targets agricultural producers, farm managers, agronomists, and supply-chain partners who require clean, legible data interfaces in variable lighting conditions—from direct sunlight in the cab of a combine to fluorescent desktop command centers.

The emotional signature balances grounded agricultural dependability with the precision of modern data science. It avoids generic corporate green tropes or faux-rustic textures. Instead, it pairs architectural typography with tactile, soft-edged surfaces and deep natural tones. The visual language blends Modern Minimalism with Subtle Tactility: spacious layouts, crisp micro-borders, organic earth-inspired accents, and luminous surfaces that convey abundance, growth, and calibrated control.

## Colors

The palette draws directly from fertile soil, active canopy foliage, ripening crops, and morning sunlight:

- **Primary (`#1B4D3E` - Deep Fertile Forest Emerald):** Anchors primary brand actions, primary navigation bars, active metric cards, and key agricultural state indicators. Evokes vigorous plant health and institutional stability.
- **Secondary (`#D4973B` - Rich Amber Golden Wheat):** Highlights high-value insights, yield metrics, alert badges, and focal interactive calls-to-action. Carries warmth and harvest-stage vitality without triggering generic warning alarms.
- **Tertiary (`#5B8266` - Field Sage):** Bridges data visualizations, supporting badges, secondary status states, and subtle ecological telemetry (e.g., soil moisture, pest pressure index).
- **Neutral (`#1E2522` - Crisp Slate Charcoal):** Provides high-contrast text and structural lines without the harsh fatigue of pure pitch black. Ensures daylight legibility on field tablets.
- **Canvas & Surface System:**
  - Base canvas: `#FAF7F0` (Warm Sunlight Cream), providing a soft, natural backdrop that eliminates glare.
  - Card surfaces: `#FFFFFF` (Pure Solar White) to create clean separation against the cream ground.
  - Subdued surfaces / inputs: `#F2ECE1` (Milled Oat).

## Typography

The typographic hierarchy combines structural character with mechanical precision:

- **Headlines (Epilogue):** An expressive geometric sans with subtle humanist nuances. At display scales, its generous proportions and distinctive glyph cuts reflect engineered confidence and agricultural scale.
- **Body (Hanken Grotesk):** Clean, open counters and neutral stroke modulation guarantee instant readability for operational procedures, field activity logs, and weather commentary.
- **Telemetry & Labels (JetBrains Mono):** Monospaced precision reserved for field coordinates, sensor IDs, soil pH levels, moisture percentages, and timestamp telemetry. This separation distinguishes real-time technical sensor data from general descriptive text.

## Layout & Spacing

The layout model is built on an adaptive 12-column fluid grid on desktop (`1200px+`) and tablet landscape, collapsing to an 8-column system on tablet portrait (`768px - 1199px`), and a 4-column system on mobile (`< 768px`).

Grid gutters use `1.5rem` (`24px`) on desktop for airy data presentation and collapse to `1rem` (`16px`) on mobile viewports to maximize data density. Canvas outer margins provide a sturdy frame (`2.5rem` on desktop, tapering to `1.25rem` on phones).

Components align strictly to an 8-point base spatial rhythm. Data density scales dynamically: sensor dashboards compress vertical gaps using `space-xs` and `space-sm` between telemetry values and labels, while informational feeds and analytical report views utilize `space-lg` and `space-xl` to ensure cognitive ease during critical decision-making.

## Elevation & Depth

Visual hierarchy uses tonal surface layering combined with soft, warm-tinted ambient shadows that mimic natural outdoor overhead sunlight:

- **Surface Tiers:**
  - `Level 0 (Canvas):` Deep background `#FAF7F0` (Sunlight Cream).
  - `Level 1 (Cards & Modules):` `#FFFFFF` (Pure White) with a fine hairline border (`1px solid rgba(30, 37, 34, 0.07)`).
  - `Level 2 (Dropdowns, Overlays & Floating Panels):` Elevated surfaces floating over the canvas, using a soft amber-tinted ambient drop shadow: `0 8px 24px -4px rgba(45, 38, 26, 0.08), 0 2px 6px -1px rgba(45, 38, 26, 0.04)`.
  - `Level 3 (Modals & Alerts):` Higher focal elevation with `0 20px 40px -8px rgba(27, 77, 62, 0.16)`.

No pure gray drop shadows are permitted; all shadows must carry a faint olive-amber undertone (`rgba(45, 38, 26, ...)`) to preserve chromatic cohesion with the cream canvas.

## Shapes

The design system employs a balanced `Rounded` (Level 2) geometry:
- Standard interactive elements (inputs, select triggers, table badges) feature a `0.5rem` (`8px`) border radius.
- Cards, summary panels, and data modules use `rounded-lg` (`1rem` / `16px`).
- Heavy hero containers, dashboard view wrappers, and dialog modals utilize `rounded-xl` (`1.5rem` / `24px`).
- Filter tags and real-time status chips adopt fully rounded pills (`9999px`) to immediately signal high interactivity and categorization distinct from structural card containers.

## Components

### Buttons
- **Primary:** Filled `#1B4D3E` (Forest Emerald) with `#FAF7F0` text, `0.5rem` radius, bold sans label. Subtle scale on active tap (`0.98`). Hover introduces a 4% lighter tint overlay.
- **Secondary / Accent:** Filled `#D4973B` (Amber Wheat) with `#1E2522` text, used exclusively for primary positive actions like "Confirm Harvest Plan" or "Deploy Irrigation".
- **Outlined / Tertiary:** Transparent background, `1px solid rgba(27, 77, 62, 0.25)`, text in `#1B4D3E`. Hover fills with `#FAF7F0`.

### Cards & Modules
- Primary containers for field analytics and weather data. Pure white base with `rounded-lg` (`16px`), `1px solid rgba(30, 37, 34, 0.07)` border, and a subtle amber-tinted shadow.
- Header bars inside cards use `Hanken Grotesk` medium labels paired with uppercase `JetBrains Mono` telemetry status badges.

### Chips & Filter Tags
- Fully pill-shaped (`9999px`).
- Inactive: Surface `#F2ECE1`, text `#1E2522`.
- Active: Surface `#1B4D3E`, text `#FFFFFF`.
- Telemetry Chips: Monospaced font, displaying field statuses such as `MOISTURE: OPTIMAL` or `NDVI: 0.78` using green or amber tint accents with soft pill backgrounds.

### Form Inputs & Select Fields
- Height of 44px minimum for reliable touch interaction in field equipment.
- Background `#FFFFFF`, border `1px solid rgba(30, 37, 34, 0.16)`, text `#1E2522`. Focus state features a crisp `2px` focus ring in `#1B4D3E` with `2px` offset.
- Floating helper labels rendered in `JetBrains Mono` for field telemetry units (e.g., `ac`, `bu/ac`, `ppm`).

### Checkboxes & Radio Buttons
- `20px` touch targets with `4px` corner radii for checkboxes and circular geometry for radios.
- Unchecked: `1.5px solid rgba(30, 37, 34, 0.3)`. Checked: `#1B4D3E` fill with an off-white `#FAF7F0` checkmark icon.

### Agricultural Telemetry Gauges (Specialty Component)
- Compact, high-readability widgets displaying live sensor readouts (soil moisture, barometric trend, canopy temp).
- Composed of a segmented circular or linear progress track in `#F2ECE1`, filled with dynamic threshold colors (`#1B4D3E` for nominal, `#D4973B` for cautionary alerts), flanked by bold `JetBrains Mono` value indicators.