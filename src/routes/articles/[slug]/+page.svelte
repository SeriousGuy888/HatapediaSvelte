<script lang="ts">
  export let data
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <hgroup>
    <h1>{data.meta.title}</h1>
  </hgroup>

  <hr />
  <br /><br /><br />

  <svelte:component this={data.content} />
</article>
