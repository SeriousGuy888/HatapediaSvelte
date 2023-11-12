<script lang="ts">
  import * as config from "$lib/config"
  import { Map, CloudLightning } from "lucide-svelte"

  export let data
</script>

<head>
  <title>
    {config.title}
  </title>
</head>

<!-- <ul>
  {#each data.articles as article}
    <li>
      <a href="/articles/{article.slug}">
        <h2>{article.title ?? article.slug}</h2>
      </a>
    </li>
  {/each}
</ul> -->

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
    />
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
