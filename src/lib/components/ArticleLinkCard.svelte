<script lang="ts">
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"

  export let article: Article
</script>

<a
  href="/articles/{article.slug}"
  class={`
    p-4 rounded-xl
    bg-gray-100 dark:bg-gray-900
    shadow-sm shadow-gray-300 dark:shadow-gray-700
    hover:shadow-md transition-shadow duration-100 ease-in-out
  `}
>
  <div>
    <h2 class="text-lg lg:text-xl font-bold dotdotdot">
      {article.title}
    </h2>
    <p class="text-xs opacity-75 uppercase dotdotdot">
      {article.subtitle}
    </p>
    <div class="flex gap-2 mt-4 flex-wrap">
      {#each article.tags as tag}
        <ArticleTag {tag} size="small" />
      {/each}
    </div>
  </div>
</a>

<style lang="postcss">
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
