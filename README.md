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

## Testing

This project includes a comprehensive test suite:

```bash
# Run tests (watch mode)
npm test

# Run tests once
npm test -- --run

# Visual test interface
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ 44 tests across unit, component, and integration tests
- ✅ Utility functions, React components, and workflows
- 📚 See [TESTING.md](TESTING.md) for complete testing guide

## Deployment

This project uses **GitHub Actions for CI/CD** with automatic deployment to DigitalOcean:

### Pipeline Stages:
1. **Test** 🧪 - Runs all tests, generates coverage
2. **Build** 🏗️ - Compiles production bundle
3. **Deploy** 🚀 - Deploys to DigitalOcean VM (master branch only)

**Deployment happens automatically** when you push to the `master` branch!

### Quick Setup:
1. Follow the [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
2. Configure GitHub Secrets (see [CI_CD.md](CI_CD.md))
3. Push to master - your app deploys automatically!

📚 **Complete CI/CD Documentation**: [CI_CD.md](CI_CD.md)

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
