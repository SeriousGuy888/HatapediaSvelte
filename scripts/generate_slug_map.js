import fs from "fs"
import path from "path"

const slugsFile = path.join(process.cwd(), "src/content/slugs.json")
const articlesDir = path.join(process.cwd(), "src/content/articles/")

generateSlugMap()

function generateSlugMap() {
  const filenames = fs.readdirSync(articlesDir)

  let slugs = {}
  for (const filename of filenames) {
    const slug = sluggify(filename)
    slugs[slug] = filename.replace(/\.md$/, "")
  }

  warnIfDuplicateSlugs(Object.keys(slugs))

  try {
    fs.mkdirSync(path.dirname(slugsFile), { recursive: true })
  } catch (e) {
    // ignore error if directory already exists
  }

  fs.writeFileSync(slugsFile, JSON.stringify(slugs))

  console.log(`Successfully wrote ${Object.keys(slugs).length} article slugs to ${slugsFile}.`)
}

function sluggify(fileName) {
  return fileName.toLowerCase().replace(/\s/g, "_").replace(/\.md$/, "")
}

function warnIfDuplicateSlugs(slugs) {
  const uniqueSlugs = new Set(slugs)
  if (uniqueSlugs.size !== slugs.length) {
    console.warn("Warning: Duplicate article slugs found!")
  }
}
