import type { TimelineEventData } from "./timeline_interfaces"

export interface EventColours {
  colour: string
  textCol: string
}

export function getEventColours(event: TimelineEventData): EventColours {
  const colour = event.colour ?? "#0f766e"
  const textCol = getTextCol(colour)

  return { colour, textCol }
}

function getTextCol(colour?: `#${string}`) {
  if (!colour) {
    return "white"
  }

  let hex = colour.replace("#", "")
  const is3DigitHex = hex.length === 3

  if (is3DigitHex) {
    // convert 3 digit hex to 6 digit hex
    const r = hex.substring(0, 1)
    const g = hex.substring(1, 2)
    const b = hex.substring(2, 3)
    hex = r + r + g + g + b + b
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // https://stackoverflow.com/a/3943023
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "black" : "white"
}

