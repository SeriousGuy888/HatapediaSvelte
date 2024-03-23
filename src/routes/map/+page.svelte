<script>
  const lastUpdated = "2024-03-23"
  const title = "HATA 2 World Map"
</script>

<svelte:head>
  <title>{title} ({lastUpdated})</title>
  <meta property="og:title" content={title} />
  <meta
    property="og:description"
    content="An interactive map of the HATA 2 overworld. Last updated {lastUpdated}"
  />
</svelte:head>

<iframe src="/map/unmined.index.html" {title} width="100%" height="100%" />
