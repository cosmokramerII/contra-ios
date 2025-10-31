# RetroGunner iOS Conversion

This repository contains the Capacitor + Vite project for building RetroGunner on iOS. The application source lives inside `ios-retro-gunner/`.

## Automated iOS Build Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/build-ios.yml`) that automatically builds the iOS app and creates an IPA file.

### What the workflow does:

1. **Builds the web app** - Compiles the React + Three.js game using Vite
2. **Creates iOS project** - Uses Capacitor to generate native iOS project
3. **Installs dependencies** - Runs CocoaPods to install iOS dependencies
4. **Builds the iOS app** - Uses Xcode's xcodebuild to compile the native iOS app
5. **Creates IPA file** - Packages the app as an unsigned IPA file
6. **Uploads artifacts** - Makes the IPA available as a workflow artifact
7. **Creates releases** - Automatically creates GitHub releases with the IPA for main branch pushes

### How to use:

- **Automatic builds**: The workflow runs automatically on every push to main/master branches or on pull requests
- **Manual builds**: You can trigger a build manually from the Actions tab using "Run workflow"
- **Download IPAs**: After a successful build, download the IPA from:
  - The workflow artifacts (available for 30 days)
  - GitHub releases (for main branch builds)

### Important Notes:

- The IPA is **unsigned** and requires signing before installation on a physical device
- To sign the IPA, use tools like [iOS App Signer](https://dantheman827.github.io/ios-app-signer/) or Xcode
- For testing, you can use the iOS Simulator (no signing required)

## Local Development

Refer to `ios-retro-gunner/README.md` for local setup instructions.
