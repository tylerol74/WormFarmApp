# WormCast

WormCast is a free worm-farming calculator and management tool for vermicomposting enthusiasts. It helps you estimate feeding schedules, casting production, and population growth for your worm farm.

## Features

- **Worm Farm Calculator** — Estimate daily, weekly, and monthly feeding requirements based on worm count, feed type, temperature, and projection period.
- **Farm Settings** — Save your farm name, worm species, bin count, bin type, bedding type, and personal notes.
- **Local Storage** — All data is saved on your device. No accounts, no cloud, no internet required.
- **Offline Support** — Works fully offline after installation via the service worker.
- **Privacy First** — No analytics, no ads, no third-party tracking, no data leaves your device.

## Windows PowerShell Instructions

### Prerequisites

1. Install **Node.js** (LTS version recommended) from https://nodejs.org
2. Install **Android Studio** from https://developer.android.com/studio
3. Install **Java JDK 17** (bundled with Android Studio or available separately)
4. Ensure Android SDK is installed via Android Studio's SDK Manager

### Install Dependencies

Open PowerShell in the project root folder and run:

```powershell
npm install
```

### Run the Browser Version

```powershell
npm run dev
```

Open the displayed URL (usually `http://localhost:5173`) in your browser.

### Build the Production Web App

```powershell
npm run build
```

This compiles the React app into the `dist/` folder.

### Synchronize Capacitor

```powershell
npm run cap:sync
```

This copies the `dist/` folder into the Android project and updates native dependencies.

### Open the Android Project in Android Studio

```powershell
npm run android
```

This opens Android Studio with the `android/` project. Alternatively, open the `android/` folder directly in Android Studio.

### Testing on Your Android Phone

1. Enable **Developer Options** on your phone:
   - Go to **Settings > About phone** and tap **Build number** 7 times.
2. In **Settings > System > Developer options**, enable **USB debugging**.
3. Connect your phone to your computer via USB.
4. In Android Studio, click the **Run** button (green triangle) or press **Shift+F10**.
5. Select your phone from the device list.
6. Android Studio will build and install the APK directly onto your phone.

### Generating a Signed Android App Bundle (.aab) for Google Play

1. In Android Studio, go to **Build > Generate Signed Bundle / APK...**
2. Select **Android App Bundle (.aab)** and click **Next**.
3. Click **Create new...** under **Key store path** to create a release keystore:
   - Save it as `android/app/release.keystore` (or a secure location).
   - Set a password and remember it.
   - Set an alias (e.g., `wormcast`) and a password.
   - Fill in validity (25 years) and your organization details.
4. Select the keystore, enter passwords, and click **Next**.
5. Choose **release** as the build variant.
6. Click **Finish**. Android Studio will generate `android/app/release/app-release.aab`.
7. Upload this `.aab` file to the Google Play Console.

## Project Structure

- `src/` — React source code
  - `pages/` — Page components (Calculator, Settings, About, Privacy, Assets)
  - `components/` — Shared components (Layout)
  - `hooks/` — Custom hooks (useLocalStorage)
  - `App.tsx` — Router and route definitions
  - `main.tsx` — App entry point
  - `index.css` — Global styles and design tokens
- `public/` — Static assets
  - `assets/icons/` — App icons (replace placeholder files)
  - `assets/screenshots/` — Play Store screenshots
- `android/` — Capacitor Android project
- `capacitor.config.ts` — Capacitor configuration
- `vite.config.ts` — Vite build configuration with PWA support
- `index.html` — HTML entry point

## Assets You Still Need to Supply

1. **App Icon** — Replace `public/assets/icons/icon.png` with a 1024x1024 PNG.
2. **Adaptive Android Icon** — Use Android Studio's Image Asset Studio to generate foreground/background layers.
3. **Splash Screen** — Replace `public/assets/icons/splash.png` with a 2732x2732 PNG.
4. **Play Store Screenshots** — Add PNG/JPEG images to `public/assets/screenshots/` and upload them in the Google Play Console.

## Troubleshooting

- **Android Studio does not open:** Make sure the `android/` folder exists. Run `npm run cap:sync` first.
- **Build fails:** Check that `npm run build` succeeds before syncing. Ensure Node.js and Java are installed.
- **App not installing on phone:** Make sure USB debugging is enabled and you have accepted the RSA fingerprint on your phone.
- **Service worker not caching:** The app uses `vite-plugin-pwa`. After building, the service worker is included in `dist/`. Clear browser cache if testing the web version.

## License

Copyright (c) Tyler Farris. All rights reserved.
