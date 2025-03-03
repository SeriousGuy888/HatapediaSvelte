<script lang="ts">
  import { mount, onMount } from "svelte"
  import mapImage from "./map.png"
  import BannerMarker from "./BannerMarker.svelte"
  import type { BannerColour } from "./icons"
  import { locations } from "./map_locations"

  const MAP_DIMENSIONS = {
    width: 10001,
    height: 10001,
  }

  // The map image is a map of a Minecraft world.
  // This constant stores the *image* coordinates at which the *Minecraft* coordinates (0, 0) are located.
  const MAP_WORLD_ORIGIN_OFFSET = [5001, 5001]

  let mapCamera: HTMLDivElement // Contains map frame, but hides overflow, only showing a part of the map frame.
  let cameraWidth = $state(0)
  let cameraHeight = $state(0)
  let cameraLeft = $state(0) // How far the camera div is offset from the left edge of the window.
  let cameraTop = $state(0)

  let mapFrame: HTMLDivElement // Holds the map image, and is transformed around with CSS to zoom and pan.
  let frameOffsetX = $state(0)
  let frameOffsetY = $state(0)

  let isDragging = $state(false)
  let lastDragPosition = $state([0, 0])

  const minZoom = 1 / 16
  const maxZoom = 16
  const zoomFactor = 9 / 8
  let zoom = $state(0.5)

  let mapPinContainer: HTMLDivElement // Holds map pins as children
  let selectedPin = $state<string | null>(null)

  $effect(() => {
    if (mapCamera) {
      const boundingBox = mapCamera.getBoundingClientRect()
      cameraLeft = boundingBox.left
      cameraTop = boundingBox.top
    }
  })

  let mouseScreenX = $state(0)
  let mouseScreenY = $state(0)
  let [mouseImageX, mouseImageY] = $derived(screenSpaceToImageSpace(mouseScreenX, mouseScreenY))
  let [mouseWorldX, mouseWorldY] = $derived(imageSpaceToWorldSpace(mouseImageX, mouseImageY))

  function updateMousePos(event: MouseEvent) {
    mouseScreenX = event.clientX - cameraLeft
    mouseScreenY = event.clientY - cameraTop
  }

  function screenSpaceToImageSpace(screenX: number, screenY: number): [number, number] {
    return [~~((screenX + frameOffsetX) / zoom), ~~((screenY + frameOffsetY) / zoom)]
  }

  function imageSpaceToWorldSpace(imageX: number, imageY: number): [number, number] {
    return [imageX - MAP_WORLD_ORIGIN_OFFSET[0], imageY - MAP_WORLD_ORIGIN_OFFSET[1]]
  }

  function worldSpaceToImageSpace(worldX: number, worldY: number): [number, number] {
    return [worldX + MAP_WORLD_ORIGIN_OFFSET[0], worldY + MAP_WORLD_ORIGIN_OFFSET[1]]
  }

  function beginDrag(x: number, y: number) {
    isDragging = true
    lastDragPosition = [x, y]
  }

  function endDrag() {
    isDragging = false
  }

  function doDrag(x: number, y: number) {
    if (isDragging) {
      frameOffsetX -= x - lastDragPosition[0]
      frameOffsetY -= y - lastDragPosition[1]
      lastDragPosition = [x, y]
    }
  }

  /**
   * @param direction Zoom in or zoom out?
   * @param centerX Screenspace x coordinate around which zooming should occur.
   * @param centerY Screenspace y coordinate around which zooming should occur.
   */
  function changeZoom(direction: "in" | "out", centerX: number, centerY: number) {
    const oldZoom = zoom

    if (direction == "in") {
      zoom = Math.min(zoom * zoomFactor, maxZoom)
    } else if (direction == "out") {
      zoom = Math.max(zoom / zoomFactor, minZoom)
    }

    // Adjust offset to make sure that the zooming is happening around the cursor location.
    frameOffsetX = zoom * (frameOffsetX / oldZoom + centerX / oldZoom - centerX / zoom)
    frameOffsetY = zoom * (frameOffsetY / oldZoom + centerY / oldZoom - centerY / zoom)
  }
</script>

<svelte:head>
  <title>Map</title>
</svelte:head>

<div
  bind:this={mapCamera}
  bind:clientWidth={cameraWidth}
  bind:clientHeight={cameraHeight}
  class="relative overflow-hidden"
  style:cursor={isDragging ? "grabbing" : "grab"}
  role="presentation"
  onmousedown={(event) => beginDrag(mouseScreenX, mouseScreenY)}
  onmouseup={endDrag}
  onmousemove={(event) => {
    updateMousePos(event)
    doDrag(mouseScreenX, mouseScreenY)
  }}
  ontouchstart={(event) => {
    if (event.touches.length === 1) {
      beginDrag(event.touches[0].clientX, event.touches[0].clientY)
    } else {
      console.log("multiple touches not implemented yet")
    }
  }}
  ontouchend={endDrag}
  ontouchmove={(event) => {
    if (event.touches.length === 1) {
      doDrag(event.touches[0].clientX, event.touches[0].clientY)
    } else {
      console.log("multiple touches not implemented yet")
    }
  }}
  onwheel={(event) => {
    changeZoom(event.deltaY > 0 ? "out" : "in", mouseScreenX, mouseScreenY)
  }}
>
  <div
    bind:this={mapFrame}
    class="absolute select-none shadow-xl shadow-gray-700"
    style:width={`${MAP_DIMENSIONS.width * zoom}px`}
    style:height={`${MAP_DIMENSIONS.height * zoom}px`}
    style:left={`${-frameOffsetX}px`}
    style:top={`${-frameOffsetY}px`}
  >
    <img
      src={mapImage}
      id="map-image"
      class="w-full h-full pointer-events-none"
      style:image-rendering="pixelated"
      alt=""
    />
    <div bind:this={mapPinContainer} class="absolute inset-0">
      {#each Object.keys(locations) as locationId}
        {@const location = locations[locationId]}
        {@const [imageX, imageY] = worldSpaceToImageSpace(...location.coordinates)}
        {@const xPosRatio = imageX / MAP_DIMENSIONS.width}
        {@const yPosRatio = imageY / MAP_DIMENSIONS.height}

        <BannerMarker
          name={location.name}
          colour={location.banner ?? "white"}
          {xPosRatio}
          {yPosRatio}
          selected={selectedPin == locationId}
          onclick={() => (selectedPin = locationId)}
        ></BannerMarker>
      {/each}
    </div>
  </div>
</div>

<aside class="absolute left-2 bottom-2 p-2 bg-background border-2 rounded font-mono text-sm">
  <pre>
(work in progress)

isDragging = {isDragging}
lastDragPosition = {lastDragPosition}
offsets: {~~frameOffsetX}, {~~frameOffsetY}
zoom: {zoom.toFixed(3)}

camera: {cameraWidth}×{cameraHeight}
mouse (screenspace): {mouseScreenX}, {mouseScreenY}
mouse (imagespace):  {mouseImageX}, {mouseImageY}
mouse (worldspace):  {mouseWorldX}, {mouseWorldY}

selectedPin: {selectedPin}
</pre>
</aside>
