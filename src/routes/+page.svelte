<script lang="ts">
  import * as config from "$lib/config"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { allArticleMeta, articleSearchConfig } from "$lib/stores/article_store.js"
  import { createSearchStore, handleSearch } from "$lib/stores/search.js"
  import { Map, CloudLightning } from "lucide-svelte"
  import { onDestroy } from "svelte"
  import SearchBox from "./SearchBox.svelte"

  const searchStore = createSearchStore($allArticleMeta, articleSearchConfig)
  const unsubscribe = searchStore.subscribe((value) => handleSearch(value))
  onDestroy(() => unsubscribe()) // When user leaves the page, unsubscribe from the store

  let searchBoxRef: SearchBox | null = null
  $: searchBoxRef?.focus()
</script>

<svelte:head>
  <title>
    {config.title}
  </title>
  <meta property="og:title" content={config.title} />
  <meta property="og:description" content={config.description} />
</svelte:head>

<div class="w-full p-12 sm:p-24">
  <div class="bg-image-container">
    <div class="bg-image" />
  </div>
  <hgroup class="text-center">
    <h1 class="text-3xl sm:text-6xl font-bold tracking-tight">HATApedia</h1>
    <p class="text-xs sm:text-sm mt-0.5">Maintained by the God of News</p>
  </hgroup>
  <section class="major-section flex gap-2 sm:gap-3 justify-center">
    <a href="/map" aria-label="Link to map page">
      <div class="page-link">
        <Map class="w-6 h-6" />
        <span class="link-label leading-none h-fit"><del>World Map</del></span>
      </div>
    </a>
    <a href="/weather" aria-label="Link to weather page">
      <div class="page-link">
        <CloudLightning class="w-6 h-6" />
        <span class="link-label leading-none h-fit">Weather</span>
      </div>
    </a>
  </section>
  <section class="major-section mx-auto grid place-items-center max-w-7xl">
    <SearchBox bind:this={searchBoxRef} {searchStore} placeholder="Search for an article..." />
  </section>
  <section class="major-section grid place-items-center">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl w-full"
    >
      {#each $searchStore.results as result}
        <ArticleLinkCard article={result} showTimeSinceUpdated />
      {/each}
    </div>
  </section>
</div>

<style lang="postcss">
  .bg-image-container {
    @apply absolute inset-0 max-w-full overflow-hidden;

    z-index: -10;
    isolation: auto;
  }

  .bg-image {
    @apply w-full h-full;

    background-image: url("/banner_images/hero.webp");
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;

    /* prevents blur filter from fraying at the edges */
    transform: scale(1.1);

    filter: brightness(1.25) grayscale(0.5) blur(3px);

    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 40%), rgba(0, 0, 0, 0%) 90%);
  }

  .major-section {
    @apply mt-6 sm:mt-12;
  }

  .page-link {
    @apply rounded-full p-2 sm:px-4;
    @apply transition-colors duration-300 ease-in-out;
    @apply flex gap-2 items-center;
    @apply sm:border-2;
    @apply border-foreground text-foreground;
    @apply hover:bg-foreground hover:text-background;
  }

  .link-label {
    @apply hidden sm:block;
  }
</style>
