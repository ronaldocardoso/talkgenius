---
name: TalkGenius AI
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cac4d0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#948f9a'
  outline-variant: '#49454f'
  surface-tint: '#d0bcff'
  primary: '#e9ddff'
  on-primary: '#37265e'
  primary-container: '#d0bcff'
  on-primary-container: '#594983'
  inverse-primary: '#665590'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d4'
  on-secondary-container: '#00424e'
  tertiary: '#ffdcbb'
  on-tertiary: '#492900'
  tertiary-container: '#ffb869'
  on-tertiary-container: '#784700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#210f48'
  on-primary-fixed-variant: '#4d3d76'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcbc'
  tertiary-fixed-dim: '#ffb86a'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#683d00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-charcoal: '#050505'
  on-surface-muted: '#A3A3A3'
  border-glass: rgba(255, 255, 255, 0.12)
  glow-purple: rgba(139, 92, 246, 0.4)
  glow-cyan: rgba(6, 182, 212, 0.25)
  accent-gradient-start: '#a078ff'
  accent-gradient-end: '#03b5d3'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.02'
    letterSpacing: -0.05em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '800'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style
The brand personality is high-end, futuristic, and technically sophisticated. It targets global professionals who require absolute reliability and "magic-like" assistance in high-stakes environments. 

The design style is a refined **Glassmorphism** mixed with **Cyber-Tech** elements. It utilizes deep charcoal surfaces, vibrant neon accents, and layered translucent cards to create an interface that feels like a premium OS overlay. The emotional response is one of "unlocked potential"—making the user feel empowered, secure, and technologically ahead of the curve.

## Colors
The palette is rooted in a "Deep Space" charcoal (`#050505`) to maximize contrast for the vibrant accents. 

- **Primary (Lavender/Purple):** Used for core brand identity, primary actions, and "AI-active" states.
- **Secondary (Cyan/Electric Blue):** Used for supplementary data, technical highlights, and high-energy states.
- **Tertiary (Amber):** Reserved for warm accents and specific categorizations.
- **Gradients:** The interface heavily utilizes a tri-color linear gradient (`#d0bcff` -> `#a078ff` -> `#4cd7f6`) for high-impact typography and buttons. 
- **Backdrop Glows:** Large, low-opacity radial gradients in Primary and Secondary colors are used as background "blobs" to provide depth without adding structure.

## Typography
The system uses **Geist** exclusively to maintain a technical, developer-centric aesthetic. 

- **Headlines:** Use tight tracking and aggressive line heights to feel modern and impactful.
- **Display Type:** Employs negative letter spacing (`-0.05em`) and font weights of 800 for maximum gravitas.
- **Body:** Prioritizes legibility with a 1.6 line height.
- **Labels:** Set in all-caps with generous letter spacing (`0.1em`) to serve as meta-data or small headers.

## Layout & Spacing
The layout follows a **fixed-grid** strategy within a `1280px` container. 

- **Desktop:** Generous 64px margins and a 12-column grid. Bento-box style layouts are preferred for feature sections, using 24px gutters.
- **Mobile:** Margins shrink to 20px, and grid columns collapse to a single-column stack.
- **Rhythm:** An 8px base unit drives all padding and internal spacing. Components typically use large internal padding (40px-48px for cards) to maintain a premium, airy feel despite the dark theme.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Light Emission**:

1.  **Surfaces:** Base background is `#050505`. Cards use `rgba(20, 20, 20, 0.4)` with a heavy `24px` backdrop blur.
2.  **Borders:** Elements are defined by semi-transparent white borders (`rgba(255, 255, 255, 0.12)`) rather than heavy shadows.
3.  **Shadows:** When used, shadows are "glows"—tinted with the primary color (`rgba(139, 92, 246, 0.4)`) and having a large blur radius (`60px`) to suggest the element is emitting light.
4.  **Hover States:** Elevation is increased by increasing background opacity and border brightness.

## Shapes
The shape language is ultra-rounded and organic. 

- **Standard Cards:** Use a massive `3rem` (48px) corner radius to feel approachable and smooth.
- **Buttons:** Always pill-shaped (fully rounded) to contrast with the square corners of a desktop screen.
- **Icons:** Enclosed in rounded-square containers (8px to 12px radius).
- **Interactive elements:** Utilize a "squishy" transition logic (`cubic-bezier(0.4, 0, 0.2, 1)`) to complement the rounded visuals.

## Components
- **Buttons:**
    - *Primary:* Gradient fill (`#a078ff` to `#03b5d3`) with a white, bold label and a "shine" overlay animation.
    - *Ghost/Secondary:* Translucent glass background with white text and a subtle white border.
- **Glass Cards:** The core container. Must feature a `1px` border, backdrop blur, and an inner "inset" shadow to simulate the thickness of glass.
- **Bento Grid:** For features, mix 8-column and 4-column spans. Each bento cell should have an animated "float" icon and high-contrast text.
- **Pricing Cards:** The featured plan should use a colored border (`primary`) and a scale transform (`1.1x`) to create visual hierarchy.
- **Inputs:** Dark, translucent fills with 16px corner radius and a focus state that brightens the border to the primary color.
- **Badges:** Pill-shaped, high-contrast backgrounds with `label-sm` typography and "pulse" animations for active states.