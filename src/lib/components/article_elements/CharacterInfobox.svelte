<script lang="ts">
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
            src="/images/{image}"
            alt="Image of {name}"
            width="256"
            height="256"
            class="rounded-xl w-full"
          />
        {:else if mcUuid}
          <img
            src="https://minotar.net/armor/body/{mcUuid}/16.png"
            alt="Minecraft skin"
            loading="lazy"
            width="16"
            height="32"
            class="w-full"
            style="image-rendering: pixelated;"
          />
        {/if}
      </figure>
    {/if}
    <div class="flex flex-col content-start flex-[4] gap-2 min-w-[120px]">
      {#each Object.keys(facts) as key}
        <section
          class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-md p-4 print:border-b-black print:border-2"
        >
          <div class="px-2 py-1">
            <p class="uppercase text-gray-600 dark:text-gray-300 print:text-black text-xs my-0">
              {key}
            </p>
            <span class="text-md text-black dark:text-white print:text-black my-0">
              <!--           
                If the value is an array, render it as a ul,
                otherwise render it as a regular string.
              -->
              {#if facts[key] instanceof Array && facts[key].length > 1}
                <ul class="list-disc">
                  {#each facts[key] as item}
                    <li class="m-0">{item}</li>
                  {/each}
                </ul>
              {:else}
                {facts[key] ?? "Unknown"}
              {/if}
            </span>
          </div>
        </section>
      {/each}
    </div>
  </section>
</aside>

<style>
  @import "/src/app.css";
</style>
