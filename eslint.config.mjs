import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from "@next/eslint-plugin-next"; // Plugin Next.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // Podstawowa konfiguracja ESLint
});

const eslintConfig = [
  
  ...compat.extends('eslint:recommended'),
  // Konfiguracja dla Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Konfiguracja dla TypeScript
  ...compat.extends('plugin:@typescript-eslint/recommended'),

  // Konfiguracja dla React
  ...compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:react/jsx-runtime'),

  // Konfiguracja Airbnb
  // ...compat.extends('airbnb'),

  // Konfiguracja Prettier
  ...compat.extends('plugin:prettier/recommended'),

  // Dodatkowe reguły
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    
    rules: {
      semi: 'warn',
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off', // Nie wymaga importu React w JSX
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }], // Pozwala na JSX w plikach .tsx/.jsx
      'import/extensions': 'off', // Wyłącza wymóg rozszerzeń w importach
      'import/prefer-default-export': 'off', // Pozwala na named exports
      'prefer-arrow-callback': 'error',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      "@typescript-eslint/no-explicit-any": "warn",
      '@typescript-eslint/no-unused-vars': [
        "warn",
        {
          vars: "all",
          caughtErrors: "all",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];

export default eslintConfig;
