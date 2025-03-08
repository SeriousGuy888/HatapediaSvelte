import type { MapRegion } from "./map_marker_types"

export const regions: { [key: string]: MapRegion } = {
  test: {
    name: "test region",
    description: "epic",
    coords: [
      [0, 0],
      [0, 100],
      [100, 100],
      [100, 0],
      [50, -50],
    ],
  },
}
