import type { TimelineEventData } from "./timeline_interfaces"

function getIsoDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function getEventDateString(event: TimelineEventData): string {
  return event.date.start.getTime() === event.date.end.getTime()
    ? getIsoDate(event.date.start)
    : `${getIsoDate(event.date.start)} - ${getIsoDate(event.date.end)}`
}
