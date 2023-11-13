import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    // https://github.com/jonschlinkert/gray-matter/issues/143#issuecomment-1119218579
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
})
