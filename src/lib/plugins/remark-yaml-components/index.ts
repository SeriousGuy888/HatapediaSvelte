import { visit } from "unist-util-visit"
import type * as mdast from "mdast"
import type * as unified from "unified"
import { parse } from "yaml"

interface Options {
  /**
   * the key is the language name to use in the code block
   * the value is the JSX component name it will be converted to
   *
   * @example
   *  "infobox-nation": "NationInfobox"
   *
   * ```infobox-nation... -> <NationInfobox ... />
   */
  conversionMap: {
    [key: string]: string
  }
}

// based on https://github.com/kevinzunigacuellar/remark-code-title/blob/main/packages/remark-code-title/src/remarkPlugin.ts
const convertYamlCodeblocks: unified.Plugin<[Options?], mdast.Root> = (options) => {
  if (!options?.conversionMap || Object.keys(options.conversionMap).length === 0) {
    throw new Error(
      "No options provided to remark-yaml-components. Specify a conversionMap with at least one entry.",
    )
  }

  const { conversionMap } = options

  return (tree, file) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined) {
        return
      }

      // node.lang is the language name specified in markdown ```(lang) ... ```
      const lang = node.lang

      if (!lang || conversionMap[lang] === undefined) {
        // if no lang is specified, or the conversion map does not say to convert this lang,
        // skip to the next code block
        return
      }
      
      const dynamicComponentName = conversionMap[lang]

      // node.value is the content of the code block
      const yaml = node.value

      const replacementNode: mdast.Html = {
        type: "html",
        data: {
          hName: "div",
          hProperties: {
            "data-component": dynamicComponentName,
            "data-props": JSON.stringify(parse(yaml)), // the yaml data, stringified as json
          },
        },
        value: `
          <noscript style="display: block; margin: 2rem 0; color: red;">
            [JavaScript must be enabled to view this ${dynamicComponentName}]
          </noscript>
        `,
      }

      // replace the codeblock with the JSX node
      parent.children[index] = replacementNode
    })
  }
}

export default convertYamlCodeblocks
