import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

// https://stackoverflow.com/a/71350674/18947288
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars"

export default defineConfig({
  plugins: [sveltekit(), dynamicImportVars({ include: ["**/*.md"] })],
})
