# Components

This directory contains all React components organized by feature and responsibility.

## Structure

- **`ui/`** - Reusable UI components (buttons, cards, inputs)
- **`layout/`** - Layout components (header, footer, container)
- **`blog/`** - Blog-specific components (post cards, comments)
- **`home/`** - Homepage components (hero, featured posts)
- **`shared/`** - Shared components (theme toggle, search)

## Guidelines

### Component Naming
- Use PascalCase: `Button.tsx`, `BlogPostCard.tsx`
- One component per file
- Export as named export or default export

### Component Structure
```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Best Practices
- ✅ Keep components small and focused
- ✅ Use TypeScript interfaces for props
- ✅ Use Tailwind CSS for styling
- ✅ Extract reusable logic into custom hooks
- ✅ Prefer composition over prop drilling
