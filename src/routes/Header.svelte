<script>
  import HeaderSearchBar from "./HeaderQuickSwitcher.svelte"
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./HeaderThemeToggle.svelte"
</script>

<nav
  class="fixed flex justify-between items-center py-4 px-8 gap-8 bg-brand text-white inset-x-0 max-w-[100vw] z-10 h-16"
>
  <section class="text-xs gap-2">
    <Logo />
    <a href="https://hatapedia-old.vercel.app/map" target="_blank">Map1</a>
    <a href="/map">Map2</a>
    <a href="/newmap">newmap</a>
    <a href="/weather">Weather</a>
  </section>
  <section class="gap-4">
    <HeaderSearchBar />
    <ThemeToggle />
  </section>
</nav>

<style lang="postcss">
  @reference "../app.css";

  section {
    @apply flex items-center;
  }
</style>
