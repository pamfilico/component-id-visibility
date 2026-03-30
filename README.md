# @pamfilico/component-id-visibility

Toggle component ID visibility overlay for React/Next.js apps. Adds a floating action button (FAB) that shows/hides small chips on every component displaying its ID, with click-to-copy.

## Installation

```bash
npm install git+https://github.com/pamfilico/component-id-visibility.git
```

## Peer Dependencies

Your project must have these installed:

| Package | Version |
|---------|---------|
| `react` | >= 18 |
| `@mui/material` | >= 5 |
| `@mui/icons-material` | >= 5 |
| `@emotion/react` | >= 11 |
| `@emotion/styled` | >= 11 |

## Usage

### 1. Wrap your app with the provider

```tsx
// app/layout.tsx or app/AppContent.tsx
import { ComponentVisibilityProvider } from "@pamfilico/component-id-visibility";

export default function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <ComponentVisibilityProvider>
      {children}
    </ComponentVisibilityProvider>
  );
}
```

### 2. Add the FAB toggle button

Place `VisibilityToggleFAB` inside the provider, typically in your layout:

```tsx
import {
  ComponentVisibilityProvider,
  VisibilityToggleFAB,
} from "@pamfilico/component-id-visibility";

export default function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <ComponentVisibilityProvider>
      {children}
      <VisibilityToggleFAB />
    </ComponentVisibilityProvider>
  );
}
```

The FAB renders as a fixed-position eye icon in the bottom-right corner (bottom: 80px, right: 24px).

### 3. Add chips to your components

Add `VisibilityChip` to any component you want to label:

```tsx
import { VisibilityChip } from "@pamfilico/component-id-visibility";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <Card>
      <VisibilityChip componentId="client-card" />
      {/* ... rest of component */}
    </Card>
  );
}
```

When visibility is toggled on, each chip displays the component ID with a copy-to-clipboard button.

## API Reference

### `ComponentVisibilityProvider`

React context provider that manages global visibility state. Persists to `localStorage` (key: `componentVisibility`).

**Props:** `children: ReactNode`

### `VisibilityToggleFAB`

Floating action button that toggles global visibility. Shows `VisibilityIcon` / `VisibilityOffIcon` from MUI.

**Props:** None

### `VisibilityChip`

Small chip that displays the component ID when visibility is toggled on. Clicking copies the ID to clipboard.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `componentId` | `string` | The ID to display on the chip |

### `useComponentVisibility()`

Hook to access the visibility context directly.

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `isGlobalVisible` | `boolean` | Current global visibility state |
| `toggleVisibility` | `() => void` | Toggle the global state |
| `isVisible` | `(componentId: string) => boolean` | Check if a specific component should be visible |

## How It Works

1. User clicks the FAB button in the bottom-right corner
2. Global visibility state toggles and persists to localStorage
3. All `VisibilityChip` components check `isVisible(componentId)`
4. When visible, chips render showing the component ID with a copy icon
5. Clicking a chip copies the component ID to the clipboard with a confirmation snackbar

All components are hydration-safe (render only after mount) for Next.js SSR compatibility.
