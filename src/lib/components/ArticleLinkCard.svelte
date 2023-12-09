<script lang="ts">
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"
  // import { goto } from "$app/navigation"
  import { createEventDispatcher } from "svelte"

  export let article: Article
  export let selected = false

  const dispatch = createEventDispatcher()

  let elem: HTMLAnchorElement | null = null

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
</script>

<!-- TODO: Make this not render broken when JS is disabled -->

<a
  href="/articles/{article.slug}"
  class:selected
  bind:this={elem}
  on:click={() => {
    // This sometimes makes the link go to the wrong place for some reason
    // goto(`/articles/${article.slug}`)
    dispatch("navigate")
  }}
>
  <span>
    <h2 class="title dotdotdot">
      {article.title}
    </h2>
    <p class="subtitle dotdotdot">
      {article.subtitle}
    </p>
    <span class="tag-list">
      {#each article.tags as tag}
        <ArticleTag {tag} size="small" />
      {/each}
    </span>
  </span>
</a>

<style lang="postcss">
  a {
    @apply p-4 rounded-lg;
    @apply bg-gray-100 dark:bg-gray-900;
    @apply text-black dark:text-white;
    @apply shadow-md shadow-gray-300 dark:shadow-gray-700;
    @apply border-t-8 border-transparent;
    @apply outline-none;
    @apply transition-colors duration-100 ease-in-out;
  }

  a:hover,
  a:focus,
  .selected {
    @apply border-t-primary;
  }

  .title {
    @apply text-lg lg:text-xl font-bold;
  }

  .subtitle {
    @apply text-xs opacity-75 uppercase;
  }

  .tag-list {
    @apply flex flex-wrap gap-2 mt-4;
  }

  .dotdotdot {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis;
  }
</style>
