# AGENTS.md - CroCoder Website Development Guide

## Build/Test Commands

- `npm run dev` - Start development server on port 4321
- `npm run build` - Build for production
- No lint/test commands configured - this is a simple Astro website

## Framework & Architecture

- **Astro 5.12.0** with React integration and Vercel adapter
- **TailwindCSS** for styling with custom theme configuration
- **TypeScript** with minimal config extending root tsconfig
- Server-side rendering with Vercel deployment

## Code Style Guidelines

- **Imports**: Use ES6 imports, Astro assets for images (`import { Image } from "astro:assets"`)
- **Components**: Astro components (.astro) with frontmatter, React components for interactivity
- **Styling**: TailwindCSS classes, responsive-first approach, custom color palette from theme.json
- **Naming**: kebab-case for files, camelCase for variables, descriptive component names
- **Content**: Markdown files in src/content/ with frontmatter metadata
- **Scripts**: Inline scripts with `is:inline` for client-side functionality
- **Assets**: Store in src/assets/, optimize images with Astro's Image component

## File Structure

- `src/components/` - Reusable Astro/React components
- `src/content/` - Markdown content (posts, authors, services)
- `src/layouts/` - Page layout templates
- `src/pages/` - Route pages and API endpoints
- `public/` - Static assets served directly

## No additional rules files found (.cursorrules, .github/copilot-instructions.md)
