<script lang="ts">
  import { browser } from "$app/environment"
  import { Sun, Moon } from "lucide-svelte"
  import { fly } from "svelte/transition"

  const THEME_KEY = "theme"
  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  }
  const DARK_CLASS = "dark"

  let darkMode = $state(false)

  const getRootEl = () => document.querySelector("html")

  function toggleDarkMode() {
    darkMode = !darkMode

    localStorage.setItem(THEME_KEY, darkMode ? THEMES.DARK : THEMES.LIGHT)

    if (darkMode) {
      getRootEl()?.classList.add(DARK_CLASS)
    } else {
      getRootEl()?.classList.remove(DARK_CLASS)
    }
  }

  if (browser) {
    const storedTheme = localStorage.getItem(THEME_KEY)
    const devicePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme === THEMES.DARK || (!storedTheme && devicePrefersDark)) {
      darkMode = true
      getRootEl()?.classList.add(DARK_CLASS)
    } else {
      darkMode = false
      getRootEl()?.classList.remove(DARK_CLASS)
    }
  }
</script>

<button aria-label="Toggle colour theme" onclick={toggleDarkMode}>
  {#if darkMode}
    <div in:fly={{ y: -5 }}>
      <Moon size="24" />
    </div>
  {:else}
    <div in:fly={{ y: 5 }}>
      <Sun size="24" />
    </div>
  {/if}
</button>
