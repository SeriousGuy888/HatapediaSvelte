<script>
    import ThemeToggle from "./ThemeToggle.svelte"
</script>

<nav>
  <p>header</p>
  <ThemeToggle />
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #eee;
  }
</style>
