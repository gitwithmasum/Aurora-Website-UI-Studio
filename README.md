# AURORA UI STUDIO — Futuristic Design System & Simulator

A comprehensive, futuristic UI component library and interactive simulation studio engineered with React 18, TypeScript, Tailwind CSS, and Lucide Icons.

## 🚀 Architectural Overview

AURORA UI STUDIO is an interactive developer workbench and simulation environment featuring:
- **16 Major Architectural Categories** (Category 01 complete with 36 interactive components; Categories 02–16 prepared for seamless expansion).
- **Dedicated Interactive Simulators** for every single component.
- **6 Dynamic Theme Engines**:
  - `Dark Studio (Default)`: Deep obsidian and cyan/electric blue accents.
  - `Light Minimalist`: Crisp porcelain background with neutral gray borders.
  - `Glassmorphism`: Frosted translucent acrylic with specular highlights and deep backdrop blur.
  - `Cyberpunk HUD`: High-voltage neon cyan and magenta over dark grid matrix.
  - `Black & Gold Luxury`: Champagne gold metallics with obsidian backing.
  - `Swiss Monochrome Minimal`: Zero-radius sharp edges with strict typographic clarity.
- **Realtime Customization Inspector**:
  - Design variant switcher (at least 3 unique visual configurations per component).
  - Primary, secondary, and surface color pickers with realtime reactive updates.
  - Border radius (0–32px), border width (0–4px), padding X/Y, and gap sliders.
  - Drop shadow & glow modes (`none`, `soft`, `glow`, `dramatic`, `neon`).
  - Backdrop blur intensity slider (0–32px).
  - Typography scale (`xs`, `sm`, `base`, `lg`) and letter spacing (`tight`, `normal`, `wide`).
  - Functional interaction state simulator (`default`, `hover`, `active`, `focus`, `pressed`, `disabled`, `loading`, `selected`).
- **Dynamic Multi-Language Code Playground**:
  - Realtime generated React JSX (TypeScript).
  - Clean HTML5 Markup.
  - Custom CSS3 with dynamic variables and box-shadow math.
  - Tailwind CSS template snippet.
  - One-click copy and file download triggers.
- **Functional State Matrix**:
  - Side-by-side comparative inspection of component states.
- **Local Persistence**:
  - Starred favorites stored in `localStorage`.
  - Custom user-created design presets saved and managed in `localStorage`.
  - Recently inspected components history.

---

## 🧭 Category 01: Navigation & Header Components (36 Components)

### 1. Header Components (8)
1. **Top Navigation Bar** (`top-navigation-bar`): Primary HUD header with brand identity, search trigger, status indicators, and notification popover.
2. **Sticky Header** (`sticky-header`): Viewport scroll-detecting header that shrinks height by 25% and deepens backdrop frost on scroll.
3. **Transparent Header** (`transparent-header`): Zero-opacity header for full-screen hero graphics and 3D backdrops with simulated background toggle.
4. **Floating Header** (`floating-header`): Detached elevated capsule header hovering above viewport margin.
5. **Minimal Header** (`minimal-header`): Swiss modernist typographic header with hairline splitters.
6. **Split Header** (`split-header`): Dual-zone header with twin islands and laser bridge synchronization.
7. **Announcement Bar** (`announcement-bar`): Dismissible release alert with pulsing beacon and changelog link.
8. **Secondary Header** (`secondary-header`): Contextual sub-header with branch picker, filter pills, and grid/list view toggles.

### 2. Navigation Components (14)
9. **Navbar** (`navbar`): Responsive desktop and mobile navigation bar with animated active items and mobile drawer toggle.
10. **Sidebar Navigation** (`sidebar-navigation`): Vertical tree with nested cluster accordions, badge counters, and pinned user footer.
11. **Bottom Navigation Bar** (`bottom-navigation-bar`): Mobile dock with centered elevated action button.
12. **Floating Navigation** (`floating-navigation`): Dynamic island capsule hovering over content planes.
13. **Glass Navigation Bar** (`glass-navigation-bar`): Multi-layer glassmorphic bar with specular highlights.
14. **Mega Menu** (`mega-menu`): 3-column feature showcase with compute pods, storage mesh, and release cards.
15. **Dropdown Menu** (`dropdown-menu`): Precision action dropdown with keyboard hotkey indicators (⌘F, ⌘,, ⇧⌘E).
16. **Hamburger Menu** (`hamburger-menu`): Smooth morphing hamburger trigger transforming into an X.
17. **Navigation Drawer** (`navigation-drawer`): Full-height sliding overlay drawer with touch/click dismissing scrim.
18. **Breadcrumb Navigation** (`breadcrumb-navigation`): Hierarchical path with folder icons and instant copy-path trigger.
19. **Tab Navigation** (`tab-navigation`): Segmented tab switcher with count badges and active view panel.
20. **Command Menu** (`command-menu`): Spotlight Cmd+K fuzzy search bar with categorized commands and keyboard navigation.
21. **Dock Navigation** (`dock-navigation`): macOS style magnetic icon dock with cursor magnification curve and active dots.
22. **Pagination Bar** (`pagination-nav`): Numbered page capsule with boundary jumpers and range display.

### 3. Profile & Actions (7)
23. **Profile Navigation** (`profile-navigation`): User avatar strip with status beacon, role tag, and ping latency.
24. **Profile Dropdown** (`profile-dropdown`): Account menu with tier badge, security keys, billing, and session sign-out.
25. **Quick Action Menu** (`quick-action-menu`): Floating speed dial expanding into New File, Deploy, Import, and Share triggers.
26. **Search Bar** (`search-bar`): Interactive search with focused autocomplete dropdown and category chips.
27. **Notification Menu** (`notification-menu`): Bell trigger opening feed tabs (All, Alerts, Deploy) and unread indicators.
28. **Account Switcher** (`account-switcher`): Multi-tenant workspace picker with member counts and plan tiers.
29. **User Status & Presence** (`user-badge-nav`): Live status selector (Online, Deep Coding, DND, Away) with presence beacons.

### 4. Navigation Effects (7)
30. **Active Menu Highlight** (`active-menu-highlight`): Fluid sliding pill following mouse hover and snapping to selected destination.
31. **Animated Underline** (`animated-underline`): Laser underline tracking active navigation item.
32. **Stretchy Highlight** (`stretchy-highlight`): Elastic capsule elongating during transit and contracting at rest.
33. **Magnetic Navigation** (`magnetic-navigation`): Interactive items physically attracted towards cursor coordinates with spring physics.
34. **Hover Reveal Menu** (`hover-reveal-menu`): Directional hover revealing contextual sub-action cards.
35. **Collapsible Sidebar** (`collapsible-sidebar`): Animated transition from full sidebar into an icon rail with toggle button.
36. **Neon Glowing Tab** (`glowing-active-tab`): Atmospheric neon bloom with customizable photon halo and breathing pulse.

---

## 🛠 Project Structure

```
src/
├── categories/
│   └── navigation/
│       ├── codeGenerators/
│       │   └── navigationCodeGenerator.ts    # React JSX, HTML5, CSS3, Tailwind generators
│       ├── components/
│       │   ├── HeaderComponents.tsx          # 8 Header components
│       │   ├── NavigationComponentsPart1.tsx # 7 Navigation components
│       │   ├── NavigationComponentsPart2.tsx # 7 Navigation components
│       │   ├── ProfileAndActionComponents.tsx# 7 Profile & Action components
│       │   └── NavigationEffectsComponents.tsx# 7 Navigation Effects components
│       └── NavigationRenderer.tsx            # Master router for all 36 components
├── components/
│   ├── layout/
│   │   ├── CommandPalette.tsx                # Cmd+K Quick Search modal
│   │   ├── Inspector.tsx                     # Right collapsible customization inspector
│   │   ├── Sidebar.tsx                       # Left category navigation & search
│   │   ├── StudioLayout.tsx                  # Master responsive studio layout
│   │   └── TopNavbar.tsx                     # Top toolbar, viewport and theme toggles
│   └── shared/
│       ├── CodePlayground.tsx                # Code viewer with line numbers & copy
│       ├── ExportModal.tsx                   # JSON & code snippet export modal
│       ├── InteractionMatrix.tsx             # Interactive 8-state grid
│       └── SavePresetModal.tsx               # Save preset to localStorage modal
├── context/
│   └── StudioContext.tsx                     # Studio state, themes, and persistence
├── data/
│   ├── categories.ts                         # 16 Categories metadata
│   ├── navigationComponents.ts               # 36 Component specs and variations
│   └── themePresets.ts                       # 6 Theme configuration presets
├── styles/
│   └── index.css                             # Cyberpunk grid, custom scrollbar & effects
├── types/
│   └── studio.ts                             # Studio TypeScript interfaces
├── App.tsx
└── main.tsx
```

---

## ⌨️ Global Shortcuts

- <kbd>Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd>: Open Global Command Palette
- <kbd>Cmd</kbd> + <kbd>B</kbd> / <kbd>Ctrl</kbd> + <kbd>B</kbd>: Toggle Left Navigation Sidebar
- <kbd>Cmd</kbd> + <kbd>I</kbd> / <kbd>Ctrl</kbd> + <kbd>I</kbd>: Toggle Right Customization Inspector
- <kbd>Esc</kbd>: Close open modals / Command Palette

---

## 📦 Scripts

- `npm run dev`: Launch local Vite dev server with Hot Module Replacement.
- `npm run build`: Compile TypeScript and build production bundle.
- `npm run preview`: Preview production build locally.
