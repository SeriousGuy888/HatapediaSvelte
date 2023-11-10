<script lang="ts">
  import * as config from "$lib/config"

  export let data
</script>

<head>
  <title>
    {config.title}
  </title>
</head>

<section>
  <ul class="articles">
    {#each data.articles as article}
      <li class="article">
        <a href="/articles/{article.slug}">
          <h2>{article.title}</h2>
        </a>
      </li>
    {/each}
  </ul>
</section>
