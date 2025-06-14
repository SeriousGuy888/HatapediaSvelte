<script lang="ts">
  import { worldSpaceToImageSpace } from "./coordinates.svelte"
  import type { MapRegionData } from "./map_marker_types"
  import { getRegionGeometry } from "./map_markers.svelte"

  interface Props {
    regions: { [key: string]: MapRegionData }
    width: number
    height: number
    setSelectedRegion: (regionId: string) => void
  }
  const { regions, width, height, setSelectedRegion }: Props = $props()

  function polygonListToPath(polygonList: [number, number][][]): string {
    let path = ""

    for (const polygon of polygonList) {
      // temporary fix by adding 1.5 to everything
      // because the geometry converter is off by 1.5 pixels for some reason

      const [firstPolygonX, firstPolygonY] = worldSpaceToImageSpace(...polygon[0])
      path += `M ${firstPolygonX + 1.5} ${firstPolygonY + 1.5} `

      for (let i = 1; i < polygon.length; i++) {
        const [x, y] = worldSpaceToImageSpace(...polygon[i])
        path += `L ${x + 1.5} ${y + 1.5} `
      }

      // Close the polygon by connecting to the first point
      // Otherwise there's a bit of a weird gap in the polygon's edge
      path += `L ${firstPolygonX + 1.5} ${firstPolygonY + 1.5} `
    }
    path += "Z"
    return path
  }
</script>

<svg class="absolute inset-0 overflow-visible" viewBox={`0 0 ${width} ${height}`} role="none">
  {#each Object.entries(regions) as [id, region]}
    {@const geometry = getRegionGeometry(region.geometry)}
    {@const fillColour = region.geometry}
    <path
      d={polygonListToPath(geometry.polygons)}
      style:fill="#{fillColour}90"
      style:stroke="#{fillColour}ef"
      style:stroke-width="0.75"
      class="cursor-pointer outline-0"
      onclick={() => setSelectedRegion(id)}
      onkeypress={() => setSelectedRegion(id)}
      role="button"
      tabindex="0"
    />
  {/each}
</svg>
