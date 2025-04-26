## README WIP

## Storybook Test Template

### Testing Convention

- **All `.tsx` files MUST have `.stories.tsx` files**
  - Components are tested via Storybook stories, not test files
  - Naming: `ComponentName.tsx` → `ComponentName.stories.tsx`
  - Enforced by ESLint

```typescript
// Button.tsx
export const Button = () => <button>Click me</button>;

// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
```

## Quick Start

```bash
pnpm install
pnpm run dev-sb  # Start Storybook
pnpm test        # Run tests
```
