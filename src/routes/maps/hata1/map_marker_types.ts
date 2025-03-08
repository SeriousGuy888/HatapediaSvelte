export interface MapPin {
  coordinates: [number, number]
  name: string
  description?: string
  articles?: string[]
  banner?: BannerColour
}

export interface MapRegion {
  name: string
  description: string
  coords: [number, number][] // Used to draw an SVG Path polygon
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
