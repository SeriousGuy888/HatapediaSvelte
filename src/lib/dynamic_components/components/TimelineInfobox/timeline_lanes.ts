import type { TimelineEventData, DateRange } from "./timeline_interfaces"

/**
 * @param events The events to arrange into lanes
 * @returns An array of lanes, each containing events that do not overlap with each other.
 *
 *          If specified, the event will be placed in the specified lane if it is available.
 *          If an event does not specify a lane or its preferred lane is occupied, it will be placed in the next
 *          available lane.
 *
 *          Any empty lanes will be filtered out, ie: if events want to be in lanes 10, 20, and 40, they will
 *          instead by placed in lanes 0, 1, and 2.
 */
export function arrangeLanes(events: TimelineEventData[]) {
  let lanes: Lane[] = []
  for (const event of events) {
    if (event.lane == undefined || lanes[event.lane]?.isOccupied(event.date)) {
      event.lane = findOpenLane(lanes, event.date)
    }

    if (!lanes[event.lane]) {
      lanes[event.lane] = new Lane()
    }

    lanes[event.lane].addEvent(event)
  }

  // filter out any empty lanes
  lanes = lanes.filter(Boolean)
  return lanes
}


/**
 * Find the first available lane from the state of used lanes that doesn't have any events that overlap with the event.
 * If there are no available lanes, return the next lane that does not exist yet.
 *
 * Used if an event does not specify a lane to be placed in.
 */
function findOpenLane(lanes: Lane[], dateRange: DateRange): number {
  let laneToUse = 0
  let foundOpenLane = false

  while (!foundOpenLane) {
    if (
      lanes[laneToUse] === undefined || // if lane does not exist yet
      !lanes[laneToUse].isOccupied(dateRange) // if there's a free slot in the lane if it does exist
    ) {
      break
    }

    laneToUse++
  }

  return laneToUse
}

/**
 * A Lane keeps track of date ranges that are occupied in that Lane
 * so that events won't be placed in a Lane, but rather the next Lane
 * if it would overlap with an event in that Lane.
 *
 * It also keeps track of the events that are in that Lane.
 */
export class Lane {
  occupiedRanges: DateRange[]
  events: TimelineEventData[]

  constructor() {
    this.occupiedRanges = []
    this.events = []
  }

  addEvent(event: TimelineEventData) {
    this.markOccupied(event.date)
    this.events.push(event)
  }

  markOccupied(dateRange: DateRange) {
    this.occupiedRanges.push(dateRange)
    this.mergeOverlappingRanges()
  }

  isOccupied(dateRange: DateRange) {
    return this.occupiedRanges.some(
      (occupiedRange) =>
        dateRange.start.getTime() <= occupiedRange.end.getTime() &&
        dateRange.end.getTime() >= occupiedRange.start.getTime(),
    )
  }

  mergeOverlappingRanges() {
    this.occupiedRanges.sort((a, b) => a.start.getTime() - b.start.getTime())

    for (let i = 0; i < this.occupiedRanges.length - 1; i++) {
      const currentRange = this.occupiedRanges[i]
      const nextRange = this.occupiedRanges[i + 1]

      if (currentRange.end.getTime() >= nextRange.start.getTime()) {
        currentRange.end = nextRange.end
        this.occupiedRanges.splice(i + 1, 1)
        i-- // NOSONAR
      }
    }
  }
}
