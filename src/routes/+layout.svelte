<script>
  import "../app.css"
  import Header from "./Header.svelte"
</script>

<div class="layout">
  <Header />
  <main>
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
  }

  :global(:root.dark) {
    @apply text-white bg-black;
  }
</style>
