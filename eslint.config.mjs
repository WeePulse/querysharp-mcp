// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  // Recommended base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,

  // Prettier integration (must be last)
  prettierConfig,

  // Custom configuration
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Disable the base rule as it's handled by the extension
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // Unused imports and variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Useless constructors
      '@typescript-eslint/no-useless-constructor': 'error',

      // Additional TypeScript best practices
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // General code quality
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
    },
  },

  // Ignore files
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      '*.js',
      '*.mjs',
      'src/test/globalTearDown.js',
    ],
  },
);
