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
3. Click **Create new...** under **Key store path** to create a release keystore when you are ready to configure production signing:
   - Save it as `android/app/release.keystore` (or a secure location).
   - Set a password and remember it.
   - Set an alias (e.g., `wormcast`) and a password.
   - Fill in validity (25 years) and your organization details.
4. Select the keystore, enter passwords, and click **Next**.
5. Choose **release** as the build variant.
6. Click **Finish**. Android Studio will generate `android/app/release/app-release.aab`.
7. Upload this `.aab` file to the Google Play Console.

The Capacitor config does not define release signing. Configure signing in Android Studio when you are ready to publish.

### Publish the Privacy Policy with GitHub Pages

Google Play requires a public privacy policy URL. One simple option is GitHub Pages:

1. Create a public GitHub repository for the policy or use the public project repository.
2. Add a `privacy.html` or `privacy.md` page containing the WormCast privacy policy.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, choose the branch and folder that contain the policy page.
5. Save the Pages settings and wait for GitHub to publish the site.
6. Open the published URL in a private browser window to confirm it is publicly accessible.
7. Add that public URL to the Google Play Console app content privacy policy field.

Before publishing, replace the `SUPPORT_EMAIL_REQUIRED` placeholder in the privacy policy with a real support email address.

## Project Structure

- `src/` — React source code
  - `pages/` — Page components (Calculator, Settings, About, Privacy, Assets)
  - `components/` — Shared components (Layout)
  - `hooks/` — Custom hooks (useLocalStorage)
  - `App.tsx` — Router and route definitions
  - `main.tsx` — App entry point
  - `index.css` — Global styles and design tokens
- `public/` — Static assets
  - `assets/icons/` — Web/PWA icon assets
  - `assets/screenshots/` — Optional place to keep exported Play Store screenshots
- `android/` — Capacitor Android project
- `capacitor.config.ts` — Capacitor configuration
- `vite.config.ts` — Vite build configuration with PWA support
- `index.html` — HTML entry point

## Assets You Still Need to Supply

### Web/PWA Icons

The PWA manifest currently references:

- `public/assets/icons/icon-192x192.svg`
- `public/assets/icons/icon-512x512.svg`

Review these SVGs before release and add PNG fallbacks only if you decide your target browsers or store workflow require them. The files `public/assets/icons/icon.png` and `public/assets/icons/splash.png` are not currently present in this repository.

### Android Launcher and Adaptive Icons

Android launcher assets live under `android/app/src/main/res/mipmap-*` and the adaptive icon XML files live under `android/app/src/main/res/mipmap-anydpi-v26/`.

Use Android Studio's Image Asset Studio to generate final launcher and adaptive icons from final artwork:

1. Open the `android/` project in Android Studio.
2. Right-click `app/src/main/res`.
3. Choose **New > Image Asset**.
4. Generate the foreground, background, round, and legacy launcher assets.

### Android Splash-Screen Assets

Native splash images live under the Android resource folders:

- `android/app/src/main/res/drawable/splash.png`
- `android/app/src/main/res/drawable-land-*/splash.png`
- `android/app/src/main/res/drawable-port-*/splash.png`

Replace or regenerate these density-specific Android assets from final splash artwork. Keep the logo centered with enough padding for different screen sizes.

### Google Play Listing Graphics

These are uploaded to the Google Play Console and are separate from app runtime assets:

- App icon for the Play listing
- Feature graphic
- Phone screenshots
- Optional tablet screenshots

Store source or export copies wherever you prefer. If you keep listing screenshots in the repo, use `public/assets/screenshots/`.

## Troubleshooting

- **Android Studio does not open:** Make sure the `android/` folder exists. Run `npm run cap:sync` first.
- **Build fails:** Check that `npm run build` succeeds before syncing. Ensure Node.js and Java are installed.
- **App not installing on phone:** Make sure USB debugging is enabled and you have accepted the RSA fingerprint on your phone.
- **Service worker not caching:** The app uses `vite-plugin-pwa`. After building, the service worker is included in `dist/`. Clear browser cache if testing the web version.

## License

Copyright (c) Tyler Farris. All rights reserved.
