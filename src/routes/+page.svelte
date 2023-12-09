<script lang="ts">
  import * as config from "$lib/config"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { allArticleMeta, articleSearchConfig } from "$lib/stores/article_store.js"
  import { createSearchStore, handleSearch } from "$lib/stores/search.js"
  import { Map, CloudLightning } from "lucide-svelte"
  import { onDestroy } from "svelte"
  import SearchBox from "./SearchBox.svelte"

  const articles = [...$allArticleMeta].sort((a, b) => {
    // Move more recently modified articles to the top
    if (a.date_modified > b.date_modified) return -1
    if (a.date_modified < b.date_modified) return 1
    return 0
  })

  const searchStore = createSearchStore(articles, articleSearchConfig)
  const unsubscribe = searchStore.subscribe((value) => handleSearch(value))
  onDestroy(() => unsubscribe()) // When user leaves the page, unsubscribe from the store
</script>

<svelte:head>
  <title>
    {config.title}
  </title>
</svelte:head>

<div class="w-full p-12 sm:p-24">
  <div class="bg-image-container">
    <div class="bg-image hidden dark:block">
      <div class="bg-fade" />
    </div>
  </div>
  <hgroup class="text-center">
    <h1 class="text-3xl sm:text-6xl font-bold tracking-tight">HATApedia</h1>
    <p class="text-xs sm:text-sm opacity-75">Maintained by the God of News</p>
  </hgroup>
  <section class="major-section flex gap-2 sm:gap-3 justify-center">
    <a href="/map" aria-label="Link to map page">
      <div class="page-link">
        <Map class="w-6 h-6" />
        <span class="link-label leading-none h-fit">World Map</span>
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
    <SearchBox {searchStore} placeholder="Search for an article..." />
  </section>
  <section class="major-section grid place-items-center">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl">
      {#each $searchStore.results as result}
        <ArticleLinkCard article={result} />
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

    filter: brightness(0.5) grayscale(0.5) blur(3px);
  }

  .bg-fade {
    @apply absolute inset-0;

    background-image: linear-gradient(#0000, #000f);
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
