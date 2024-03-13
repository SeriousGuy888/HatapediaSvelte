<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import TimelineEvent from "./TimelineEvent.svelte"
  import { DAY_WIDTH, LANE_HEIGHT, LANE_GAP, MILLIS_PER_DAY } from "./timeline_constants"
  import type { Lane } from "./timeline_lanes"

  export let hidden: boolean = false
  export let months: Date[] = []
  export let lanes: Lane[] = []

  const dispatch = createEventDispatcher()

  function getNumDaysInMonth(month: Date): number {
    // Takes the month provided, goes to the next month, and then goes back a day,
    // returning the # of the last day of the month
    return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  }

  const gridLineStyles = `border-slate-300 dark:border-slate-700 border-r-[1px] last:border-r-0`
</script>

<section
  class={`bg-slate-100 dark:bg-slate-800 rounded-b-lg overflow-auto w-full ${
    hidden ? "hidden" : ""
  }`}
>
  <div class="flex">
    {#each months as month}
      <div
        class={`py-2 border-b-[1px] bg-slate-200 dark:bg-slate-900 text-center flex-shrink-0 h-full ${gridLineStyles}`}
        style="width: {DAY_WIDTH * getNumDaysInMonth(month)}rem"
      >
        <h2 class="m-0 text-sm tracking-widest whitespace-nowrap font-bold">
          {month.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
      </div>
    {/each}
  </div>
  <div
    class="relative"
    style={`height: ${Math.min(lanes.length, 4) * (LANE_HEIGHT + LANE_GAP) + LANE_GAP}rem`}
  >
    <section class="absolute inset-0 flex">
      {#each months as month}
        {@const daysOffsetFromStart = Math.floor(
          (month.getTime() - months[0].getTime()) / MILLIS_PER_DAY,
        )}

        <div
          class={`h-full flex-shrink-0 ${gridLineStyles}`}
          style={`
            width: ${DAY_WIDTH * getNumDaysInMonth(month) + "rem"};
            left: ${DAY_WIDTH * daysOffsetFromStart + "rem"};
          `}
        />
      {/each}
    </section>
    {#each lanes as lane, laneIndex}
      {#each lane.events as event, index}
        <TimelineEvent
          {event}
          laneToUse={laneIndex}
          timelineStartMonth={months[0]}
          on:select={(e) => {
            dispatch("select", e.detail)
          }}
        />
      {/each}
    {/each}
  </div>
</section>
