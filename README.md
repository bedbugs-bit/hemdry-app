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

Fill in `.env` 

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


