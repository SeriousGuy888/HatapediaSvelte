<script>
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./ThemeToggle.svelte"
</script>

<nav>
  <Logo />
  <ThemeToggle />
</nav>

<style lang="postcss">
  nav {
    @apply flex justify-between items-center py-4 px-8 gap-8 bg-blue-900;
  }
</style>
