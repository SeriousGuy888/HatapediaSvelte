<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { X } from "lucide-svelte"

  import type { TimelineEventData } from "./timeline_interfaces"
  import type { EventColours } from "./timeline_event_colours"

  const dispatch = createEventDispatcher()

  export let selectedEvent: TimelineEventData | null = null
  export let selectedEventColours: EventColours | null = null
</script>

<section
  class="bg-blue-200 dark:bg-blue-900 mb-0 px-6 py-4 rounded-t-lg flex justify-between"
  style={selectedEvent ? `background-color: ${selectedEventColours?.colour}` : ""}
>
  <h2
    class="m-0 text-black dark:text-white font-bold"
    style={selectedEvent ? `color: ${selectedEventColours?.textCol}` : ""}
  >
    {selectedEvent?.title ?? "Timeline"}
  </h2>
  {#if selectedEvent}
    <button on:click={() => dispatch("reset_selected_event")}>
      <X color={selectedEvent ? selectedEventColours?.textCol : ""} />
    </button>
  {/if}
</section>
