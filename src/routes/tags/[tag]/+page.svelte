<script lang="ts">
  import { title as siteTitle } from "$lib/config"
  import { page } from "$app/stores"

  export let data

  const tag = $page.params.tag
  const title = `#${tag} - ${siteTitle}`
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
</svelte:head>

<h1>#{tag}</h1>

<br />

<section class="flex flex-col gap-2">
  {#each data.articles as article}
    <a href="/articles/{article.slug}">{article.title}</a>
  {/each}
</section>
