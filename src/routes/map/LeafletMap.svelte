<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { browser } from "$app/environment"
  import * as config from "$lib/config"
  import type { Map } from "leaflet"

  let mapElement: HTMLDivElement
  let map: Map

  const maxImgZoom = 5
  const fullImgDim: [number, number] = [10240, 10240]
  const mapCenter: [number, number] = [fullImgDim[0] / 2, fullImgDim[1] / 2]
  const mapSW: [number, number] = [0, fullImgDim[1]]
  const mapNE: [number, number] = [fullImgDim[0], 0]

  onMount(async () => {
    if (browser) {
      // Import here because Leaflet relies on the global `window` object. 😩
      const leaflet = await import("leaflet")

      map = leaflet
        .map(mapElement, { crs: leaflet.CRS.Simple, center: mapCenter, maxBoundsViscosity: 0.9 })
        .setView([0, 0], 1)
        .setMinZoom(1)
        .setMaxZoom(8)
        .setZoom(1)

      const bounds = leaflet.latLngBounds(
        map.unproject(mapSW, maxImgZoom),
        map.unproject(mapNE, maxImgZoom),
      )
      map.setMaxBounds(bounds)

      // TODO: Dedicated map tile server.
      leaflet
        .tileLayer("https://hatapedia.vercel.app/map_tile/{z}/{x}/{y}.png", {
          attribution: "HATA SMP World Map",
          minNativeZoom: 1,
          maxNativeZoom: maxImgZoom,
          noWrap: true,
        })
        .addTo(map)
    }
  })

  onDestroy(async () => {
    if (map) {
      console.log("Unloading Leaflet map.")
      map.remove()
    }
  })
</script>

<svelte:head>
  <title>Map - {config.title}</title>
</svelte:head>

<div class="w-full h-full bg-black" bind:this={mapElement} />

<style>
  @import "leaflet/dist/leaflet.css";

  div {
    image-rendering: pixelated;
  }
</style>
