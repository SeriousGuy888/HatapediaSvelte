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
  <hgroup class="text-center">
    <h1 class="text-3xl sm:text-6xl font-bold tracking-tight">HATApedia</h1>
    <p class="text-xs sm:text-sm opacity-75">Maintained by the God of News</p>
  </hgroup>
  <section class="major-section flex gap-2 sm:gap-3 justify-center">
    <a href="/map">
      <div class="page-link">
        <Map class="w-6 h-6" />
        <span class="link-label leading-none h-fit">World Map</span>
      </div>
    </a>
    <a href="/weather">
      <div class="page-link">
        <CloudLightning class="w-6 h-6" />
        <span class="link-label leading-none h-fit">Weather</span>
      </div>
    </a>
  </section>
  <section class="major-section mx-auto grid place-items-center sm:max-w-3xl">
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
  .major-section {
    @apply mt-6 sm:mt-12;
  }

  .page-link {
    @apply rounded-full p-2 sm:px-4;
    @apply sm:border-2 border-black dark:border-white;
    @apply transition-colors duration-300 ease-in-out;
    @apply flex gap-2 items-center;
    @apply hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black;
  }

  .link-label {
    @apply hidden sm:block;
  }
</style>
