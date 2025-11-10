# RetroGunner - Expo React Native

This repository contains the Expo React Native version of RetroGunner, a retro-style side-scrolling shooter game for iOS and Android.

## Overview

RetroGunner is now built with:
- **Expo** - React Native framework for building native iOS and Android apps
- **TypeScript** - For type-safe development
- **React Native** - For native mobile UI and performance

## Setup

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start

# Run on iOS (requires macOS with Xcode)
npm run ios

# Run on Android (requires Android Studio)
npm run android

# Run on web
npm run web
```

## Development

To develop the app:
1. Install the Expo Go app on your iOS or Android device
2. Run `npm start` to start the development server
3. Scan the QR code with your device to load the app

## Building for Production

### iOS
```bash
# Create a production build
eas build --platform ios
```

### Android
```bash
# Create a production build
eas build --platform android
```

Note: Production builds require an Expo account and EAS CLI. See [Expo documentation](https://docs.expo.dev/build/setup/) for setup instructions.
