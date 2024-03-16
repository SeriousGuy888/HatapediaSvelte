<script lang="ts">
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"
  import { goto } from "$app/navigation"
  import { createEventDispatcher } from "svelte"

  export let article: Article
  export let selected = false
  export let showTimeSinceUpdated = false

  const dispatch = createEventDispatcher()

  let elem: HTMLDivElement | null = null

  $: {
    if (selected) {
      elem?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
      elem?.focus()
    }
  }

  let target = `/articles/${article.slug}`
  $: target = `/articles/${article.slug}`
  function goThere() {
    goto(target)
    dispatch("navigate")
  }

  function daysAgo(date: Date): string {
    const daysDifference = ~~((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))

    if (daysDifference === 0) return "today"
    if (daysDifference === 1) return "yesterday"

    if (daysDifference >= 30) {
      const monthsDifference = ~~(daysDifference / 30)
      return `${monthsDifference} months ago`
    }

    if (daysDifference >= 365) {
      const yearsDifference = ~~(daysDifference / 365)
      return `${yearsDifference} years ago`
    }

    return `${daysDifference} days ago`
  }
</script>

<div
  class:selected
  bind:this={elem}
  on:click={goThere}
  on:keydown={(e) => {
    if (e.key === "Enter") goThere()
  }}
  class="card relative isolate"
  role="link"
  tabindex="0"
>
  <!--
    This <a> is here because it's illegal to have an <a> inside another <a>, and
    it will render incorrectly if JavaScript is disabled. (ArticleLink has an
    <a> inside it, so it's illegal to put it inside another <a>.)

    https://stackoverflow.com/a/13054959

    In this workaround, the card itself is just a div with a click event and
    uses JS to soft-navigate to the target URL. The <a> is absolutely positioned
    on top of the card and is always invisible.
    
    If JavaScript is enabled, clicking on the <a> will preventDefault, and the
    card's click event will handle the navigation. If JavaScript is disabled,
    the card's click event will not work, and neither will the preventDefault,
    so the <a> will handle the navigation.

    As a result, the card will always be clickable, whether JS is enabled or not,
    just with a slightly better experience if JS is enabled, and the card will
    still render correctly if JS is disabled.
  -->
  <a
    href={target}
    on:click|preventDefault
    class="absolute inset-0 z-10 text-transparent select-none"
  >
    Link to {article.title}
  </a>
  <h2 class="title dotdotdot">
    {article.title}
  </h2>
  <p class="subtitle dotdotdot">
    {article.subtitle}
  </p>
  <!--
    Render tags on top of the <a> tag that covers everything else so that you
    can still click on the tags.
  -->
  <div class="mt-4 h-5 relative">
    <div class="flex flex-nowrap gap-2 absolute z-20 max-w-full overflow-auto no-scrollbar">
      {#each article.tags as tag}
        <ArticleTag {tag} size="small" />
      {/each}
    </div>
  </div>
  {#if showTimeSinceUpdated}
    <p class="mt-3 text-xs opacity-50">Updated {daysAgo(new Date(article.date_modified))}</p>
  {/if}
</div>

<style lang="postcss">
  .card {
    @apply p-4 rounded-lg;
    @apply bg-gray-100 dark:bg-gray-900;
    @apply text-black dark:text-white;
    @apply shadow-md shadow-gray-300 dark:shadow-gray-700;
    @apply border-t-8 border-transparent;
    @apply transition-colors duration-100 ease-in-out;
    @apply outline-none cursor-pointer;
  }

  .card:hover,
  .card:focus,
  .selected {
    @apply border-t-primary;
  }

  .title {
    @apply text-lg lg:text-xl font-bold;
  }

  .subtitle {
    @apply text-xs opacity-75 uppercase;
  }

  .dotdotdot {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis;
  }
</style>
