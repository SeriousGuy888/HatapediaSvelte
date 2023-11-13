import autoProcess from "svelte-preprocess"
import typescript from "@rollup/plugin-typescript"

export default {
  plugins: [
    typescript(),
    svelte({
      preprocess: autoProcess(),
    }),
  ],
}
