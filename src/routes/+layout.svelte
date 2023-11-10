<script>
  import "../app.css"
  import Header from "./Header.svelte"
</script>

<div class="layout">
  <Header />
  <main class="dark:bg-black">
    <slot />
  </main>
</div>

<style>
  .layout {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }
</style>
