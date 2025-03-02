<script lang="ts">
  interface Props {
    video: string;
  }

  let { video }: Props = $props();
</script>

{#if video}
  <iframe
    src="https://www.youtube-nocookie.com/embed/{video}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    class="w-full aspect-video"
></iframe>
{:else}
  <div
    class="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-sm text-center grid place-items-center w-full h-full"
  >
    <div>
      <p class="font-bold">Invalid YouTube video specified.</p>
      <p>Specified id: <code>{video}</code></p>
    </div>
  </div>
{/if}
