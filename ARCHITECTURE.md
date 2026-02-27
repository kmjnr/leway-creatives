# Project Architecture: Leway Creatives

## Overview
This project is a high-performance, SEO-optimized landing page for Leway Creatives. It is built using React, Vite, and Tailwind CSS, following a strict modular architecture.

## Tech Stack
- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion, Radix UI (Shadcn UI)
- **Form Management**: React Hook Form, Zod
- **Data Fetching**: TanStack Query (React Query)
- **State Management**: React Context / Hooks
- **Testing**: Vitest, React Testing Library
- **Tooling**: ESLint, TypeScript, PostCSS

## Directory Structure
The project follows a modular structure to ensure separation of concerns and maintainability.

- `/src/components`: UI components organized by feature or atomic level.
- `/src/pages`: Main page components representing different routes.
- `/src/hooks`: Custom React hooks for shared logic.
- `/src/lib`: Utility functions and third-party configurations.
- `/src/assets`: Static assets like images and styles.
- `/tests`: Unit and integration tests (Migrated from /src/test).

## Design Principles
- **Aesthetics First**: Every component must adhere to the high-end, premium design tokens defined in `tailwind.config.ts`.
- **DRY (Don't Repeat Yourself)**: Reuse components and hooks to maintain a clean codebase.
- **Micro-animations**: Use Framer Motion for subtle, premium interactions.
- **SEO & Accessibility**: Semantic HTML, meta tags, and structured data (JSON-LD) are mandatory for all pages.

## Implementation Standards
- **Component Development**: All components must be functional and use TypeScript for strict type safety.
- **Naming Conventions**: Use PascalCase for components and camelCase for functions and variables.
- **Testing**: Every new module or component should have a corresponding test file in `/tests`.
- **Performance**: Optimize images and use Code Splitting where necessary.

## Change Management
- Changes must be consistent with this architecture.
- Structural changes require an update to this document.
- Delete unused code immediately.
