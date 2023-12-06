// Largely stolen from
// https://github.com/dimfeld/website/blob/54c30d47ecaa02fabfc5c5ccedf419035da02c77/src/dynamicComponents.ts

import { tick, type SvelteComponent } from "svelte"
import DynamicComponentWrapper from "./DynamicComponentWrapper.svelte"

const components: Record<string, () => Promise<any>> = {
  CharacterInfobox: () => import("$lib/components/article_elements/CharacterInfobox.svelte"),
  YouTubeVideo: () => import("$lib/components/article_elements/YouTubeVideo.svelte"),
  NationInfobox: () => import("$lib/components/article_elements/NationInfobox.svelte"),
}

async function instantiateComponent(element: Element) {
  try {
    // Get the attributes of the element <div attribute-name="value">
    const attrNames = element.getAttributeNames()

    // Store here the Svelte component to be rendered in its place if found
    let component: SvelteComponent | null = null
    let props: Record<string, any> = {}

    // Loop through all the attributes of the element
    for (const attrName of attrNames) {
      const value = element.getAttribute(attrName)
      if (!value) {
        continue
      }

      if (attrName === "data-component") {
        const componentImporter = components[value]

        if (!componentImporter) {
          console.warn(`Dynamic component ${value} not defined.`)
          continue
        }

        console.log("Loading dynamic component", value)
        await tick() // Wait for Svelte to tick
        component = (await componentImporter()).default
        console.log("Loaded dynamic component", value)
      } else if (attrName === "data-props") {
        try {
          props = JSON.parse(value)
        } catch (e) {
          console.error(`Error parsing props for component ${component?.name}:`, e)
        }
      }
    }

    if (!component) {
      return
    }

    console.log("Instantiating dynamic component", component.name, "in place of", element)
    console.log("Props:", props)

    const instance = new DynamicComponentWrapper({
      target: element,
      props: {
        component,
        props,
      },
    })

    element.classList.add("has-component")

    return instance
  } catch (e) {
    console.error(e)
  }
}

export async function instantiateDynamicComponents() {
  const divs = document.querySelectorAll("[data-component]")
  const components: SvelteComponent[] = []

  for (const div of divs) {
    const component = await instantiateComponent(div)
    if (component) {
      components.push(component)
    }
  }

  return () => {
    for (const component of components) {
      try {
        component.$destroy()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
