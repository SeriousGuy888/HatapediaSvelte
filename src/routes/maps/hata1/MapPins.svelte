<script lang="ts">
  import { worldSpaceToImageSpace } from "./coordinates.svelte"
  import { MAP_DIMENSIONS } from "./map_config"
  import type { MapPinData } from "./map_marker_types"
  import MapPin from "./MapPin.svelte"

  interface Props {
    pins: { [key: string]: MapPinData }
    selectedPin: string | null
    setSelectedPin: (pinId: string) => void
  }
  let { pins, selectedPin, setSelectedPin }: Props = $props()
</script>

<div class="absolute inset-0 pointer-events-none">
  {#each Object.keys(pins) as pinId}
    {@const location = pins[pinId]}
    {@const [imageX, imageY] = worldSpaceToImageSpace(...location.coordinates)}
    {@const xPosRatio = imageX / MAP_DIMENSIONS.width}
    {@const yPosRatio = imageY / MAP_DIMENSIONS.height}

    <MapPin
      name={location.name}
      colour={location.banner ?? "white"}
      {xPosRatio}
      {yPosRatio}
      selected={selectedPin == pinId}
      onclick={(event) => {
        event.stopPropagation() // prevent click event from passing through & clicking the map behind this pin
        setSelectedPin(pinId)
      }}
    ></MapPin>
  {/each}
</div>
