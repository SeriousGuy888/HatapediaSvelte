<script lang="ts">
  export let video: string

  const width = 560
  const height = 315
</script>

{#if video}
  <iframe
    {width}
    {height}
    src="https://www.youtube-nocookie.com/embed/{video}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  />
{:else}
  <div
    class="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded text-center grid place-items-center"
    style="width: {width}px; height: {height}px;"
  >
    <div>
      <p class="font-bold">Invalid YouTube video specified.</p>
      <p>Specified id: <code>{video}</code></p>
    </div>
  </div>
{/if}
