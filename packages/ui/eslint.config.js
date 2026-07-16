import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // This is a component library, not a Vite app: files intentionally
      // export variants/types alongside components, and there's no HMR
      // boundary to protect.
      'react-refresh/only-export-components': 'off',
      // Flags idiomatic effect-driven state sync used throughout shadcn's
      // own upstream components (carousel, use-mobile).
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
