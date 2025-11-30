import { defineConfig } from 'eslint/config';
import eslintJs from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  eslintJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]);
