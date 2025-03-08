import type { MapMarkerData, MapRegionData } from "./map_marker_types"

import { pins, regions } from "./map_config.ts"

export const locationSelection = $state({
  selectedLocationId: null as string | null,
  pins,
  regions,
})

export function getSelectedLocation(): MapMarkerData | null {
  const id = locationSelection.selectedLocationId
  if (!id) {
    return null
  }

  // todo: handle case where id is duplicated in pins and regions
  return locationSelection.pins?.[id] ?? locationSelection.regions?.[id]
}

/**
 * Only returns the selected region if it is a region, not a pin.
 * @returns the selected region, or null if no region is selected
 */
export function getSelectedRegion(): MapRegionData | null {
  const id = locationSelection.selectedLocationId
  if (!id) {
    return null
  }

  return locationSelection.regions?.[id] ?? null
}
