<script lang="ts">
  import "../app.css"
  import Header from "./Header.svelte"
  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
</script>

<Header />
<div class="layout">
  <!-- Used to push content down so it's not hidden behind the header -->
  <div class="h-16"></div>

  <!-- grid gets rid of some weird spacing for some reason -->
  <main class="grid">
    {@render children?.()}
  </main>
</div>

<style lang="postcss">
  @reference "../app.css";
  
  .layout {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100%;
    max-width: 100vw;
  }

  :global(html, body) {
    height: 100%;
  }

  /* 
    Prevents the content from being hidden behind the header, such as the
    target heading of an anchor link.
  */
  :global(html) {
    scroll-padding-top: 6rem;
  }

  :global(:root) {
    @apply transition-colors duration-300;
    @apply text-foreground bg-background;
  }

  /* Detect mobile devices (that can't hover because they don't have a mouse) */
  @media (hover: none) {
    :global(.hide-on-touch) {
      display: none;
    }
  }
</style>
