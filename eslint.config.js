const { defineConfig } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-plugin-prettier');
const jest = require('eslint-plugin-jest');
const reactHooks = require('eslint-plugin-react-hooks')

const { fixupPluginRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = defineConfig([
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'react-native': reactNative,
      import: fixupPluginRules(importPlugin),
      prettier,
      jest,
      'react-hooks': reactHooks,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.tsx', '.jsx'],
        },
        typescript: {},
        'babel-module': {},
      },
    },

    rules: {
      // Best practices
      curly: ['warn', 'all'],
      eqeqeq: ['error'],
      'no-debugger': 'warn',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-undef': 'off',

      // Code style
      'arrow-body-style': ['error', 'as-needed'],
      'no-multi-spaces': ['warn', { ignoreEOLComments: false }],
      'no-multiple-empty-lines': ['warn', { max: 2, maxBOF: 0, maxEOF: 1 }],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'eol-last': ['warn', 'always'],
      'linebreak-style': ['error', 'unix'],
      'global-require': 'off',
      'prefer-const': 'error',

      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-duplicate-props': ['error'],
      'react/prop-types': 'off',

      // Import
      'import/no-unresolved': ['error'],
      'import/no-extraneous-dependencies': ['error'],
      'no-restricted-imports': [
      'error',
      {
        paths: [
        {
          name: 'react',
          importNames: ['default'],
          message: 'Starting from React 17, you no longer need to import React in files using JSX.',
          }],
        },
      ],
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@**',
              group: 'internal',
            },
            {
              pattern: '**/styles',
              group: 'sibling',
              position: 'after',
            },
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroupsExcludedImportTypes: ['react'],
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object'],
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'warn',

      // Prettier
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'avoid',
          printWidth: 80,
          tabWidth: 2,
          semi: true,
          bracketSpacing: true,
          jsxSingleQuote: false,
          endOfLine: 'lf',
        },
      ],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
]);
