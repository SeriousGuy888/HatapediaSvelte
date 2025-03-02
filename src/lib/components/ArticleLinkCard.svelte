<script lang="ts">
  import { run, createBubbler, preventDefault } from "svelte/legacy"

  const bubble = createBubbler()
  import type { Article } from "$lib/types"
  import ArticleTag from "$lib/components/ArticleTag.svelte"
  import { goto } from "$app/navigation"
  import { createEventDispatcher } from "svelte"
  import { getImageWikilinkSrc } from "$lib/dynamic_components/imageWikilinkParser"

  interface Props {
    article: Article
    selected?: boolean
    showTimeSinceUpdated?: boolean
  }

  let { article, selected = false, showTimeSinceUpdated = false }: Props = $props()

  const dispatch = createEventDispatcher()

  let elem: HTMLDivElement | null = $state(null)

  run(() => {
    if (selected) {
      elem?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
      elem?.focus()
    }
  })

  let target = $state(`/articles/${article.slug}`)
  run(() => {
    target = `/articles/${article.slug}`
  })
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

<div class="card-rounding shadow-gray-300 dark:shadow-gray-700">
  <!--
    This wrapping div is needed because if the rounding were applied directly to its child,
    the thumbnail image would be cut off by the transparent border.
  -->

  <div
    class:selected
    bind:this={elem}
    onclick={goThere}
    onkeydown={(e) => {
      if (e.key === "Enter") goThere()
    }}
    class="card relative isolate bg-gray-100 dark:bg-gray-900 text-black dark:text-white"
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
      onclick={preventDefault(bubble("click"))}
      class="absolute inset-0 z-10 text-transparent select-none"
    >
      Link to {article.title}
    </a>
    <h2 class="dotdotdot text-lg lg:text-xl font-bold">
      {article.title}
    </h2>
    <p class="dotdotdot text-xs opacity-75 uppercase">
      {article.subtitle}
    </p>

    {#if article.image}
      <div class="thumbnail-container">
        <img src={getImageWikilinkSrc(article.image)} alt="" loading="lazy" />
      </div>
    {/if}

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
</div>

<style lang="postcss">
  @reference "../../app.css";

  .card-rounding {
    @apply overflow-hidden;
    @apply rounded-lg;
    @apply shadow-md;
  }

  .card {
    @apply h-full p-4;
    @apply border-t-8 border-transparent;
    @apply transition-colors duration-100 ease-in-out;
    @apply outline-hidden cursor-pointer;
  }

  .card:hover,
  .card:focus,
  .selected {
    @apply border-t-primary;
  }

  .dotdotdot {
    @apply overflow-hidden whitespace-nowrap text-ellipsis;
  }

  .thumbnail-container {
    @apply select-none pointer-events-none;
    @apply absolute -top-2 bottom-0 right-0 left-[50%];
    @apply -z-10;
  }

  .thumbnail-container img {
    @apply w-full h-full object-cover object-top relative;

    /* because minecraft banner images are so low-res */
    image-rendering: pixelated;

    /* fade the left side of the image */
    mask-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 50%) 0%,
      rgba(0, 0, 0, 5%) 70%,
      rgba(0, 0, 0, 0%) 80%
    );
  }
</style>
