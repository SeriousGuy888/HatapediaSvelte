<script lang="ts">
  import ArticleTag from "../../../lib/components/ArticleTag.svelte"
  import "@portaljs/remark-callouts/styles.css"
  import TableOfContents from "./TableOfContents.svelte"
  import type { TocNode } from "$lib/plugins/remark-heading-tree"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { onMount, tick } from "svelte"
  import { instantiateDynamicComponents } from "$lib/dynamic_components/dynamic_components_in_md.js"

  export let data

  // A link in the table of contents that links to the top of the page
  // always exists, and is always the first element in the array.
  const topLink: TocNode = {
    id: "_top",
    value: "(top)",
    children: [],
    depth: 0,
  }

  let headings: TocNode[] = []
  $: headings = data.meta.headings ?? []

  const toIsoDate = (date: Date) => date.toISOString().split("T")[0]

  // https://github.com/dimfeld/website/blob/54c30d47ecaa02fabfc5c5ccedf419035da02c77/src/routes/writing/_Article.svelte
  let isMounted = false // Needed to prevent mounting before the DOM is ready
  let destroyComponents: Promise<() => void> | null = null

  onMount(() => {
    isMounted = true
    remountDynamicComponents()
    return unmountDynamicComponents
  })

  async function remountDynamicComponents() {
    if (!isMounted) {
      return
    }
    unmountDynamicComponents()
    await tick()
    destroyComponents = instantiateDynamicComponents()
  }

  function unmountDynamicComponents() {
    if (destroyComponents) {
      destroyComponents.then((destroy) => destroy())
      destroyComponents = null
    }
  }

  // When the page changes, remount the dynamic components
  $: data.content, remountDynamicComponents()
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="grid grid-cols-[auto,1fr]" id="_top">
  <aside
    class={`
      h-full
      w-0 lg:w-64 overflow-clip
      transition-all duration-300 ease-in-out
      bg-opacity-20 bg-gray-200 dark:bg-opacity-30 dark:bg-gray-900
    `}
  >
    <div class="sticky top-0 px-2 pt-4 max-h-screen overflow-y-auto">
      <p class="text-center font-bold">Contents</p>
      <div class="-ml-3">
        <TableOfContents headings={[topLink, ...headings]} />
      </div>
    </div>
  </aside>
  <article class="article-container max-w-prose">
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
      <ul class="article-properties">
        <li>
          Published
          <span>{toIsoDate(data.meta.date_created)}</span>
        </li>
        <li>
          Updated
          <span>{toIsoDate(data.meta.date_modified)}</span>
        </li>
      </ul>
    </header>

    <section class="prose dark:prose-invert">
      {@html data.content}
    </section>

    {#if data.meta.inlinks?.length}
      <section class="pt-16 mt-16 border-t-2 border-gray-200 dark:border-gray-700">
        <div class="pb-6">
          <h2 class="text-3xl font-bold">Inlinks</h2>
          <p class="text-sm italic">
            Links to
            <strong>
              {data.meta.title}
            </strong>
            from other articles in Hatapedia:
          </p>
        </div>
        <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {#each data.meta.inlinks as inlink}
            <ArticleLinkCard article={inlink} />
          {/each}
        </ul>
      </section>
    {/if}
  </article>
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

  .article-properties {
    @apply flex flex-wrap justify-between gap-2 mt-8;

    li {
      @apply text-sm;

      span {
        @apply font-bold;
      }
    }
  }

  :global(.wikilink-image) {
    @apply rounded;
  }

  :global(.gallery) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
  }

  :global(.gallery > img) {
    flex: 1 1 200px;
    margin: 0;
    overflow: hidden;
    min-height: 8rem;
    object-fit: cover;
  }

  /* Animation to highlight headings when their anchor link is followed */
  @keyframes target {
    0% {
      text-decoration: underline;
    }
    100% {
      text-decoration: underline;
    }
  }

  :global(.prose :target):is(h1, h2, h3, h4, h5, h6) {
    animation: target 1s;
  }
</style>
