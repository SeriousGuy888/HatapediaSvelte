<script lang="ts">
  import TimelineEventInfo from "./TimelineEventInfo.svelte"
  import TimelineField from "./TimelineField.svelte"
  import TimelineHeader from "./TimelineHeader.svelte"
  import { getEventColours, type EventColours } from "./timeline_event_colours"
  import type { TimelineEventData } from "./timeline_interfaces"
  import { arrangeLanes } from "./timeline_lanes"

  interface Props {
    title: string | undefined;
    events: TimelineEventData[];
  }

  let { title, events }: Props = $props();

  let selectedEvent: TimelineEventData | null = $state(null)
  let selectedEventColours: EventColours | null = $state(null)

  const isInvalid =
    !title ||
    !Array.isArray(events) ||
    events.length == 0 ||
    events.some(
      (e) =>
        !e.title || !e.date?.start || !e.date?.end || new Date(e.date.start) > new Date(e.date.end),
    )

  let eventsWithRealDates = events.map((e) => {
    return {
      ...e,
      date: {
        start: new Date(e.date.start),
        end: new Date(e.date.end),
      },
    }
  })

  eventsWithRealDates.sort((a, b) => a.date.start.getTime() - b.date.start.getTime())

  /**
   * @param events The events to get the earliest and latest months from
   * @returns An array of months that should be included in the timeline, from the earliest month to the latest month.
   */
  function getMonthsToInclude(events: TimelineEventData[]): Date[] {
    const eventDateEarliest = new Date(events[0].date.start)
    const eventDateLatest = events.reduce((soFar, curr) => {
      return curr.date.end.getTime() > soFar.getTime() ? curr.date.end : soFar
    }, eventDateEarliest)

    const earliestYear = eventDateEarliest.getUTCFullYear()
    const earliestMonth = eventDateEarliest.getUTCMonth() // 0 indexed month -- 0-11
    const latestYear = eventDateLatest.getUTCFullYear()
    const latestMonth = eventDateLatest.getUTCMonth() // 0 indexed month -- 0-11

    const months = []
    for (let i = earliestYear; i <= latestYear; i++) {
      const startMonth = i === earliestYear ? earliestMonth : 0
      const endMonth = i === latestYear ? latestMonth : 11

      for (let j = startMonth; j <= endMonth; j++) {
        months.push(new Date(i, j, 1))
      }
    }

    return months
  }
</script>

{#if isInvalid}
  <p>[Invalid timeline data!]</p>
{:else}
  <div class="not-prose my-8 xl:-mx-36">
    <TimelineHeader
      {selectedEvent}
      {selectedEventColours}
      on:reset_selected_event={() => (selectedEvent = null)}
    />
    <TimelineField
      hidden={!!selectedEvent}
      months={getMonthsToInclude(eventsWithRealDates)}
      lanes={arrangeLanes(eventsWithRealDates)}
      on:select={(e) => {
        selectedEvent = e.detail
        if (selectedEvent) {
          selectedEventColours = getEventColours(selectedEvent)
        }
      }}
    />
    {#if selectedEvent}
      <TimelineEventInfo event={selectedEvent} />
    {/if}
  </div>
{/if}
