# Development Guide

## Overview

RetroGunner is now an Expo React Native application that runs natively on iOS and Android devices.

## Prerequisites

- Node.js 18+ and npm
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with Android SDK
- Expo Go app on your mobile device (for testing)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will start the Expo development server. You'll see a QR code in the terminal.

### 3. Run on Device

#### Option A: Using Expo Go (Recommended for Development)

1. Install Expo Go from the App Store (iOS) or Play Store (Android)
2. Scan the QR code from the terminal using:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your device

#### Option B: Running on iOS Simulator (macOS only)

```bash
npm run ios
```

#### Option C: Running on Android Emulator

```bash
npm run android
```

#### Option D: Running on Web

```bash
npm run web
```

## Project Structure

```
contra-ios/
├── App.tsx              # Main app entry point
├── app.json             # Expo configuration
├── assets/              # Images, fonts, and other static assets
├── src/
│   ├── screens/         # Screen components
│   │   └── GameScreen.tsx   # Main game screen
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and helpers
│       └── audioManager.ts  # Audio management
├── index.ts             # Entry point
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Game Controls

- **Touch & Drag**: Move the player up and down
- **Tap SHOOT button**: Fire bullets at enemies
- **Avoid enemies**: Don't let them hit you!

## Building for Production

### iOS (requires macOS and Xcode)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for iOS:
```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

## TypeScript

The project uses TypeScript for type safety. To check for type errors:

```bash
npx tsc --noEmit
```

## Troubleshooting

### Metro bundler not starting

Try clearing the cache:
```bash
npm start -- --clear
```

### Module resolution errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### iOS build issues

Make sure Xcode is installed and up to date:
```bash
xcode-select --install
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
