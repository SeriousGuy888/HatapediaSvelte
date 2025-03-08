<script lang="ts">
  import MapPins from "./MapPins.svelte"
  import MapRegions from "./MapRegions.svelte"
  import { MAP_DIMENSIONS } from "./map_config"

  import { pins } from "./map_pins"
  import { regions } from "./map_regions"

  import { locationSelection } from "./map_marker_selection.svelte.ts"
</script>

<div class="absolute inset-0 z-20 isolate">
  <MapRegions
    {regions}
    width={MAP_DIMENSIONS.width}
    height={MAP_DIMENSIONS.height}
    setSelectedRegion={(regionId: string) => (locationSelection.selectedLocationId = regionId)}
  />
  <MapPins
    {pins}
    selectedPin={locationSelection.selectedLocationId}
    setSelectedPin={(pinId: string) => (locationSelection.selectedLocationId = pinId)}
  />
</div>
