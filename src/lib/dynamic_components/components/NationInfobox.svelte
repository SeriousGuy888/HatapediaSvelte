<script lang="ts">
  import { getImageWikilinkSrc } from "../imageWikilinkParser"
  import InfoboxFact from "./_InfoboxFact.svelte"

  export let name: string | null = null
  export let facts: Record<string, string[] | string> = {}
  export let banner: string | null = null
</script>

<aside class="my-12">
  {#if name}
    <section class="bg-blue-200 dark:bg-blue-900 mb-0 px-6 py-4 rounded-t-lg">
      <p class="m-0 text-black dark:text-white">
        About <span class="font-bold">{name}</span>
      </p>
    </section>
  {/if}
  <section
    class={`p-6 bg-slate-100 dark:bg-slate-800 ${
      name ? "rounded-b-lg" : "rounded-lg"
    } flex flex-wrap items-start gap-4`}
  >
    <div class="flex-1 min-w-[80px] aspect-[1/2] relative" style="image-rendering: pixelated;">
      <img
        src={banner ? getImageWikilinkSrc(banner) : "/images/no_banner.png"}
        alt={name ? `Banner of ${name}` : `Banner`}
        class="rounded-md m-0 w-full"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col content-start flex-[4] gap-2 min-w-[120px]">
      {#each Object.keys(facts) as key}
        <InfoboxFact title={key} value={facts?.[key]} />
      {/each}
    </div>
  </section>
</aside>
