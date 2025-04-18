export interface MapMarkerData {
  name: string
  description?: string
  articles?: string[]
}

export interface MapPinData extends MapMarkerData {
  coordinates: [number, number]
  banner?: BannerColour
}

export interface MapRegionData extends MapMarkerData {
  geometry: string // The key a geometry object stored elsewhere
}

export interface MapRegionGeometry {
  // A list of lists of coordinates for each polygon.
  // Each polygon is a list of coordinates.
  polygons: [number, number][][]
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
