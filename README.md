# tejasm.dev

> Personal website and blog built with Next.js 15, TypeScript, and Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## 🚀 Features

- ✅ **Modern Stack** - Next.js 15 with App Router, TypeScript, Tailwind CSS
- ✅ **Blog System** - MDX-based blog with frontmatter support
- ✅ **Clean Architecture** - Domain-driven design with clear separation of concerns
- ✅ **Type-Safe** - Full TypeScript coverage for compile-time error checking
- ✅ **Responsive Design** - Mobile-first design with Tailwind CSS
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
- **[Tailwind CSS 3.4+](https://tailwindcss.com/)** - Utility-first CSS
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

## 🏗️ Architecture

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

## 👤 Author

**Tejas M**

- Website: [tejasm.dev](https://tejasm.dev)
- GitHub: [@tejasm](https://github.com/tejasm)
- LinkedIn: [tejasm](https://linkedin.com/in/tejasm)

## 📝 License

MIT License - feel free to use this project for your own portfolio!

---

**Made with ❤️ and TypeScript**
