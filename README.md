# iOS Test - Native Capability Harness

This is an [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/) project that focuses on exercising core iOS device capabilities (notifications, biometrics, camera, location, brightness, haptics, device info) with a lightweight component gallery built using [React Native Reusables](https://reactnativereusables.com).

## Purpose

This application serves as a testing ground for:
- **iOS Native Capabilities**: Quick, tap-to-run tests for common device permissions and APIs
- **Cross-platform Development**: Validate consistent behavior across iOS, Android, and Web
- **React Native Reusables**: Showcase accessible, headless UI components styled with Tailwind CSS
- **Custom Typography**: Implementation of Google Fonts (Inter) with proper font loading and configuration

## Project Structure

```
ios-test/
├── app/                    # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout with tabs navigation
│   ├── index.tsx          # iOS feature testing tab (primary)
│   └── reusables.tsx      # React Native Reusables component gallery
├── components/            # Reusable UI components
│   └── ui/               # React Native Reusables components
├── lib/                  # Utilities and configuration
│   ├── theme.ts          # Navigation and color themes
│   └── utils.ts          # Helper functions
└── assets/               # Images and static resources
```

## Features

### Tab 1: iOS Feature Tests (primary)
- Tap-to-run cards for Notifications, Biometrics (Face ID/Touch ID), Haptics, Camera, Location, Brightness, and Device Info
- Permission prompts wired to the relevant Expo APIs with success/fail feedback
- Quick stats that track unique successful tests and remaining unverified capabilities
- Themed header with avatar, greeting, and light/dark toggle

### Tab 2: React Native Reusables
- Minimalist black and white aesthetic
- Accessible, headless components
- Button variants (default, secondary, outline, ghost, destructive)
- Typography showcase (h1-h4, body, small, large)
- Icon integration with Lucide React Native
- Feature cards with custom styling

### Technical Highlights
- Built with [Expo Router](https://expo.dev/router) for file-based navigation
- Styled with [Tailwind CSS](https://tailwindcss.com/) via [NativeWind](https://www.nativewind.dev/)
- Headless UI primitives built on React Native Reusables
- New Architecture enabled for improved performance
- Edge to Edge display support
- Comprehensive theme support (light/dark modes)
- Runs on iOS, Android, and Web
- Custom Google Fonts implementation with proper loading states

## Getting Started

### Prerequisites
- Node.js 18+ installed
- iOS Simulator (Xcode on Mac) or Android Emulator
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Running on Different Platforms

```bash
# iOS (Mac only)
npm run ios

# Android
npm run android

# Web
npm run web
```

You can also scan the QR code using the [Expo Go](https://expo.dev/go) app on your physical device for quick testing.

## Adding Components

Add more React Native Reusables components:

```bash
npx @react-native-reusables/cli@latest add [component-names]
```

Examples:
```bash
# Add specific components
npx @react-native-reusables/cli@latest add input textarea

# Install all available components
npx @react-native-reusables/cli@latest add --all
```

## Configuration Files

- **`app.json`**: Expo configuration and app metadata
- **`tailwind.config.js`**: Tailwind CSS customization
- **`tsconfig.json`**: TypeScript compiler options
- **`metro.config.js`**: Metro bundler configuration

## Deployment

### iOS Deployment
This project is specifically configured for testing iOS deployment workflows:

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android Deployment
```bash
# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

### EAS Setup
Initialize EAS (Expo Application Services):
```bash
eas build:configure
```

## Theme Customization

### Changing Fonts
The app currently uses Inter font. To switch to another Google Font:

```bash
# Install desired font (e.g., Poppins)
npm install @expo-google-fonts/poppins

# Update imports in app/_layout.tsx
# Replace Inter imports with Poppins imports
# Update fontConfig object with new font family names
```

### Color Themes
Modify `lib/theme.ts` to customize:
- Primary/secondary colors
- Background/foreground colors
- Border colors and elevation
- Dark/light theme variants

## Development Guidelines

This project follows strict development principles documented in `.github/copilot-instructions.md`:
- **Single Source of Truth**: No code duplication
- **Separation of Concerns**: Logical file and folder structure
- **Library First**: Prioritize existing libraries over custom implementations
- **Proper Commenting**: Section dividers for logical blocks
- **Type Safety**: Full TypeScript implementation

## Testing Checklist

- [ ] iOS build and deployment
- [ ] Android build and deployment
- [ ] Web build functionality
- [ ] Theme switching (light/dark)
- [ ] Custom font rendering
- [ ] Tab navigation
- [ ] Each iOS capability test card (notifications, biometrics, haptics, camera, location, brightness, device info)
- [ ] React Native Reusables components
- [ ] Responsive layouts
- [ ] Accessibility features

## Known Issues & Limitations

- Font loading requires splash screen management
- Platform-specific styling may vary slightly
- Some Material Design components behave differently on iOS vs Android

## Learn More

### Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Expo Router Docs](https://expo.dev/router)
- [React Native Reusables Docs](https://reactnativereusables.com)
- [NativeWind Docs](https://www.nativewind.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

### Useful Resources
- [Expo Google Fonts](https://github.com/expo/google-fonts)
- [Lucide React Native Icons](https://lucide.dev/)
- [Material Design 3](https://m3.material.io/)

## Contributing

This is a test/demo project. For production use:
1. Update `app.json` with your app details
2. Configure proper environment variables
3. Set up error tracking (Sentry, etc.)
4. Implement analytics
5. Add proper authentication
6. Set up CI/CD pipelines

## License

This project is for testing and demonstration purposes.

---

**Note**: This project mixes headless components with a few Paper examples. In production, choose one primary UI approach to maintain consistency and reduce bundle size.
