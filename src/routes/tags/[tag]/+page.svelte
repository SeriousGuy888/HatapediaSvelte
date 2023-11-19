<script lang="ts">
  import { title as siteTitle } from "$lib/config"
  import { page } from "$app/stores"
  import ArticleLinkCard from "$lib/components/ArticleLinkCard.svelte"

  export let data

  let title = ""
  $: title = `#${$page.params.tag} - ${siteTitle}`
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
</svelte:head>

<div class="w-full grid place-items-center p-8 sm:p-16">
  <hgroup>
    <h1
      class="text-2xl sm:text-4xl font-bold tracking-tight bg-primary w-fit px-4 py-2 sm:px-8 sm:py-4 rounded-full"
    >
      #{$page.params.tag}
    </h1>
  </hgroup>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl mt-8 sm:mt-12"
  >
    {#each data.articles as article}
      <ArticleLinkCard {article} />
    {/each}
  </section>
</div>
