<script>
  import "../app.css"
  import Header from "./Header.svelte"
</script>

<Header />
<div class="layout">
  <!-- Used to push content down so it's not hidden behind the header -->
  <div class="h-16" />

  <!-- grid gets rid of some weird spacing for some reason -->
  <main class="grid">
    <slot />
  </main>
</div>

<style lang="postcss">
  .layout {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100%;
    max-width: 100vw;
  }

  /* 
    Prevents the content from being hidden behind the header, such as the
    target heading of an anchor link.
  */
  :global(html) {
    scroll-padding-top: 6rem;
  }

  :global(:root) {
    @apply transition-colors duration-300 ease-in-out;
    @apply text-foreground bg-background;
  }

  /* Detect mobile devices (that can't hover because they don't have a mouse) */
  @media (hover: none) {
    :global(.hide-on-touch) {
      display: none;
    }
  }
</style>
