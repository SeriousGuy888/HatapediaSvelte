<script lang="ts">
  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div>
  <hgroup>
    <h1>{data.meta.title}</h1>
  </hgroup>

  <br /><br /><br />

  <article class="prose dark:prose-invert">
    <svelte:component this={data.content} />
  </article>
</div>
