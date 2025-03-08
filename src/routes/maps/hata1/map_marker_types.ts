export interface MapMarker {
  name: string
  description?: string
}

export interface MapPin extends MapMarker {
  coordinates: [number, number]
  articles?: string[]
  banner?: BannerColour
}

export interface MapRegion extends MapMarker {
  coordinates: [number, number][] // Used to draw an SVG Path polygon
}

export type BannerColour =
  | "black"
  | "blue"
  | "brown"
  | "cyan"
  | "gray"
  | "green"
  | "light_blue"
  | "light_gray"
  | "lime"
  | "orange"
  | "pink"
  | "magenta"
  | "purple"
  | "red"
  | "white"
  | "yellow"
