<script lang="ts">
  import { getImageWikilinkSrc } from "../imageWikilinkParser"
  import InfoboxFact from "./_InfoboxFact.svelte"

  interface Props {
    name: string | undefined
    facts?: Record<string, string[] | string>
    image?: string | null
    mcUuid?: string | null
  }

  let { name, facts = {}, image = null, mcUuid = null }: Props = $props()
</script>

<aside class="my-12 print:outline-2 outline-black">
  <section class="bg-blue-200 dark:bg-blue-900 mb-0 px-6 py-4 rounded-t-lg">
    <p class="m-0 text-black dark:text-white font-bold">{name}</p>
  </section>
  <section class={`p-6 bg-slate-100 dark:bg-slate-800 overflow-auto ${name ? "rounded-b-lg" : "rounded-lg"}`}>
    {#if image || mcUuid}
      <figure class="float-right m-0 ml-4 max-w-[30%] md:max-w-[40%]">
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
            src="https://visage.surgeplay.com/full/256/{mcUuid}.png?no=shadow&y=-40"
            alt="Minecraft skin"
            loading="lazy"
            width="16"
            height="32"
            class="w-full"
          />
        {/if}
      </figure>
    {/if}

    <dl class="flex flex-col content-start gap-2 min-w-[120px] m-0">
      {#each Object.keys(facts) as key}
        <InfoboxFact title={key} value={facts?.[key]} />
      {/each}
    </dl>
  </section>
</aside>
