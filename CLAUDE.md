# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pixel-to-rem conversion tool built with React, TypeScript, and Vite. It's a single-page application that converts between pixel and rem units, with theme support and local storage persistence.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript compilation and Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint on TypeScript files
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI interface
- `npm run coverage` - Generate test coverage report

## Architecture

### Context-Based State Management

The application uses React Context for state management with two main contexts:

1. **Theme Context** (`src/contexts/Theme/`)
   - Manages light/dark theme switching using `ThemeType` enum (Light = 'light', Dark = 'dark')
   - Persists theme preference using custom `useLocalStorage` hook
   - Theme configurations defined in `Theme.config.ts` with CSS custom properties
   - Uses color model from `src/models/color.model.ts`
   - Theme interface includes comprehensive CSS custom properties for styling

2. **Converter Context** (`src/contexts/Converter/`)
   - Manages conversion direction using `ConversionDirection` enum (PxToRem, RemToPx)
   - Handles pixel values and root font size state
   - Persists root font size to localStorage using custom `useLocalStorage` hook
   - Provides converter state through React context with memoized value
   - Uses custom hook `useConverter()` for consuming context

### Custom Hooks

- **useLocalStorage** (`src/hooks/useLocalStorage.ts`)
  - Generic hook for localStorage persistence with error handling
  - Used by both theme and converter contexts for state persistence
  - Provides type-safe localStorage operations

### Component Structure

Components follow a consistent pattern with co-located CSS files and tests:
- Each component has its own folder with `.tsx`, `.css`, and `.test.tsx` files (where applicable)
- Components are functional components using hooks
- TypeScript interfaces are defined inline or in separate model files

#### Key Components:
- `ClipboardImage` - Copy to clipboard functionality (no test file)
- `ConversionInput` - Input field for conversion values (no test file)
- `ConversionTables` - Display conversion reference tables (with tests)
- `ConverterControls` - Main conversion interface controls (no test file)
- `ConverterTitle` - Dynamic title based on conversion direction (with tests)
- `FontSizeSetter` - Root font size configuration (with tests)
- `GitHubIcon` - GitHub repository link (with tests)
- `InvertableImage` - Theme-aware image component (no test file)
- `ThemeSlider` - Theme toggle switch (no test file)

### Key Utilities

`src/util.ts` contains core conversion and utility functions:
- `pxToRem()` - Converts pixels to rem units with configurable decimals
- `remToPx()` - Converts rem to pixels with formatting
- `formatNumber()` - Formats numbers with trailing zero removal
- `getCurrentThemeFromLocalStorage()` - Theme persistence helper
- `getRootFontSizeFromLocalStorage()` - Font size persistence helper
- Constants: `DFLT_ROOT_FONT_SIZE` (16), `DFLT_DECIMALS` (3), `WhichSide` enum, localStorage keys

### Testing Setup

- Uses Vitest as test runner with jsdom environment
- Dedicated Vitest config file (`vitest.config.ts`) separate from Vite config
- Testing Library React for component testing
- Test setup file at `src/test/setup.ts`
- Coverage reporting available via `npm run coverage`
- Tests co-located with components (not all components have tests)

### Code Style

- Uses ESLint with `.eslintrc.cjs` configuration
- ESLint config includes Airbnb, TypeScript, and Prettier integration
- Functional components with arrow functions
- React imports not required in JSX scope (React 17+ JSX transform)
- TypeScript strict mode enabled
- Consistent file naming and folder structure

## Data Files

Conversion tables are stored as JSON files in `src/components/ConversionTables/`:
- `pxtorem.json` - Pixel to rem conversion reference table
- `remtopx.json` - Rem to pixel conversion reference table