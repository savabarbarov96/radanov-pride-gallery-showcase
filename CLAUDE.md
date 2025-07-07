# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server with auto-reloading
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Package Management
- `npm i` - Install dependencies (uses package-lock.json)

## Project Architecture

This is a React-based cat model/photography gallery showcase built with modern web technologies:

### Tech Stack
- **Vite** - Build tool and development server
- **React 18** - UI framework with TypeScript
- **shadcn/ui** - Component library built on Radix UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **React Hook Form** - Form handling with Zod validation

### Project Structure
- `src/pages/Index.tsx` - Main homepage with all sections
- `src/components/` - Reusable UI components
  - `ModernNavigation.tsx` - Header navigation
  - `ModernHeroSection.tsx` - Hero banner
  - `FeaturedModelsSection.tsx` - Model showcase
  - `ContactSection.tsx` - Contact form
  - `Footer.tsx` - Site footer
- `src/components/ui/` - shadcn/ui components (accordion, button, card, etc.)
- `src/lib/utils.ts` - Utility functions (cn helper for class merging)
- `src/hooks/` - Custom React hooks
- `src/assets/` - Images and static assets

### Application Flow
The app uses a simple single-page layout with React Router handling navigation. The main Index page composes all sections vertically. All UI components use shadcn/ui design system with consistent styling via Tailwind CSS.

### Key Patterns
- Components use TypeScript for type safety
- Styling follows Tailwind utility classes
- UI components are built with Radix UI primitives
- Form handling uses React Hook Form with Zod validation
- State management via TanStack Query for server state

## Development Notes

This project was originally created with Lovable (a web-based development platform) and follows their standard Vite + React + shadcn/ui template structure.