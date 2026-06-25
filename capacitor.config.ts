import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tylerfarris.wormcast',
  appName: 'WormCast',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
