import vercel from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/kit/vite"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: vercel(),
    prerender: {
      // Stops the build from failing because of dangling links in articles
      // since there are a lot of links to non-existent articles
      handleHttpError: "warn",
    },
  },
}

export default config
