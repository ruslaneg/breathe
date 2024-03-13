import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const assetsList = [
  '/icon.png',
  '/icon.svg',
  '/manifest-dark.json',
  '/manifest-light.json',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: assetsList,
      manifest: false,
      registerType: 'autoUpdate',
    }),
  ],
});
