<script>
    import ThemeToggle from "./ThemeToggle.svelte"
</script>

<nav>
  <p>header</p>
  <ThemeToggle />
</nav>

<style lang="postcss">
  nav {
    @apply flex justify-between items-center p-4 bg-blue-900;
  }
</style>
