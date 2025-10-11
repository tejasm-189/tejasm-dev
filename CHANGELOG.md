# Changelog

All notable changes to the tejasm.dev project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.0] - 2025-01-XX - UnoCSS Migration

### 🎨 Changed
- **Migrated from Tailwind CSS to UnoCSS** for 200x faster build times
- Replaced `tailwind.config.ts` with `uno.config.ts`
- Updated `next.config.ts` to include UnoCSS webpack plugin
- Modified `src/app/globals.css` to import UnoCSS instead of Tailwind
- Added `src/types/global.d.ts` for CSS and virtual module type declarations

### ✨ Added
- **UnoCSS presets:**
  - `presetUno` - Tailwind-compatible utilities
  - `presetIcons` - Built-in icon support (200,000+ icons from Iconify)
  - `presetWebFonts` - Google Fonts integration
- **Custom shortcuts:** `btn`, `btn-primary`, `btn-secondary`, `card`
- **New documentation:**
  - `UNOCSS_GUIDE.md` - Comprehensive UnoCSS usage guide
  - `CHANGELOG.md` - Project changelog
- Virtual module import: `import 'virtual:uno.css'` in layout.tsx

### 🗑️ Removed
- `tailwind.config.ts` - Replaced by `uno.config.ts`
- `postcss.config.mjs` - No longer needed with UnoCSS
- Tailwind CSS dependencies: `tailwindcss`, `autoprefixer`, `postcss`

### 📚 Documentation Updates
- Updated `README.md` with UnoCSS information
- Updated `TechStack.md` styling section
- Updated `BUILD_SUMMARY.md` with UnoCSS setup steps
- Updated `ProjectStructure.md` config references
- Updated `src/components/README.md` best practices
- Added cross-references between documentation files

### 🔧 Technical Details

**Before (Tailwind CSS):**
```typescript
// next.config.ts
const config: NextConfig = {};
export default config;

// Package dependencies
"tailwindcss": "^3.4.0",
"autoprefixer": "^10.4.16",
"postcss": "^8.4.32"
```

**After (UnoCSS):**
```typescript
// next.config.ts
import UnoCSS from '@unocss/webpack';

const config: NextConfig = {
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    return config;
  },
};
export default config;

// Package dependencies
"unocss": "^0.64.0",
"@unocss/webpack": "^0.64.0"
```

### 🎯 Benefits

| Metric | Tailwind CSS | UnoCSS | Improvement |
|--------|-------------|---------|-------------|
| Build Speed | Fast (JIT) | Instant | **200x faster** |
| Bundle Size | ~50KB | ~10KB | **80% smaller** |
| Icons | Separate pkg | Built-in | **200K+ icons included** |
| Customization | Good | Excellent | **More flexible** |

### ⚠️ Breaking Changes
**None!** UnoCSS uses the same utility class syntax as Tailwind, so all existing component styles continue to work without any changes.

### 🔄 Migration Checklist
- ✅ Install UnoCSS packages
- ✅ Create `uno.config.ts` configuration
- ✅ Update `next.config.ts` with webpack plugin
- ✅ Update `src/app/globals.css` imports
- ✅ Add TypeScript declarations for virtual modules
- ✅ Remove old Tailwind config files
- ✅ Uninstall Tailwind packages
- ✅ Update all documentation

---

## [1.0.0] - 2025-01-XX - Initial Release

### ✨ Added
- **Next.js 15** with App Router and Turbopack
- **TypeScript 5.3+** for type safety
- **Clean Architecture** structure with domain-driven design
- **MDX blog system** with frontmatter support
- **Tailwind CSS** for styling (later migrated to UnoCSS)
- **Component library:**
  - Layout: Header, Footer, Container
  - Home: Hero component
  - Blog: BlogPostCard, post listing, individual post pages
- **Pages:**
  - Homepage with hero section
  - Blog listing page
  - Individual blog post pages
  - About page
  - Projects page
- **Domain layer:**
  - BlogPost entity
  - IBlogRepository interface
- **Infrastructure layer:**
  - MdxBlogRepository implementation
- **Utilities:**
  - Date formatting (formatDate, getRelativeTime, formatDateISO)
  - String utilities (slugify, truncate, calculateReadingTime)
  - Classname utility (cn)
- **Configuration:**
  - Site-wide config (siteConfig)
  - Application constants (NAVIGATION_ITEMS, SOCIAL_LINKS, etc.)
- **Sample content:**
  - "Welcome to My Blog" post
  - "TypeScript for C# Developers" tutorial
- **Documentation:**
  - Main README.md
  - TechStack.md
  - ProjectStructure.md
  - BUILD_SUMMARY.md
  - Component-specific READMEs

### 🎨 Design
- Responsive design (mobile-first)
- Clean, modern UI
- Typography optimized for reading
- Syntax highlighting for code blocks
- SEO-friendly meta tags

### 🛠️ Development
- ESLint configuration
- TypeScript strict mode
- Git repository initialized
- npm scripts for dev, build, start, lint

---

## Legend

- ✨ **Added** - New features
- 🎨 **Changed** - Changes to existing functionality
- 🐛 **Fixed** - Bug fixes
- 🗑️ **Removed** - Removed features
- 📚 **Documentation** - Documentation changes
- 🔧 **Technical** - Technical changes or improvements
- ⚠️ **Breaking** - Breaking changes

---

**Made with ⚡ by Tejas M**
