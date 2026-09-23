# Hemdry

Hemdry is an Expo app for booking laundry pickup, washing, ironing, and dry cleaning in Nairobi. It uses Firebase Authentication and Firestore, with Redux for the cart.

## Requirements

- Node.js 24 LTS (24.3 or newer) and npm 11. `.nvmrc` selects Node 24.
- A Firebase project with a registered **web app**, Email/Password authentication enabled, and a Firestore database.
- For mobile previews, an Expo Go version that supports SDK 57. Use [Expo's downloads](https://expo.dev/go) to check availability for your device; the app-store version may support a different SDK.
- For native compilation: full Xcode and CocoaPods on macOS for iOS; Android Studio, Android SDK, and JDK 17 for Android. See [Expo's local build setup](https://docs.expo.dev/guides/local-app-development/).

## App Preview
<img width="295" height="600" alt="Image" src="https://github.com/user-attachments/assets/024add0f-4f65-4718-afcb-46ff9e045d62" />
<img width="295" height="600" alt="Image" src="https://github.com/user-attachments/assets/668bf4b3-e146-4696-9243-2dc7c1b50c04" />
<img width="295" height="600" alt="Image" src="https://github.com/user-attachments/assets/09d5cad1-0903-475f-a9d1-2f6a02931e29" />



## Install and configure

```sh
nvm use
npm ci
cp .env.example .env
```

Fill in `.env` using Firebase Console → Project settings → Your apps → Web app configuration. The API key, project ID, and app ID are required; also copy the other supplied fields, including the auth domain for web. Use the values for your actual Firebase project. Restart Expo after changing them.

`firebaseApp.js` initializes the app from these environment variables. `firebase.native.js` persists mobile authentication with AsyncStorage; `firebase.js` uses browser persistence. There is no separate untracked `firebase.js` to obtain. A missing configuration produces an explicit setup error at runtime.

`EXPO_PUBLIC_*` values are bundled into the client. They are Firebase client identifiers, not server secrets. Do not put service-account keys in them. Configure Firestore rules for the existing data model:

- `users/{uid}` stores the user's email and phone.
- `userOrders/{uid}` stores that user's most recent order (placing another order replaces it).
- Customers should only access their own records; reading all orders must require server-enforced admin authorization. The email list in the login screen only controls navigation, not database permissions. Firebase rules and admin provisioning are managed outside this repository.

## Run

```sh
npm start                  # Expo development server
npm run android            # Open Android preview
npm run ios                # Open iOS Simulator preview
npm run web                # Open browser preview
```

For stale Metro caches after upgrading, use `npm start -- --clear`.

Location access is optional: if unavailable or denied, enter the pickup address at checkout. Web also uses manual address entry because Expo reverse geocoding is native-only. Receipt export uses native PDF sharing on mobile and the browser print dialog on web.

## Verify and build

```sh
npm run check:dependencies # Check versions against Expo's supported set
npm run doctor             # Expo project/configuration checks (uses network)
npm run lint
npm test                   # Cart, product-state, and pickup-date regressions
npm audit
npm run build              # Production iOS, Android, and web bundles in dist/
npm run build:web          # Web-only production export
```

Production exports resolve and compile application code and assets, including Hermes bytecode for mobile. They do **not** create an IPA or APK. Export can complete without Firebase values, but that output will show the setup error when run; configure `.env` before producing a usable release.

To compile native apps, first choose your own `expo.ios.bundleIdentifier` and `expo.android.package` in `app.json`, install the platform tools, and run:

```sh
npm run build:ios
npm run build:android
```

These commands generate the ignored `ios/` and `android/` directories. Native settings belong in `app.json` and config plugins; generated native changes may be overwritten during regeneration. For signed distribution builds, configure your Expo account, identifiers, credentials, and EAS Build separately; this repository does not include a linked EAS project or signing credentials.

## Dependency policy and migration

Updated from SDK 48 to **Expo 57.0.24**, **React Native 0.86.3**, and **React 19.2.3**, with React Navigation 7, Redux Toolkit 2, React Redux 9, and Firebase 12. Versions follow [Expo's SDK 57 release guidance](https://expo.dev/changelog/sdk-57) and [Firebase integration guide](https://docs.expo.dev/guides/using-firebase/).

- Use `npx expo install <package>` for Expo/native packages and commit `package-lock.json`. Use `npm ci` for reproducible installs; do not use `--force` or `--legacy-peer-deps` to bypass incompatibilities.
- React, React Native, AsyncStorage, Lottie, screens, and safe-area-context deliberately follow Expo's supported versions even when newer npm releases exist.
- `@lottiefiles/dotlottie-react` stays on 0.13.x to satisfy Lottie's web peer dependency. Babel stays on 7 for Expo's preset. ESLint stays on 9 because the React/import plugins used by Expo do not yet declare ESLint 10 support; npm currently marks ESLint 9 deprecated. Revisit it when those plugins support 10.
- Removed unused RNEUI release-candidate packages, `moment-jalaali`, and `object-to-array-convert`. Replaced the legacy image slider and date picker with React Native components. Pickup dates now cover today through the next 29 days instead of a fixed 2023 range.
- The scoped npm override `xcode → uuid@^11.1.1` replaces the vulnerable uuid 7 dependency with a patched CommonJS-compatible version. The xcode package only uses `uuid.v4()`. Revisit this override when upstream xcode updates its dependency.
- Safe-area handling now uses one root provider and native insets. Authentication restores sessions, registration waits for profile writes, and failed order writes keep the cart intact. Clearing the cart also resets product quantities.

## Verification scope

The upgrade was checked with Node 24/npm 11: dependency compatibility, Expo Doctor, lint, regression tests, production exports for all three platforms, and native project generation in a temporary copy using test identifiers. Full native binary compilation still requires Xcode and Java/Android tooling. Live login, database rules, location, printing/sharing, and on-device UI flows must be checked against your configured Firebase project and target devices.
