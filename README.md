# tejasm.dev

> Personal website and blog built with Next.js 15, TypeScript, and UnoCSS

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://ne### Configuration

Customize UnoCSS in `uno.config.ts`:
- Add custom shortcuts
- Define theme colors
- Create custom rules
- Configure presets

**📚 For complete UnoCSS documentation, see [UNOCSS_GUIDE.md](./UNOCSS_GUIDE.md)**

## 🏗️ Architecture)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![UnoCSS](https://img.shields.io/badge/UnoCSS-0.63-34d399)](https://unocss.dev/)

## 🚀 Features

- ✅ **Modern Stack** - Next.js 15 with App Router, TypeScript, UnoCSS
- ✅ **⚡ Instant CSS** - UnoCSS for blazing-fast atomic CSS generation
- ✅ **Blog System** - MDX-based blog with frontmatter support
- ✅ **Clean Architecture** - Domain-driven design with clear separation of concerns
- ✅ **Type-Safe** - Full TypeScript coverage for compile-time error checking
- ✅ **Responsive Design** - Mobile-first design with utility-first CSS
- ✅ **Built-in Icons** - Access to 200,000+ icons via Iconify
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Fast Performance** - Static generation and optimized images

## 📂 Project Structure

```
tejasm-dev/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── blog/        # Blog-specific components
│   │   └── home/        # Homepage components
│   ├── domain/           # Domain layer (entities, interfaces)
│   ├── infrastructure/   # Infrastructure layer (repositories)
│   ├── content/          # Blog posts (MDX files)
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.3+](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[UnoCSS](https://unocss.dev/)** - Instant on-demand atomic CSS engine (200x faster than Tailwind!)
  - ⚡ Instant compilation
  - 🎨 Tailwind-compatible utilities
  - 🔥 Built-in icon support (200,000+ icons)
  - 📦 Smaller bundle size
- **[MDX](https://mdxjs.com/)** - Markdown with JSX
- **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** - MDX rendering
- **[date-fns](https://date-fns.org/)** - Date formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 Writing Blog Posts

Blog posts are written in MDX format and stored in `src/content/blog/`.

### File Naming Convention

Use the format: `YYYY-MM-DD-slug.mdx`

Example: `2025-10-10-welcome-to-my-blog.mdx`

### Frontmatter

Each blog post requires frontmatter metadata:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2025-10-10"
tags: ["typescript", "nextjs", "tutorial"]
author: "Tejas M"
published: true
---
```

### Example Post

See `src/content/blog/welcome-to-my-blog.mdx` for a complete example.

## � Styling with UnoCSS

UnoCSS is a fast, flexible, and on-demand atomic CSS engine. It uses the same utility classes as Tailwind CSS, so if you know Tailwind, you already know UnoCSS!

### Basic Usage

```tsx
// Same syntax as Tailwind!
<div className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg">
  Hello UnoCSS!
</div>
```

### Built-in Icons

UnoCSS includes built-in icon support via Iconify. Use any of 200,000+ icons:

```tsx
// Carbon icon set
<div className="i-carbon-star text-2xl" />

// Heroicons
<div className="i-heroicons-heart text-red-500" />

// Material Design Icons
<div className="i-mdi-github text-3xl" />
```

Browse icons at [Icônes](https://icones.js.org/)

### Custom Shortcuts

This project includes custom shortcuts defined in `uno.config.ts`:

```tsx
// Instead of writing long class names
<button className="btn-primary">Click me</button>

// Equivalent to:
<button className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">
  Click me
</button>
```

Available shortcuts:
- `btn` - Base button styles
- `btn-primary` - Primary button
- `btn-secondary` - Secondary button
- `card` - Card container styles

### Configuration

Customize UnoCSS in `uno.config.ts`:
- Add custom shortcuts
- Define theme colors
- Create custom rules
- Configure presets

## �🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

- **Domain Layer** - Business entities and interfaces
- **Infrastructure Layer** - Data access and external services
- **Presentation Layer** - UI components and pages

## 🚀 Deployment

Deploy to Vercel with one click:

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure domain: `tejasm.dev`
4. Deploy!

## � Documentation

- **[UNOCSS_GUIDE.md](./UNOCSS_GUIDE.md)** - Complete UnoCSS styling guide with examples and best practices
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - Project build summary and setup instructions
- **[TechStack.md](../TechStack.md)** - Detailed tech stack documentation
- **[ProjectStructure.md](../ProjectStructure.md)** - Complete project structure guide

## �👤 Author

**Tejas M**

- Website: [tejasm.dev](https://tejasm.dev)
- GitHub: [@tejasm](https://github.com/tejasm)
- LinkedIn: [tejasm](https://linkedin.com/in/tejasm)

## 📝 License

MIT License - feel free to use this project for your own portfolio!

---

**Made with ❤️ and TypeScript**
