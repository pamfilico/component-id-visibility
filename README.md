# @pamfilico/component-id-visibility

Toggle component ID visibility overlay for React/Next.js apps. Adds a floating action button (FAB) that shows/hides small chips on every component displaying its ID, with click-to-copy.

## Installation

```bash
npm install git+https://github.com/pamfilico/component-id-visibility.git
```

## Peer Dependencies

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
import { ComponentIdProvider } from "@pamfilico/component-id-visibility";

export default function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <ComponentIdProvider>
      {children}
    </ComponentIdProvider>
  );
}
```

### 2. Add the FAB toggle button

```tsx
import { ComponentIdProvider, ComponentIdFAB } from "@pamfilico/component-id-visibility";

export default function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <ComponentIdProvider>
      {children}
      <ComponentIdFAB />
    </ComponentIdProvider>
  );
}
```

### 3. Add chips to your components

```tsx
import { ComponentIdChip } from "@pamfilico/component-id-visibility";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <Card>
      <ComponentIdChip componentId="client-card" />
      {/* ... rest of component */}
    </Card>
  );
}
```

## API Reference

### `ComponentIdProvider`

React context provider that manages global visibility state. Persists to `localStorage` (key: `componentVisibility`).

### `ComponentIdFAB`

Floating action button that toggles global visibility. Fixed bottom-right position.

### `ComponentIdChip`

Small chip that displays the component ID when visibility is toggled on. Clicking copies the ID to clipboard.

| Prop | Type | Description |
|------|------|-------------|
| `componentId` | `string` | The ID to display on the chip |

### `useComponentId()`

Hook to access the visibility context directly.

| Field | Type | Description |
|-------|------|-------------|
| `isGlobalVisible` | `boolean` | Current global visibility state |
| `toggleVisibility` | `() => void` | Toggle the global state |
| `isVisible` | `(componentId: string) => boolean` | Check if a specific component should be visible |
