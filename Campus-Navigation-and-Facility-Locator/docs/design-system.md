# WayFindYou — Design System Documentation

Welcome to the official **WayFindYou** Design System documentation. This document serves as the single source of truth for design tokens, visual aesthetics, component guidelines, and team conventions across all modules of the WayFindYou Smart Campus Navigation and Facility Management Portal.

---

## 1. Brand & Visual Philosophy

- **Product Name**: `WayFindYou` (exact spelling, no spaces between words)
- **Tagline**: *"Find your way. Find your campus."*
- **Design Persona**: Professional, clean, minimal, human-designed, accessible, and functional.
- **Strict Exclusions**: 
  - NO AI/chatbot visual gimmicks (glowing effects, robot avatars, neural networks, dark glassmorphism, floating neon blobs).
  - NO giant stock gradients or over-sized hero headings.
  - NO cluttered cards or random decorative elements.
- **Inspiration**: Enterprise SaaS/productivity products (e.g., Linear, Stripe Dashboard, Vercel UI, Tailwind UI).

---

## 2. Color System & Design Tokens

WayFindYou uses a restrained, high-contrast, accessible palette built around Deep Navy and Cool Blue.

| Token Name | Hex Code | Usage | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#0f172a` (Slate 900) | Primary headers, dark surfaces, main branding | `bg-slate-900`, `text-slate-900` |
| **Primary Accent** | `#1e3a8a` / `#2563eb` | Primary buttons, active nav, focus rings | `bg-blue-600`, `text-blue-600` |
| **Secondary Accent**| `#0284c7` (Sky 600) | Secondary indicators, map controls | `bg-sky-600`, `text-sky-600` |
| **Success / Navigation**| `#059669` (Emerald 600) | Successful navigation, open status, positive state | `bg-emerald-600`, `text-emerald-600` |
| **Warning** | `#d97706` (Amber 600) | Maintenance, busy facilities, caution alerts | `bg-amber-600`, `text-amber-600` |
| **Error / SOS** | `#dc2626` (Red 600) | Emergency alerts, closed status, destructive actions | `bg-red-600`, `text-red-600` |
| **Background Neutral**| `#f8fafc` (Slate 50) | Main app background, subtle container fills | `bg-slate-50` |
| **Surface White** | `#ffffff` | Card surfaces, modals, popovers | `bg-white` |
| **Border Stroke** | `#e2e8f0` (Slate 200) | Card borders, dividers, input borders | `border-slate-200` |
| **Text Primary** | `#0f172a` | Main body text, titles | `text-slate-900` |
| **Text Muted** | `#64748b` (Slate 500) | Subtitles, labels, timestamps | `text-slate-500` |

---

## 3. Typography & Hierarchy

Font Family: **Inter**, system sans-serif fallback.

| Level | Size (Desktop) | Weight | Line Height | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `40px` (2.5rem) | Bold (700) | 1.15 | Hero main title, major landing headers |
| **H2** | `28px` (1.75rem) | SemiBold (600) | 1.25 | Page titles, section headings |
| **H3** | `20px` (1.25rem) | SemiBold (600) | 1.3 | Card headers, sub-section titles |
| **Body** | `15px - 16px` | Normal (400) | 1.5 | Primary body text, descriptions |
| **Small / Label** | `13px - 14px` | Medium (500) | 1.4 | Form labels, badges, table headers |
| **Tiny / Caption** | `12px` | Normal (400) | 1.3 | Map legends, timestamps, metadata |

---

## 4. Spacing, Border Radius & Elevation

- **Spacing Grid**: 4px base (`p-1`, `p-2`, `p-4`, `p-6`, `p-8`)
- **Border Radius**:
  - Buttons & Inputs: `rounded-lg` (8px)
  - Cards & Containers: `rounded-xl` (12px)
  - Badges & Pills: `rounded-full` (9999px)
- **Shadows**:
  - Card default: `shadow-sm` (subtle border stroke paired with slight depth)
  - Dropdown / Modal: `shadow-lg`
  - Floating action buttons: `shadow-md`

---

## 5. UI Components Guide

### Buttons (`src/components/ui/Button.jsx`)
- **Primary**: `bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800`
- **Secondary**: `bg-slate-100 text-slate-800 hover:bg-slate-200`
- **Outline**: `border border-slate-300 text-slate-700 hover:bg-slate-50`
- **Danger**: `bg-red-600 text-white hover:bg-red-700`
- **Icon Button**: Square aspect ratio with `p-2` or `p-2.5`.

### Inputs & Search (`src/components/ui/Input.jsx`, `SearchBar.jsx`)
- Clear focus rings: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- Standardized height: `h-10` for normal inputs, `h-12` for prominent search bars.
- Prefix & Suffix slots for Lucide icons.

### Badges (`src/components/ui/Badge.jsx`)
- Success: `bg-emerald-50 text-emerald-700 border border-emerald-200`
- Warning: `bg-amber-50 text-amber-700 border border-amber-200`
- Error: `bg-red-50 text-red-700 border border-red-200`
- Info / Blue: `bg-blue-50 text-blue-700 border border-blue-200`
- Role Badges: Distinct color accents per user role (`Student`, `Faculty`, `Visitor`, `Security`, `Admin`).

### Cards (`src/components/ui/Card.jsx`)
- Clean white background (`bg-white`), thin border (`border border-slate-200`), subtle shadow (`shadow-sm`), rounded corners (`rounded-xl`).

### Tables (`src/components/ui/Table.jsx` / HTML tables)
- Header: `bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider`
- Rows: `hover:bg-slate-50/80 transition-colors border-b border-slate-100`

---

## 6. Layout & Responsive Grid

- **Layout Structure**:
  - `AppLayout`: Contains `Sidebar` (collapsible/drawer), `Topbar`, and `Main Content`.
  - Content container width: max `max-w-7xl` centered.
- **Breakpoints**:
  - Mobile (`< 640px`): Sidebar folds into off-canvas drawer. Stacked cards. Full-width inputs.
  - Tablet (`640px - 1024px`): Compact icon-only sidebar option or drawer. 2-column grids.
  - Desktop (`> 1024px`): Fixed 240px sidebar, expanded 3/4-column grids.

---

## 7. Leaflet Map Components Standards

- Custom styled markers for Academic Blocks, Libraries, Cafeterias, Parking, Medical, Wi-Fi, and Emergency posts.
- Brand colors used for pins: Primary Navy for main buildings, Blue for facilities, Emerald for selected destination & user location.
- Interactive controls: Layer filter drawer, Floor switcher (GF, F1, F2, F3), Stair-Free / Wheelchair Accessible route switch, Zoom & Recenter controls.

---

## 8. Role-Based Access Control (RBAC) Matrix

WayFindYou caters to five distinct campus roles:

| Role | Accessible Modules | Key Features |
| :--- | :--- | :--- |
| **Student** | Home, Map, Classrooms, Facilities, Voice Nav, Timetable, Notices, Complaints | Room finding, personal timetable, issue reporting |
| **Faculty** | Home, Map, Classrooms, Facilities, Voice Nav, Class Updates, Notices | Room booking, class status updates, notices |
| **Visitor** | Landing, Home (Limited), Campus Map, Facility Locator, Visitor Pass | Guest navigation, parking locator, visitor pass registration |
| **Campus Security**| Home, Campus Map, SOS Emergency Feed, Visitor Pass Check, Incidents | Live panic alert response, gate check-in, map security overlays |
| **Admin** | Full Platform Access + Admin Dashboard, Facilities Manager, Users | Facility management, broadcast announcements, campus usage stats |

---

## 9. Developer Team Collaboration Guidelines

WayFindYou is co-developed by three team members working on the same repository:

- **Developer 1 (Navigation & Campus Services)**: Focuses on Map modules, Classroom Finder, Facility Locator, Voice Nav. Must reuse `MapContainer`, `SearchBar`, `BuildingCard`, and `Badge`.
- **Developer 2 (Campus Operations)**: Focuses on Timetable, Notices, Complaints, Visitor Pass. Must reuse `AppLayout`, `Table`, `Card`, `Modal`, and `Input`.
- **Developer 3 (Administration & Safety)**: Focuses on SOS Emergency, Admin Hub, Profile & Settings, Authentication. Must reuse `Button`, `Badge`, `ToastContext`, and `RoleContext`.

All developers MUST import design components strictly from `src/components/ui/` and `src/components/layout/`. Do NOT create custom ad-hoc button or input styles in individual feature modules.

---

## 10. Accessibility (a11y) Rules

1. All interactive elements have visible `:focus-visible` outlines.
2. Color contrast ratios meet WCAG AA (minimum 4.5:1 for body text).
3. Text labels provided for all icon-only buttons via `aria-label`.
4. High-Contrast mode and Stair-Free (Wheelchair Accessible) route toggle available across all navigation interfaces.
