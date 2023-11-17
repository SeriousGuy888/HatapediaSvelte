<script>
  import HeaderSearchBar from "./HeaderQuickSwitcher.svelte"
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./HeaderThemeToggle.svelte"
</script>

<nav class="flex justify-between items-center py-4 px-8 gap-8 bg-blue-900">
  <section class="text-sm text-white">
    <Logo />
    <a href="/map">Map</a>
  </section>
  <section>
    <HeaderSearchBar />
    <ThemeToggle />
  </section>
</nav>

<style lang="postcss">
  section {
    @apply flex gap-4 items-center;
  }
</style>
