# Tejas M - Personal Website

A modern, fast personal website built with SolidJS, showcasing my work in software development, cybersecurity, and cryptography.

## Tech Stack

- **SolidJS** - Ultra-fast reactive UI framework
- **SolidStart** - Meta-framework for SolidJS with SSR
- **UnoCSS** - Instant atomic CSS engine
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe development

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This project uses GitHub Actions for CI/CD:

- **CI Workflow**: Runs on every push and pull request, building the project and running tests
- **Deploy Workflow**: Automatically deploys to GitHub Pages on pushes to main branch

## Project Structure

```
src/
├── components/
│   ├── effects/     # Visual effects (BackgroundEffects, Reveal, GlassCard)
│   ├── home/        # Homepage components (Hero)
│   └── layout/      # Layout components (Header, Footer, Container)
├── lib/             # Utilities and configuration
├── routes/          # Page routes (index, about, blog, projects)
└── app.tsx          # Main app component
```

## Features

- ⚡ Ultra-fast performance with SolidJS
- 🎨 Beautiful animations and visual effects
- 🌙 Dark mode support
- 📱 Responsive design
- 🔒 Security-focused development
- 📝 Blog-ready architecture
- 🚀 GitHub Pages deployment
