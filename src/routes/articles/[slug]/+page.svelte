<script lang="ts">
  import { run } from "svelte/legacy"

  import ArticleTag from "../../../lib/components/ArticleTag.svelte"
  import "@portaljs/remark-callouts/styles.css"
  import TableOfContents from "./TableOfContents.svelte"
  import type { TocNode } from "$lib/plugins/remark-heading-tree"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"
  import { onMount, tick } from "svelte"
  import { instantiateDynamicComponents } from "$lib/dynamic_components/dynamic_components_in_md.js"
  import { ListIcon } from "lucide-svelte"
  import { getImageWikilinkSrc } from "$lib/dynamic_components/imageWikilinkParser.js"

  let { data } = $props()

  // A link in the table of contents that links to the top of the page
  // always exists, and is always the first element in the array.
  const topLink: TocNode = {
    id: "_top",
    value: "(top)",
    children: [],
    depth: 0,
  }

  let headings: TocNode[] = $state([])
  run(() => {
    headings = data.meta.headings ?? []
  })

  let tocOpen = $state(false) // Used on small screens to toggle the table of contents

  ///////

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
  run(() => {
    data.content, remountDynamicComponents()
  })
</script>

<svelte:head>
  <title>{data.meta.title} - HATApedia</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta
    property="og:description"
    content="{data.meta.subtitle}. [Tags]: {data.meta.tags.map((s) => '#' + s).join(', ')}"
  />
  <meta property="og:site_name" content="HATApedia" />
</svelte:head>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Toggle table of contents
      tocOpen = !tocOpen
    }
  }}
/>

<div class="grid lg:grid-cols-[auto_1fr] isolate" id="_top">
  <aside
    class={`
      h-full overflow-clip
      transition-all duration-300 ease-in-out
      
      z-20
      w-0 fixed
      lg:w-72 lg:static
      print:w-0

      bg-background lg:bg-none
      shadow-2xl shadow-gray-200 dark:shadow-gray-800 lg:shadow-none
    `}
    class:w-72={tocOpen}
  >
    <div
      class={`
        sticky top-16 px-2 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto h-full
        border-none lg:border-dotted border-r-2 border-gray-200 dark:border-gray-900
      `}
    >
      <p class="text-center font-bold">Contents</p>
      <div class="-ml-6">
        <TableOfContents
          headings={[topLink, ...headings]}
          on:toc-click={(e) => {
            // Close the table of contents (on small screens) when a link is clicked
            tocOpen = false
          }}
        />
      </div>
    </div>
  </aside>
  <div class="fixed lg:hidden bottom-4 right-4 grid z-20 print:hidden">
    <span class="text-sm hide-on-touch">Press <kbd>T</kbd></span>
    <button
      class="bg-brand rounded-full p-4"
      aria-label="Toggle table of contents"
      onclick={() => (tocOpen = !tocOpen)}
    >
      <ListIcon color="white" />
    </button>
  </div>
  <div
    class={`${tocOpen ? "block" : "hidden"} lg:hidden fixed inset-0 bg-black/90 z-10`}
    tabindex="-1"
    role="button"
    onclick={() => (tocOpen = false)}
    onkeydown={() => (tocOpen = false)}
  ></div>
  <article class="w-full mb-32 min-h-screen">
    <header class="relative pb-8 mb-8">
      {#if data.meta.image}
        <section class="-z-10 absolute inset-0">
          <div
            class="banner"
            style="background-image: url('{encodeURI(getImageWikilinkSrc(data.meta.image)).replace(
              /'/g, // Escape single quotes so the url() function in CSS works correctly
              '%27',
            )}')"
          ></div>
        </section>
      {/if}
      <section class="restricted-width py-8">
        <hgroup>
          <h1 class="text-4xl sm:text-5xl font-bold mb-2 break-words w-fit">{data.meta.title}</h1>
          {#if data.meta.subtitle}
            <p
              class="p-1 -mx-1 -mt-1 rounded-lg bg-background/25 text-foreground/80 uppercase text-sm tracking-wide break-words w-fit"
            >
              {data.meta.subtitle}
            </p>
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
          <ul>
            <li>
              Published
              <span>{toIsoDate(data.meta.date_created)}</span>
            </li>
            <li>
              Updated
              <span>{toIsoDate(data.meta.date_modified)}</span>
            </li>
          </ul>
          {#if data.meta.authors}
            <li>
              Written by
              <span>{data.meta.authors.join(" & ")}</span>
            </li>
          {/if}
        </ul>
      </section>
    </header>

    <section class="article-content prose dark:prose-invert restricted-width">
      {@html data.content}

      {#if data.meta.inlinks?.length}
        <hr />
        <h1>Inlinks</h1>
        <p class="text-sm m-0">
          Links to
          <strong>
            {data.meta.title}
          </strong>
          from other articles in Hatapedia:
        </p>
        <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 pt-8 not-prose">
          {#each data.meta.inlinks as inlink}
            <ArticleLinkCard article={inlink} />
          {/each}
        </ul>
      {/if}
    </section>
  </article>
</div>

<style lang="postcss">
  @reference "../../../app.css";

  .restricted-width {
    @apply max-w-md sm:max-w-lg md:max-w-prose print:max-w-full w-full mx-auto px-4 print:px-0;
  }

  .banner {
    @apply bg-contain bg-repeat w-full h-full;

    image-rendering: pixelated;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 30%) 0%,
      rgba(0, 0, 0, 5%) 80%,
      rgba(0, 0, 0, 0%) 90%
    );
  }

  .tag-list {
    @apply flex flex-wrap gap-2 mt-4;
  }

  .article-properties {
    @apply flex flex-wrap justify-between mt-8;

    li {
      @apply text-sm;

      span {
        @apply font-bold;
      }
    }
  }

  :global(.article-content .wikilink-image) {
    @apply rounded;
  }

  :global(.article-content .gallery) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
  }

  :global(.article-content .gallery > img) {
    flex: 1 1 300px;
    margin: 0;
    overflow: hidden;
    min-height: 8rem;
    object-fit: cover;
  }

  :global(.article-content .responsive-table) {
    max-width: 100%;
    overflow-x: auto;
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

  :global(.prose h1:target),
  :global(.prose h2:target),
  :global(.prose h3:target),
  :global(.prose h4:target),
  :global(.prose h5:target),
  :global(.prose h6:target) {
    animation: target 1s;
  }
</style>
