// ESLint flat config (ESLint 9+). Replaces .eslintrc.cjs/.eslintignore, which ESLint 9+
// no longer reads (the old setup made `npm run lint:eslint` fail outright).
import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // public/js/ holds vendored third-party scripts (GoatCounter's count.js)
  { ignores: ['dist/', 'node_modules/', '.astro/', '.netlify/', '.github/', 'public/js/', '**/types.generated.d.ts'] },

  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // TypeScript rules for .ts files (as before: recommended + a few tweaks)
  ...tsPlugin.configs['flat/recommended'].map((config) => ({ ...config, files: ['**/*.ts'] })),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // .astro files and their <script> blocks (parsed with the TS parser)
  ...astro.configs['flat/recommended'],
];
