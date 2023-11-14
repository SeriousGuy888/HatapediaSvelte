<script>
    import HeaderSearchBar from "./HeaderSearchBar.svelte"
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./ThemeToggle.svelte"
</script>

<nav class="flex justify-between items-center py-4 px-8 gap-8 bg-blue-900">
  <Logo />
  <div class="flex gap-4">
    <HeaderSearchBar />
    <ThemeToggle />
  </div>
</nav>
