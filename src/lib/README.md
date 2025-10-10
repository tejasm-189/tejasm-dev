# Library / Utilities

Shared utility functions and helpers used throughout the application.

## Structure

- **`utils/`** - General utilities (date formatting, string manipulation)
- **`mdx/`** - MDX processing and parsing
- **`constants.ts`** - Application constants
- **`config.ts`** - Site configuration

## Common Utilities

### Date Formatting
```typescript
// utils/date.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
```

### String Utilities
```typescript
// utils/string.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
```

### className Utility
```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

## Guidelines
- ✅ Pure functions (no side effects)
- ✅ Well-tested
- ✅ Type-safe
- ✅ Documented with JSDoc
