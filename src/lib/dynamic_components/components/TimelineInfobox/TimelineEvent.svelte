<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { DAY_WIDTH, LANE_GAP, LANE_HEIGHT, MILLIS_PER_DAY } from "./timeline_constants"
  import type { TimelineEventData } from "./timeline_interfaces"
  import { getImageWikilinkSrc } from "$lib/dynamic_components/imageWikilinkParser"
  import { getEventDateString } from "./timeline_dates"
  import { getEventColours } from "./timeline_event_colours"

  interface Props {
    event: TimelineEventData;
    laneToUse: number;
    timelineStartMonth: Date;
  }

  let { event, laneToUse, timelineStartMonth }: Props = $props();

  const dispatch = createEventDispatcher()

  const daysOffsetFromStart = Math.floor(
    (event.date.start.getTime() - timelineStartMonth.getTime()) / MILLIS_PER_DAY,
  )

  const lengthInDays = Math.floor(
    // add 1 day to compensate for inclusive end date
    (event.date.end.getTime() - event.date.start.getTime()) / MILLIS_PER_DAY + 1,
  )

  const laneOffset = laneToUse * (LANE_HEIGHT + LANE_GAP) + LANE_GAP + "rem"

  const { colour, textCol } = getEventColours(event)
</script>

<button
  class="absolute overflow-clip text-white bg-teal-700 cursor-pointer bg-cover bg-center bg-no-repeat group/event"
  class:short-event={lengthInDays < 10}
  style="
    top: {laneOffset};
    left: {DAY_WIDTH * daysOffsetFromStart}rem;
    width: {DAY_WIDTH * lengthInDays}rem;
    height: {LANE_HEIGHT}rem;
    background-color: {colour};
    color: {textCol};
  "
  onclick={() => dispatch("select", event)}
  onkeydown={(e) => {
    if (e.key === "Enter") {
      dispatch("select", event)
    }
  }}
>
  <section class="relative w-full h-full p-2 isolate">
    <div
      class="absolute inset-0 -z-20 bg-cover object-center"
      style={`${event.image ? `background-image: url("${getImageWikilinkSrc(event.image)}")` : ""}`}
    >
      <div
        class="absolute inset-0 opacity-75 group-hover/event:opacity-100 transition-all duration-300"
        style="background: linear-gradient(to bottom, {colour} 60%, transparent 100%)"
></div>
    </div>

    <h2 class="font-bold text-sm whitespace-nowrap text-ellipsis overflow-clip sticky left-0">
      {event.title}
    </h2>
    <p class="text-xs font-mono opacity-50 whitespace-nowrap">
      {getEventDateString(event)}
    </p>
  </section>
</button>

<style>
  .short-event {
    transition: max-width 500ms;
    max-width: 8rem;

    &:hover {
      width: auto !important;
      max-width: 25dvw;
      z-index: 50;
    }
  }
</style>
