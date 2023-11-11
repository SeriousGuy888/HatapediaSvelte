export function sluggify(fileName) {
  return fileName
    .toLowerCase()
    .replace(/\s/g, "_")
    .replace(/\.md$/, "")
    .normalize("NFD") // Remove diacritics from letters, eg: café -> cafe
    .replace(/\p{Diacritic}/gu, "")
}
