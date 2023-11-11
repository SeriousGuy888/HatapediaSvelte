<script lang="ts">
  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="article-container">
  <hgroup>
    <h1>{data.meta.title}</h1>
    {#if data.meta.subtitle}
      <h2>{data.meta.subtitle}</h2>
    {/if}
  </hgroup>

  <article class="prose dark:prose-invert">
    <svelte:component this={data.content} />
  </article>
</div>

<style lang="postcss">
  hgroup {
    @apply border-b-2 border-gray-200 dark:border-gray-700 pb-4 mb-8;
  }
  hgroup h1 {
    @apply text-4xl sm:text-5xl font-bold mb-2 break-words;
  }
  hgroup h2 {
    @apply text-gray-600 dark:text-gray-300 uppercase text-sm break-words;
  }
  
  .article-container {
    @apply max-w-prose mx-auto px-4 my-8;
  }
</style>
