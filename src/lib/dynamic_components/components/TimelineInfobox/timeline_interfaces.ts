export interface TimelineEventData {
  title: string
  description?: string
  lane?: number
  colour?: `#${string}`
  image?: string // wikilink to an image
  date: DateRange
}

export interface DateRange {
  start: Date
  end: Date
}
