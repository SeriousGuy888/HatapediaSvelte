<script lang="ts">
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"

  export let article: Article
</script>

<a href="/articles/{article.slug}">
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
    @apply p-4 rounded-xl;
    @apply bg-gray-100 dark:bg-gray-900;
    @apply shadow-sm shadow-gray-300 dark:shadow-gray-700;
    @apply hover:shadow-md transition-shadow duration-100 ease-in-out;
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
