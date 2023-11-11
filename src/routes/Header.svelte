<script>
    import ThemeToggle from "./ThemeToggle.svelte"
</script>

<nav>
  <p>header</p>
  <ThemeToggle />
</nav>

<style lang="postcss">
  nav {
    @apply flex justify-between items-center py-4 px-8 gap-8 bg-blue-900;
  }
</style>
