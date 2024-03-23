<script>
  import HeaderSearchBar from "./HeaderQuickSwitcher.svelte"
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./HeaderThemeToggle.svelte"
</script>

<nav
  class="fixed flex justify-between items-center py-4 px-8 gap-8 bg-brand text-white inset-x-0 max-w-[100vw] z-10 h-16"
>
  <section class="text-sm text-text">
    <Logo />
    <a href="/map">Map</a>
    <a href="/weather">Weather</a>
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
