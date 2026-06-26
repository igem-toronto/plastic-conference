import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://igem-toronto.github.io/plastic-conference/,
// so assets must be referenced under that subpath. `base` is only applied for the production
// build; the dev server still serves from "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/plastic-conference/' : '/',
  plugins: [react()],
}))
