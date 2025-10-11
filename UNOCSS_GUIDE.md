# 🎨 UnoCSS Guide for tejasm.dev

## What is UnoCSS?

**UnoCSS** is an instant on-demand atomic CSS engine. It's like Tailwind CSS but **200x faster** with more features!

### Key Benefits

| Feature | Tailwind CSS | UnoCSS |
|---------|-------------|---------|
| **Speed** | Fast (JIT) | ⚡ **Instant** (200x faster) |
| **Bundle Size** | Larger | Smaller (only what you use) |
| **Icons** | Separate package needed | 🔥 **Built-in** (200K+ icons) |
| **Customization** | Good | Better (shortcuts, rules) |
| **Syntax** | Utility-first | Same as Tailwind! ✅ |
| **Learning Curve** | Easy | **Same as Tailwind** |

## 🚀 Quick Start

If you know Tailwind CSS, you already know UnoCSS! The syntax is identical.

### Basic Utilities

```tsx
// All the same utilities you know from Tailwind
<div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold">Hello UnoCSS!</h1>
  <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
    Click Me
  </button>
</div>
```

### Responsive Design

```tsx
// Same responsive modifiers
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid layout */}
</div>
```

### Dark Mode

```tsx
// Same dark mode syntax
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Supports dark mode!
</div>
```

## 🔥 Built-in Icons (Unique to UnoCSS!)

UnoCSS includes **200,000+ icons** from Iconify without any extra packages!

### Using Icons

Icons use the pattern: `i-{collection}-{icon-name}`

```tsx
// Carbon icons
<div className="i-carbon-star text-2xl text-yellow-500" />
<div className="i-carbon-moon text-blue-600" />

// Heroicons
<div className="i-heroicons-heart-solid text-red-500" />
<div className="i-heroicons-menu text-gray-700" />

// Material Design Icons
<div className="i-mdi-github text-3xl" />
<div className="i-mdi-linkedin text-blue-700" />

// Lucide icons
<div className="i-lucide-settings" />
<div className="i-lucide-user" />
```

### Icon Examples

```tsx
// Social media icons
<div className="flex gap-4">
  <a href="#" className="i-mdi-github text-2xl hover:text-blue-600" />
  <a href="#" className="i-mdi-twitter text-2xl hover:text-blue-400" />
  <a href="#" className="i-mdi-linkedin text-2xl hover:text-blue-700" />
</div>

// UI icons
<button className="flex items-center gap-2">
  <span className="i-heroicons-arrow-right" />
  Next
</button>

// Status icons
<div className="i-carbon-checkmark-filled text-green-500" />
<div className="i-carbon-warning-filled text-yellow-500" />
<div className="i-carbon-error-filled text-red-500" />
```

### Finding Icons

Browse all available icons at: **https://icones.js.org/**

Popular collections:
- `carbon` - IBM Carbon Design System
- `heroicons` - Heroicons by Tailwind Labs
- `mdi` - Material Design Icons
- `lucide` - Lucide Icons
- `tabler` - Tabler Icons
- `fa6-brands` - Font Awesome brands

## ⚡ Custom Shortcuts

This project includes custom shortcuts in `uno.config.ts` for common patterns:

### Button Shortcuts

```tsx
// Instead of this:
<button className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">
  Click Me
</button>

// Use this:
<button className="btn-primary">
  Click Me
</button>
```

**Available button shortcuts:**
- `btn` - Base button styles
- `btn-primary` - Primary blue button
- `btn-secondary` - Secondary outlined button

### Layout Shortcuts

```tsx
// Instead of:
<div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  Content
</div>

// Use:
<div className="container-custom">
  Content
</div>
```

### Card Shortcut

```tsx
// Instead of:
<div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
  Card content
</div>

// Use:
<div className="card">
  Card content
</div>
```

## 🎨 Adding Custom Shortcuts

Edit `uno.config.ts` to add your own shortcuts:

```typescript
export default defineConfig({
  shortcuts: {
    // Add your custom shortcut
    'my-custom-class': 'flex items-center gap-2 p-4 bg-purple-600 text-white rounded-lg',
    
    // Combine with existing utilities
    'hero-title': 'text-4xl md:text-6xl font-bold text-gray-900 dark:text-white',
  },
});
```

## 📝 Complete Example

Here's a component using UnoCSS utilities:

```tsx
import { cn } from '@/lib/utils/cn';

interface CardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
}

export function Card({ title, description, icon, variant = 'primary' }: CardProps) {
  return (
    <div 
      className={cn(
        'card',
        'hover:shadow-lg transition-shadow',
        variant === 'primary' && 'border-blue-500',
        variant === 'secondary' && 'border-gray-300'
      )}
    >
      {icon && (
        <div className={`${icon} text-3xl mb-4`} />
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <button className="btn-primary mt-4">
        Learn More
        <span className="i-heroicons-arrow-right ml-2" />
      </button>
    </div>
  );
}

// Usage
<Card 
  title="UnoCSS is Fast" 
  description="200x faster than Tailwind CSS"
  icon="i-carbon-lightning"
  variant="primary"
/>
```

## 🛠️ Configuration

### Config File: `uno.config.ts`

```typescript
import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),        // Tailwind-compatible utilities
    presetIcons(),      // Icon support
    presetWebFonts({    // Web font support
      provider: 'google',
      fonts: {
        sans: 'Inter',
        mono: 'Fira Code',
      },
    }),
  ],
  
  shortcuts: {
    // Your custom shortcuts
  },
  
  theme: {
    // Custom theme colors
    colors: {
      brand: '#3b82f6',
    },
  },
});
```

## 🎯 Common Patterns

### Flex Layouts

```tsx
// Horizontal centering
<div className="flex items-center justify-center">

// Space between items
<div className="flex items-center justify-between">

// Vertical stack
<div className="flex flex-col gap-4">

// Responsive flex
<div className="flex flex-col md:flex-row gap-4">
```

### Grid Layouts

```tsx
// Auto-fit grid
<div className="grid grid-cols-auto-fit gap-4">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// With min-width
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

### Text Styling

```tsx
// Headings
<h1 className="text-4xl md:text-6xl font-bold">
<h2 className="text-3xl md:text-5xl font-bold">
<h3 className="text-2xl md:text-4xl font-semibold">

// Body text
<p className="text-base md:text-lg text-gray-600 dark:text-gray-400">

// Truncate text
<p className="truncate max-w-xs">

// Multi-line clamp
<p className="line-clamp-3">
```

### Interactive States

```tsx
// Hover effects
<button className="hover:bg-blue-700 hover:scale-105 transition">

// Active state
<button className="active:scale-95">

// Focus state
<input className="focus:ring-2 focus:ring-blue-500 focus:outline-none">

// Group hover (parent affects children)
<div className="group">
  <span className="group-hover:text-blue-600">
</div>
```

## 📚 Resources

- **Official Docs:** https://unocss.dev/
- **Interactive Playground:** https://unocss.dev/play/
- **Icon Search:** https://icones.js.org/
- **Preset Docs:** https://unocss.dev/presets/
- **Config Reference:** https://unocss.dev/config/

## 🔄 Migration from Tailwind

If you're migrating from Tailwind CSS:

1. ✅ **Keep your classes** - Same syntax works!
2. ✅ **Remove Tailwind packages** - Already done
3. ✅ **Update config** - Use `uno.config.ts`
4. ✅ **Add icons** - Use built-in icon preset
5. ✅ **Enjoy faster builds!** ⚡

## 💡 Tips & Tricks

### 1. Use the `cn()` utility for conditional classes

```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' ? 'primary-class' : 'secondary-class'
)} />
```

### 2. Create reusable shortcuts

Instead of repeating long class strings, create shortcuts in `uno.config.ts`

### 3. Leverage icons

Don't import SVG files - use built-in icons:
```tsx
<div className="i-carbon-logo-github" />
```

### 4. Use arbitrary values

```tsx
<div className="w-[137px] h-[42px] bg-[#ff6b6b]" />
```

### 5. Debug with DevTools

UnoCSS generates atomic CSS - inspect elements to see generated classes

---

**Made with ⚡ UnoCSS** - Instant, fast, and flexible!
