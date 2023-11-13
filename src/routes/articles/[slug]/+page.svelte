<script lang="ts">
  import ArticleTag from "../../../lib/components/ArticleTag.svelte"

  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="article-container">
  <header>
    <hgroup>
      <h1>{data.meta.title}</h1>
      {#if data.meta.subtitle}
        <p>{data.meta.subtitle}</p>
      {/if}
    </hgroup>
    {#if data.meta.tags?.length > 0}
      <div class="tag-list">
        {#each data.meta.tags as tag}
          <ArticleTag {tag} />
        {/each}
      </div>
    {/if}
  </header>

  <div class="prose dark:prose-invert">
    <!-- <svelte:component this={data.content} /> -->
    {@html data.content}
  </div>
</article>

<style lang="postcss">
  header {
    @apply border-b-2 border-gray-200 dark:border-gray-700 pb-8 mb-8;
  }

  hgroup h1 {
    @apply text-4xl sm:text-5xl font-bold mb-2 break-words;
  }
  hgroup p {
    @apply text-gray-600 dark:text-gray-300 uppercase text-sm break-words;
  }

  .article-container {
    @apply max-w-prose mx-auto px-4 my-8;
  }

  .tag-list {
    @apply flex flex-wrap gap-2 mt-4;
  }
</style>
