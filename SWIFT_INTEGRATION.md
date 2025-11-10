# Swift Integration Guide

## Overview

This Expo React Native app is built with JavaScript/TypeScript, but can integrate Swift native modules for iOS-specific functionality.

## Current Architecture

The app uses:
- **Expo** - React Native framework
- **TypeScript** - For type-safe JavaScript
- **React Native** - Compiles to native iOS code (Swift/Objective-C)

## How Swift is Used

While the app code is written in TypeScript, when you build the iOS version:

1. **Expo generates native iOS project** with Swift/Objective-C code
2. **React Native Bridge** connects JavaScript to native iOS APIs
3. **Native modules** can be written in Swift for platform-specific features

## Adding Custom Swift Modules

To add custom Swift functionality:

### Option 1: Using Expo Config Plugins

Create a config plugin to add Swift code:

```typescript
// app.json or app.config.js
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]
    ]
  }
}
```

### Option 2: Creating Native Modules

1. Use `npx create-expo-module` to create a native module
2. Write Swift code in the module
3. Export it to JavaScript

Example Swift module structure:
```swift
// MyCustomModule.swift
import ExpoModulesCore

public class MyCustomModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyCustomModule")
    
    Function("hello") {
      return "Hello from Swift!"
    }
  }
}
```

### Option 3: Prebuild and Modify iOS Project

```bash
# Generate native iOS project
npx expo prebuild

# Now you can modify the iOS project directly
# Open ios/YourApp.xcworkspace in Xcode
# Add Swift files to the project
```

## Swift Features Already Available

Through React Native and Expo, you already have access to:

- **Swift-based UI**: All React Native components compile to native Swift/UIKit views
- **Swift APIs**: Device APIs (camera, location, etc.) use Swift under the hood
- **Swift Performance**: Native code execution speed
- **Swift Concurrency**: Async operations use native Swift/GCD

## Building for iOS

When you build for iOS, the entire app runs as a native Swift/Objective-C application:

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

## Native iOS Features in This App

The game uses these native iOS capabilities (via Swift):

- **Touch Events**: Native iOS touch handling
- **Audio**: AVFoundation (Swift) through expo-av
- **Graphics**: Core Graphics and Metal for rendering
- **Animations**: Core Animation for smooth 60fps gameplay
- **Memory Management**: Swift ARC for efficient memory usage

## Further Reading

- [Expo Native Modules](https://docs.expo.dev/modules/overview/)
- [React Native Native Modules](https://reactnative.dev/docs/native-modules-ios)
- [Swift Interop with React Native](https://reactnative.dev/docs/native-modules-ios#export-a-native-module)
