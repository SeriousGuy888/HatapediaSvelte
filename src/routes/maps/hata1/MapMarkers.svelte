<script lang="ts">
  import MapPins from "./MapPins.svelte"
  import MapRegions from "./MapRegions.svelte"
  import { MAP_DIMENSIONS } from "./map_config"

  import { locationSelection } from "./map_markers.svelte.ts"
  import { userState } from "./view_state.svelte.ts"
  const { pins, regions } = locationSelection

  export let node: HTMLDivElement | null = null
</script>

<div bind:this={node} class="absolute inset-0 z-20 isolate">
  {#if userState.displayRegions}
    <MapRegions
      {regions}
      width={MAP_DIMENSIONS.width}
      height={MAP_DIMENSIONS.height}
      setSelectedRegion={(regionId: string) => (locationSelection.selectedLocationId = regionId)}
    />
  {/if}
  {#if userState.displayPins}
    <MapPins
      {pins}
      selectedPin={locationSelection.selectedLocationId}
      setSelectedPin={(pinId: string) => (locationSelection.selectedLocationId = pinId)}
    />
  {/if}
</div>
