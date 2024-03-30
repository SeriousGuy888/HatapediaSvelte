<script lang="ts">
  import { getImageWikilinkSrc } from "../imageWikilinkParser"
  import InfoboxFact from "./_InfoboxFact.svelte"

  export let name: string | undefined
  export let facts: Record<string, string[] | string> = {}
  export let image: string | null = null
  export let mcUuid: string | null = null
</script>

<aside class="my-12">
  <section class="bg-blue-200 dark:bg-blue-900 mb-0 px-6 py-4 rounded-t-lg">
    <p class="m-0 text-black dark:text-white font-bold">{name}</p>
  </section>
  <section
    class={`p-6 bg-slate-100 dark:bg-slate-800 ${
      name ? "rounded-b-lg" : "rounded-lg"
    } flex flex-wrap items-start gap-8 @container`}
  >
    {#if image || mcUuid}
      <figure class="@sm:flex-1 m-0 w-full flex justify-center">
        {#if image}
          <img
            src={getImageWikilinkSrc(image)}
            alt="Image of {name}"
            width="256"
            height="256"
            class="rounded-xl w-full"
          />
        {:else if mcUuid}
          <img
            src="https://visage.surgeplay.com/full/256/{mcUuid}.png?no=shadow"
            alt="Minecraft skin"
            loading="lazy"
            width="16"
            height="32"
            class="w-full"
          />
        {/if}
      </figure>
    {/if}
    <div class="flex flex-col content-start flex-[4] gap-2 min-w-[120px]">
      {#each Object.keys(facts) as key}
        <InfoboxFact title={key} value={facts?.[key]} />
      {/each}
    </div>
  </section>
</aside>
