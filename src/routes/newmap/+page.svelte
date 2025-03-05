<script lang="ts">
  import mapImage from "./map.png"
  import BannerMarker from "./BannerMarker.svelte"
  import { locations } from "./map_locations"
  import { Plus, Minus } from "lucide-svelte"
  import LocationInfoSheet from "./LocationInfoSheet.svelte"

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

  // Used for pinch zoom gestures
  // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
  let pointerCache = $state<PointerEvent[]>([])
  let prevPointerSquareDist = $state(-1)

  // Set to true when >=2 pointers. Set to false when ==0 pointers.
  // Used to prevent map markers from being deselected after pinch zooming.
  let hadMultiplePointers = $state(false)

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
    ;[mouseScreenX, mouseScreenY] = clientSpaceToScreenSpace(event.clientX, event.clientY)
  }

  /**
   * "Clientspace" is the position in the window, with the top left corner of the webpage being 0, 0.
   * "Screenspace" is the position in the view of the camera, with the top left corner of the visible part
   * of the map being 0, 0.
   */
  function clientSpaceToScreenSpace(clientX: number, clientY: number): [number, number] {
    return [clientX - cameraLeft, clientY - cameraTop]
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

  function pointerUp(event: PointerEvent) {
    isDragging = false

    // Remove this pointer from the cache
    const idx = pointerCache.findIndex((cachedEvent) => cachedEvent.pointerId === event.pointerId)
    if (idx >= 0) {
      pointerCache.splice(idx, 1)
    }

    // If less than two fingers on the screen, reset the zooming distance cache.
    if (pointerCache.length < 2) {
      prevPointerSquareDist = -1
      hadMultiplePointers = false
    }
  }

  let bottomSheetShown = $state(true)
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
  onpointerdown={(event) => {
    pointerCache.push(event)
    if (pointerCache.length >= 2) {
      hadMultiplePointers = true
    }

    updateMousePos(event)
    lastDragPosition = [mouseScreenX, mouseScreenY]
  }}
  onpointermove={(event) => {
    updateMousePos(event)

    if (
      pointerCache.length > 0 &&
      (mouseScreenX != lastDragPosition[0] || mouseScreenY != lastDragPosition[1])
    ) {
      isDragging = true
    }

    // Write to the cache this current event as the latest event pertaining to this pointer.
    const idx = pointerCache.findIndex((cachedEvent) => cachedEvent.pointerId === event.pointerId)
    pointerCache[idx] = event

    if (pointerCache.length === 1) {
      doDrag(mouseScreenX, mouseScreenY)
    } else if (pointerCache.length === 2) {
      // If two fingers/styluses on screen
      const currSquareDist =
        (pointerCache[0].clientX - pointerCache[1].clientX) ** 2 +
        (pointerCache[0].clientY - pointerCache[1].clientY) ** 2

      // The midpoint in screenspace between the two pointers.
      const [centerX, centerY] = clientSpaceToScreenSpace(
        (pointerCache[0].clientX + pointerCache[1].clientX) / 2,
        (pointerCache[0].clientY + pointerCache[1].clientY) / 2,
      )

      if (prevPointerSquareDist > 0) {
        if (currSquareDist > prevPointerSquareDist) {
          changeZoom("in", centerX, centerY)
        } else if (currSquareDist < prevPointerSquareDist) {
          changeZoom("out", centerX, centerY)
        }
      }

      prevPointerSquareDist = currSquareDist
    }
  }}
  onpointerup={(event) => {
    // Deselect the selected map pin only if the pointer was released without dragging (i.e. a single click.)
    if (!isDragging) {
      selectedPin = null
    }
    pointerUp(event)
  }}
  onpointercancel={pointerUp}
  onpointerleave={pointerUp}
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
  <nav class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-end">
    <div
      class={`
      p-1 bg-background
      rounded border-2 border-foreground
      cursor-not-allowed pointer-events-none
      font-mono w-fit
    `}
    >
      <p>{mouseWorldX}, {mouseWorldZ}</p>
    </div>
    <!-- <aside class="p-2 bg-background border-2 rounded font-mono text-xs">
      <pre>
isDragging: {isDragging}
lastDragPosition: {lastDragPosition}
offsets: {~~frameOffsetX}, {~~frameOffsetY}
zoom: {zoom.toFixed(3)}

num pointers: {pointerCache.length}
prev sq dist: {prevPointerSquareDist}
</pre>
    </aside> -->
  </nav>
</div>

<LocationInfoSheet
  expanded={bottomSheetShown}
  location={selectedPin ? locations[selectedPin] : null}
/>
