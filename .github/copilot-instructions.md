# RetroGunner iOS - Copilot Instructions

## Project Overview

This is **RetroGunner**, a retro-style side-scrolling shooter game built for iOS. The project uses:

- **Capacitor** for iOS native integration
- **Vite** as the build tool
- **React 18** with TypeScript for the UI framework
- **React Three Fiber** (Three.js) for 3D game rendering
- **Zustand** for state management (game store)

The main application code lives in `ios-retro-gunner/` directory. This is a Capacitor-based project that wraps a web-based game into a native iOS application.

## Coding Standards

### TypeScript/React

- Use **TypeScript** for all new code (strict mode enabled)
- Prefer **function components** with hooks over class components
- Use **camelCase** for variable and function names
- Use **PascalCase** for component names and type definitions
- Use the `@` alias to import from `src/` directory (e.g., `import { useGameStore } from "@/lib/stores/useGameStore"`)
- Follow the existing project structure:
  - Components in `src/components/`
  - Custom hooks in `src/hooks/`
  - Store/state management in `src/lib/stores/`
  - Pages in `src/pages/`
  - UI components in `src/components/ui/`

### Code Style

- Use **arrow functions** for component definitions and callbacks
- Include JSDoc comments for complex functions and game logic
- Use early returns for error conditions and guard clauses
- Prefer `const` over `let` where possible
- Use template literals for string concatenation
- Keep strict TypeScript settings (`strict: true`)

### React Three Fiber

- Use hooks like `useFrame`, `useRef`, and `useThree` for Three.js integration
- Keep game objects as separate components (Player, Enemy, Bullet, etc.)
- Use `useGameStore` for accessing and updating game state
- Optimize rendering with `useMemo` and `useCallback` where appropriate

### Game Development

- Keep game logic separate from rendering logic
- Use Zustand store (`useGameStore`) for managing game state
- Follow the existing pattern for game entities (position, velocity, health, etc.)
- Maintain consistent collision detection and physics patterns
- Use the existing audio system (`useAudio` hook) for sound effects

## Build and Development

### Setup Commands

```bash
cd ios-retro-gunner
npm install
npm run build
npx cap add ios
npm run sync
```

### Development Workflow

- `npm run dev` - Start Vite development server
- `npm run build` - Build production bundle
- `npm run sync` - Sync web assets to iOS project
- Open the `ios/` project in Xcode to build and run on iOS

### Project Structure

```
ios-retro-gunner/
├── src/
│   ├── components/    # Game components and UI
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and stores
│   ├── pages/         # Page components
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── capacitor.config.ts
├── vite.config.ts
└── tsconfig.json
```

## File and Directory Ignore Rules

When working with this project, ignore or avoid modifying:

- `node_modules/` - Dependencies
- `dist/` - Build output
- `ios/` - Generated iOS project (synced from web build)
- `*.log` - Log files
- `*.zip` - Build artifacts
- `.replit` - Replit configuration (not relevant for iOS development)

## Testing and Quality

- Currently no automated test framework configured
- Manual testing should be done:
  - Build the project (`npm run build`)
  - Sync to iOS (`npm run sync`)
  - Test in Xcode iOS simulator
- Ensure TypeScript compilation passes without errors
- Check for proper game functionality (player movement, shooting, enemies, etc.)

## Capacitor/iOS Specific

- App ID: `com.cosmokramerii.retrogunner`
- App Name: `RetroGunner`
- Web directory: `dist/`
- iOS scheme: `capacitor`
- Always sync web changes to iOS after building: `npm run sync`

## Best Practices

- Maintain mobile-first approach (this is an iOS game)
- Optimize for touch controls (mobile input)
- Keep bundle size reasonable for mobile devices
- Test performance on actual iOS devices when possible
- Follow React Three Fiber best practices for 3D rendering performance
- Use the existing component patterns for consistency
