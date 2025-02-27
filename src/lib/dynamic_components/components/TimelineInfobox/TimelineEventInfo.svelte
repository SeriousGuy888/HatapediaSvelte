<script lang="ts">
  import { getImageWikilinkSrc } from "$lib/dynamic_components/imageWikilinkParser"
  import { getEventDateString } from "./timeline_dates"
  import type { TimelineEventData } from "./timeline_interfaces"

  interface Props {
    event: TimelineEventData;
  }

  let { event }: Props = $props();
</script>

<section
  class="bg-slate-100 dark:bg-slate-800 rounded-b-lg overflow-auto w-full p-6 flex justify-between"
>
  <div class="flex flex-col gap-1">
    <p class="text-sm opacity-50">{getEventDateString(event)}</p>
    <p>{event.description ?? ""}</p>
  </div>
  {#if event.image}
    <figure>
      <img
        src={getImageWikilinkSrc(event.image)}
        alt={"Image of " + event.title}
        width={200}
        height={200}
        class="rounded-md"
      />
    </figure>
  {/if}
</section>
