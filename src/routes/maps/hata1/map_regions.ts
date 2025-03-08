import type { MapRegionData } from "./map_marker_types"

export const regions: { [key: string]: MapRegionData } = {
  test: {
    name: "test region",
    description: "epic",
    coordinates: [
      [0, 0],
      [0, 100],
      [100, 100],
      [100, 0],
      [50, -50],
    ],
  },
}
