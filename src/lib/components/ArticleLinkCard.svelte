<script lang="ts">
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"

  export let article: Article
  export let selected = false

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

<a href="/articles/{article.slug}" class:selected={selected} bind:this={elem}>
  <div>
    <h2 class="title dotdotdot">
      {article.title}
    </h2>
    <p class="subtitle dotdotdot">
      {article.subtitle}
    </p>
    <div class="tag-list">
      {#each article.tags as tag}
        <ArticleTag {tag} size="small" />
      {/each}
    </div>
  </div>
</a>

<style lang="postcss">
  a {
    @apply p-4 rounded-lg;
    @apply bg-gray-100 dark:bg-gray-900;
    @apply shadow-md shadow-gray-300 dark:shadow-gray-700;
    @apply transition-shadow duration-100 ease-in-out;
    @apply border-t-8 border-transparent;
  }

  a:hover,
  a:focus,
  .selected {
    @apply border-purple-400 dark:border-purple-600;
    @apply outline-none;
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
