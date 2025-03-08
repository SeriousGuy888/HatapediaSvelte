import type { MapMarkerData } from "./map_marker_types"

import { pins } from "./map_pins"
import { regions } from "./map_regions"

export const locationSelection = $state({
  selectedLocationId: null as string | null,
})

export function getSelectedLocation(): MapMarkerData | null {
  const id = locationSelection.selectedLocationId
  if (!id) {
    return null
  }

  // TODO: do something about the possibility of pins and regions having the same id
  return pins?.[id] ?? regions?.[id]
}
