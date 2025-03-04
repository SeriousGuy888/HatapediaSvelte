<script lang="ts">
  import mapImage from "./map.png"
  import BannerMarker from "./BannerMarker.svelte"
  import { locations } from "./map_locations"
  import { Plus, Minus } from "lucide-svelte"

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

      // Register event listener here because {passive:false} is needed.
      mapCamera.addEventListener(
        "touchmove",
        (event) => {
          event.preventDefault()
        },
        { passive: false },
      )
    }
  })

  let mouseScreenX = $state(0)
  let mouseScreenY = $state(0)
  let [mouseImageX, mouseImageY] = $derived(screenSpaceToImageSpace(mouseScreenX, mouseScreenY))
  let [mouseWorldX, mouseWorldZ] = $derived(imageSpaceToWorldSpace(mouseImageX, mouseImageY))

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
    event.preventDefault()
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
    role="button"
    tabindex="0"
    onkeypress={null}
    onclick={() => (selectedPin = null)}
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
          onclick={(event) => {
            event.stopPropagation() // prevent click event from passing through & clicking the map behind this pin
            selectedPin = locationId
          }}
        ></BannerMarker>
      {/each}
    </div>
  </div>
  <nav
    class="absolute top-2 left-2 flex flex-col rounded border-2 bg-background border-foreground z-10"
  >
    <button
      class="cursor-pointer p-1 hover:bg-brand/20"
      onclick={() => changeZoom("in", cameraWidth / 2, cameraHeight / 2)}
      aria-label="Zoom in"
    >
      <Plus class="w-4 h-4" />
    </button>
    <button
      class="cursor-pointer p-1 hover:bg-brand/20"
      onclick={() => changeZoom("out", cameraWidth / 2, cameraHeight / 2)}
      aria-label="Zoom out"
    >
      <Minus class="w-4 h-4" />
    </button>
  </nav>
  <nav
    class={`
      absolute top-2 right-2
      z-10 p-1
      bg-background
      rounded border-2 border-foreground
      cursor-not-allowed pointer-events-none
      font-mono
    `}
  >
    <p>{mouseWorldX}, {mouseWorldZ}</p>
  </nav>
</div>

<aside class="absolute left-2 bottom-2 p-2 bg-background border-2 rounded font-mono text-xs">
  <pre>
isDragging = {isDragging}
lastDragPosition = {lastDragPosition}
offsets: {~~frameOffsetX}, {~~frameOffsetY}
zoom: {zoom.toFixed(3)}

selectedPin: {selectedPin}
description: {selectedPin ? locations[selectedPin].description?.slice(0, 32) + "..." : ""}
</pre>
</aside>
