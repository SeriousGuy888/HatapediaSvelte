export function getImageWikilinkSrc(wikilink: string) {
  if (typeof wikilink !== "string") {
    console.warn("Expected a string for the image wikilink", wikilink)
    return wikilink
  }

  // Matches [[texttexttext]] and ![[texttexttext]] as wikilinks
  // and returns the texttexttext part in match[1]
  const match = RegExp(/^!?\[\[(.*)\]\]$/).exec(wikilink)

  if (match) {
    // If a wikilink is found, use its filename to construct the
    // image src to be used on the frontend
    return "/images/" + match[1]
  }

  // If no wikilink is found, return the original string
  return wikilink
}
