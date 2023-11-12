<script lang="ts">
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import ArticleTag from "$lib/components/ArticleTag.svelte"
  import * as config from "$lib/config"
  import { createSearchStore, handleSearch } from "$lib/stores/search.js"
  import { Map, CloudLightning, Search } from "lucide-svelte"
  import { onDestroy } from "svelte"

  export let data

  const articles = data.articles.sort((a, b) => {
    // Move more recently modified articles to the top
    if (a.date_modified > b.date_modified) return -1
    if (a.date_modified < b.date_modified) return 1
    return 0
  })

  const searchStore = createSearchStore(articles, {
    keys: [
      { name: "slug", weight: 1.2 },
      { name: "title", weight: 1 },
      { name: "aliases", weight: 1 },
      { name: "tags", weight: 0.4 },
      { name: "subtitle", weight: 0.2 },
    ],
  })
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
  <section class="major-section grid place-items-center">
    <div class="relative w-full sm:max-w-3xl">
      <input
        type="text"
        class="appearance-none bg-transparent p-2 focus:outline-none border-b-2 border-blue-600 dark:border-blue-400 w-full sm:text-xl"
        placeholder="Search for an article..."
        bind:value={$searchStore.query}
      />
      <Search class="absolute right-2 top-2 w-6 h-6 text-blue-600 dark:text-blue-400" />
    </div>
  </section>
  <section class="major-section">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
