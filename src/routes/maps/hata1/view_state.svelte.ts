export const MIN_ZOOM = 1 / 16
export const MAX_ZOOM = 16
export const ZOOM_STEP_FACTOR = 9 / 8

export const cameraState = $state({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  zoom: 0.5,
})

export const frameState = $state({
  offsetX: 0,
  offsetY: 0,
})

export const mouseState = $state({
})

/**
 * @param direction Zoom in or zoom out?
 * @param centerX Screenspace x coordinate around which zooming should occur.
 * @param centerY Screenspace y coordinate around which zooming should occur.
 */
export function changeZoom(direction: "in" | "out", centerX: number, centerY: number) {
  console.log("zooming around ", centerX, centerY)
  const oldZoom = cameraState.zoom

  if (direction == "in") {
    cameraState.zoom = Math.min(cameraState.zoom * ZOOM_STEP_FACTOR, MAX_ZOOM)
  } else if (direction == "out") {
    cameraState.zoom = Math.max(cameraState.zoom / ZOOM_STEP_FACTOR, MIN_ZOOM)
  }

  // Adjust offset to make sure that the zooming is happening around the cursor location.
  frameState.offsetX =
    cameraState.zoom *
    (frameState.offsetX / oldZoom + centerX / oldZoom - centerX / cameraState.zoom)
  frameState.offsetY =
    cameraState.zoom *
    (frameState.offsetY / oldZoom + centerY / oldZoom - centerY / cameraState.zoom)
}
