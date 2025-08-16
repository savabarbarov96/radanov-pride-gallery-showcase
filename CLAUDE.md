# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Package Management
- `npm i` - Install dependencies (uses package-lock.json)

## Project Architecture

This is a React-based cat model/photography gallery showcase built with modern web technologies and featuring a full-stack Convex backend:

### Tech Stack
- **Vite** - Build tool and development server with SWC React plugin
- **React 18** - UI framework with TypeScript
- **shadcn/ui** - Component library built on Radix UI primitives
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **React Router** - Client-side routing
- **Convex** - Backend-as-a-Service for database and real-time features
- **TanStack Query** - Data fetching and state management
- **React Hook Form** - Form handling with Zod validation
- **Motion/Framer Motion** - Advanced animations and transitions

### Database Architecture (Convex)
The application uses Convex as its backend with the following key tables:
- **cats** - Main cat profiles with gallery images, status, and metadata
- **pedigreeConnections** - Parent-child relationships between cats
- **pedigreeTrees** - Saved pedigree tree visualizations
- **tiktokVideos** - TikTok video embeds associated with cats
- **siteSettings** - Global configuration (social media, contact info)
- **contactSubmissions** - Contact form data
- **adminSessions** - Authentication sessions
- **images** - Image metadata and associations

### Core Features
- **Multilingual Support** - Bulgarian (default) and English with JSON-based translations
- **Admin System** - Protected admin routes with session-based authentication
- **Image Management** - Upload, compression, and gallery management
- **Pedigree Visualization** - Interactive family tree canvas for cats
- **TikTok Integration** - Embedded videos with metadata
- **Contact System** - Form submissions stored in database
- **Responsive Design** - Mobile-first approach with custom breakpoints

### Project Structure
```
src/
├── pages/
│   ├── Index.tsx - Main homepage with all sections
│   ├── Admin.tsx - Protected admin dashboard
│   ├── AdminLogin.tsx - Admin authentication
│   └── NotFound.tsx - 404 page
├── components/
│   ├── admin/ - Admin-only components (CatManager, ImageManager, etc.)
│   ├── ui/ - shadcn/ui components + custom UI components
│   └── [Feature Components] - Main site sections
├── hooks/ - Custom React hooks (useLanguage, useConvexAuth, etc.)
├── lib/ - Utility functions and Convex client setup
├── services/ - Convex service layers for data operations
├── translations/ - JSON translation files (bg.json, en.json)
└── types/ - TypeScript type definitions
```

### Application Architecture
- **Single Page Application** with React Router
- **Component Composition** - Index page composes all main sections vertically
- **State Management** - Convex for server state, React hooks for client state
- **Authentication** - Session-based admin authentication with Convex
- **Internationalization** - Context-based language switching with localStorage persistence
- **Theme System** - Custom Tailwind theme with CSS variables for consistent styling

### Key Patterns
- **TypeScript First** - Strict typing throughout the application
- **Component Library** - Consistent use of shadcn/ui design system
- **Service Layer** - Abstracted Convex operations in dedicated service files
- **Custom Hooks** - Business logic encapsulated in reusable hooks
- **Path Aliases** - `@/` alias for src directory imports
- **Responsive Design** - Mobile-first Tailwind classes
- **Form Validation** - React Hook Form with Zod schemas

### Styling System
- **CSS Variables** - Theme colors defined as HSL variables
- **Custom Fonts** - Playfair Display and Crimson Text for elegant typography
- **Animation System** - Tailwind animations + custom keyframes
- **Component Variants** - Class Variance Authority for component styling
- **Modern Design** - Custom color palette with modern/beige/warm tones

### Development Conventions
- **File Naming** - PascalCase for components, camelCase for utilities
- **Import Organization** - External libraries first, then internal imports
- **Component Structure** - Props interface → component → export default
- **State Coloaction** - Keep state close to where it's used
- **Error Boundaries** - Graceful error handling throughout the app

## Guidelines

### Localization
- The website defaults to Bulgarian language
- All user-facing text must be internationalized using the `t()` function
- Add new translation keys to both `bg.json` and `en.json` files
- Language preference is persisted in localStorage

### Admin System
- Admin routes are protected and require authentication
- Use Convex session-based authentication system
- Admin components are in `src/components/admin/` directory
- Image uploads include automatic compression

### Build Process
- Do not run npm build commands manually - handled separately
- Development server runs on port 8080 with IPv6 support
- Lovable component tagger is active in development mode only