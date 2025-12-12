import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginVue from 'eslint-plugin-vue'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  skipFormatting,

  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/no-unused-properties': [
        'warn',
        {
          groups: ['props', 'data', 'computed', 'methods', 'setup'],
          deepData: true,
          ignorePublicMembers: true,
        },
      ],
    },
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.d.ts', 'vue'],
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    rules: {
      'import/order': [
        'warn',
        {
          named: true,
          groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '{@,~}/{**/composables/**,composables}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@,~}/{**/constants/**,constants}',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@,~}/{**/{pages,components}/**,{pages,components}}',
              group: 'internal',
              position: 'after',
            },
          ],
        },
      ],
    },
  },
)
