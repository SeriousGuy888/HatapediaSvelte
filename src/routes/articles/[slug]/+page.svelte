<script lang="ts">
  import ArticleTag from "../../../lib/components/ArticleTag.svelte"
  import "@portaljs/remark-callouts/styles.css"
  import TableOfContents from "./TableOfContents.svelte"
  import type { TocNode } from "$lib/plugins/remark-heading-tree"

  export let data

  const topLink: TocNode = {
    id: "_top",
    value: "(top)",
    children: [],
    depth: 0,
  }
  const headings = data.meta.headings ?? []
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="relative" id="_top">
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

    <section class="prose dark:prose-invert">
      {@html data.content}
    </section>
  </article>

  <aside class="absolute left-0 top-0 h-full w-64 hidden xl:block">
    <div class="sticky top-0 p-2 -ml-3">
      <TableOfContents headings={[topLink, ...headings]} />
    </div>
  </aside>
</div>

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
