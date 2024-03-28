/**
 * @param {string} fileName The name of the markdown file (can include .md extension).
 * @returns {string} The filename converted to a slug.
 */
export function sluggify(fileName) {
  return fileName
    .toLowerCase()
    .replace(/\.md$/, "") // Remove .md file extension
    .normalize("NFD") // Split an accented character into the base character and the diacritics
    .replace(/\p{Diacritic}/gu, "") // Remove diacritics. e.g. café -> cafe
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_-]/g, "") // Remove anything not alphanumeric, underscore, or hyphen
}
