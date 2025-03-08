export interface MapRegion {
  name: string
  description: string
  coords: [number, number][] // Used to draw an SVG Path polygon
}

export const regions: { [key: string]: MapRegion } = {
  test: {
    name: "test region",
    description: "epic",
    coords: [ // pentagon
      [0, 0],
      [0, 100],
      [100, 100],
      [100, 0],
      [50, -50],
    ],
  },
}
