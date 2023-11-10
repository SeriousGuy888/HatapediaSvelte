<script>
  import { browser } from "$app/environment"
  import { Sun, Moon } from "lucide-svelte"
  import { draw, fly } from "svelte/transition"

  const THEME_KEY = "theme"
  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  }
  const DARK_CLASS = "dark"

  let darkMode = false

  function toggleDarkMode() {
    darkMode = !darkMode

    localStorage.setItem(THEME_KEY, darkMode ? THEMES.DARK : THEMES.LIGHT)

    if (darkMode) {
      document.body.classList.add(DARK_CLASS)
    } else {
      document.body.classList.remove(DARK_CLASS)
    }
  }

  if (browser) {
    const storedTheme = localStorage.getItem(THEME_KEY)
    const devicePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme === THEMES.DARK || (!storedTheme && devicePrefersDark)) {
      darkMode = true
      document.body.classList.add(DARK_CLASS)
    } else {
      darkMode = false
      document.body.classList.remove(DARK_CLASS)
    }
  }
</script>

<button aria-label="Toggle colour theme" on:click={toggleDarkMode}>
  {#if darkMode}
    <div in:fly={{ y: -5 }}>
      <Moon size="24" color="white" />
    </div>
  {:else}
    <div in:fly={{ y: 5 }}>
      <Sun size="24" color="white" />
    </div>
  {/if}
</button>

<style lang="postcss">
</style>
