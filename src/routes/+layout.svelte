<script>
  import "../app.css"
  import Header from "./Header.svelte"
</script>

<div class="layout">
  <Header />
  
  <!-- grid gets rid of some weird spacing for some reason -->
  <main class="grid">
    <slot />
  </main>
</div>

<style lang="postcss">
  .layout {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }

  :global(:root) {
    @apply transition-colors duration-300 ease-in-out;
    @apply text-foreground bg-background;
  }
</style>
