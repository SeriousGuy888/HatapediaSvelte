import { MAP_WORLD_ORIGIN_OFFSET } from "./map_config"
import { cameraState, frameState } from "./view_state.svelte"
/**
 * "Clientspace" is the position in the window, with the top left corner of the webpage being 0, 0.
 * "Screenspace" is the position in the view of the camera, with the top left corner of the visible part
 * of the map being 0, 0.
 */
export function clientSpaceToScreenSpace(clientX: number, clientY: number): [number, number] {
  return [clientX - cameraState.left, clientY - cameraState.top]
}

export function screenSpaceToImageSpace(screenX: number, screenY: number): [number, number] {
  return [
    ~~((screenX + frameState.offsetX) / cameraState.zoom),
    ~~((screenY + frameState.offsetY) / cameraState.zoom),
  ]
}

export function imageSpaceToWorldSpace(imageX: number, imageY: number): [number, number] {
  return [imageX - MAP_WORLD_ORIGIN_OFFSET[0], imageY - MAP_WORLD_ORIGIN_OFFSET[1]]
}

export function worldSpaceToImageSpace(worldX: number, worldY: number): [number, number] {
  return [worldX + MAP_WORLD_ORIGIN_OFFSET[0], worldY + MAP_WORLD_ORIGIN_OFFSET[1]]
}

export function clientSpaceToWorldSpace(clientX: number, clientY: number): [number, number] {
  const [screenX, screenY] = clientSpaceToScreenSpace(clientX, clientY)
  const [imageX, imageY] = screenSpaceToImageSpace(screenX, screenY)
  return imageSpaceToWorldSpace(imageX, imageY)
}