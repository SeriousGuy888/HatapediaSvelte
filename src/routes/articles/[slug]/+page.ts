import { error } from "@sveltejs/kit"
import slugMap from "../../../content/slugs.json"

export async function load({ params }) {
  const slug = params.slug
  const fileName: string | undefined = (slugMap as Record<string, string>)[slug]

  try {
    const article = await import(/* @vite-ignore */ `../../../content/articles/${fileName}.md`)

    return {
      content: article.default,
      meta: article.metadata,
    }
  } catch (e) {
    console.error(e)
    throw error(404, `Could not read ${fileName}`)
  }
}
