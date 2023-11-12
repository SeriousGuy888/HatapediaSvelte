<script lang="ts">
  import ArticleTag from "$lib/components/ArticleTag.svelte"
import * as config from "$lib/config"
  import { createSearchStore, handleSearch } from "$lib/stores/search.js"
  import type { Article } from "$lib/types.js"
  import { Map, CloudLightning } from "lucide-svelte"
  import { onDestroy } from "svelte"

  export let data

  const { articles } = data

  const searchableArticles: (Article & { searchTerms: string })[] = articles.map((article) => ({
    ...article,
    searchTerms: `
      ${article.title.toLowerCase()}
      ${article.subtitle.toLowerCase()}
      ${article.slug}
      ${article.tags.map((t) => `#${t}`).join(" ")}`,
  }))

  const searchStore = createSearchStore(searchableArticles)
  const unsubscribe = searchStore.subscribe((value) => handleSearch(value))
  onDestroy(() => unsubscribe()) // When user leaves the page, unsubscribe from the store
</script>

<head>
  <title>
    {config.title}
  </title>
</head>

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
  <section class="major-section text-center">
    <input
      type="text"
      class="appearance-none bg-transparent p-2 focus:outline-none border-b-2 border-blue-400 w-full sm:max-w-4xl"
      placeholder="Search HATApedia..."
      bind:value={$searchStore.query}
    />
  </section>
  <section class="major-section">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each $searchStore.results as result}
        <a
          href="/articles/{result.slug}"
          class={`
            p-4 rounded-xl
            bg-gray-100 dark:bg-gray-900
            shadow-sm shadow-gray-300 dark:shadow-gray-700
            hover:shadow-md transition-shadow duration-100 ease-in-out
          `}
        >
          <div>
            <h2 class="text-lg lg:text-xl font-bold dotdotdot">
              {result.title}
            </h2>
            <p class="text-xs opacity-75 uppercase dotdotdot">
              {result.subtitle}
            </p>
            <div class="flex gap-2 mt-4 flex-wrap">
              {#each result.tags as tag}
                <ArticleTag tag={tag} size="small" />
              {/each}
            </div>
          </div>
        </a>
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

  .dotdotdot {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
