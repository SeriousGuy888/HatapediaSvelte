<script lang="ts">
  import type { MinecraftTextComponent } from "./book_and_quill_interfaces"

  export let textData: MinecraftTextComponent | MinecraftTextComponent[]

  let flattenedExtras: MinecraftTextComponent[] = []

  $: {
    flattenedExtras = []

    if (!Array.isArray(textData)) {
      textData = [textData]
    }

    for (const textComponent of textData) {
      const clone = { ...textComponent }
      delete clone.extra
      flattenedExtras.push(clone)

      if (textComponent.extra) {
        textComponent.extra.forEach((extra) => {
          flattenedExtras.push({ ...textComponent, ...extra })
        })
      }
    }

    console.log(flattenedExtras)
  }
</script>

{#each flattenedExtras as textComponent}
  {@const lines = textComponent.text?.split("\\n") ?? []}
  <p
    style={`
      color: ${textComponent.color?.replace(/_/g, "") ?? "black"};
      font-weight: ${textComponent.bold ? "bold" : "normal"};
      font-style: ${textComponent.italic ? "italic" : "normal"};
      text-decoration: ${textComponent.underlined ? "underline" : "none"};
      text-decoration-line: ${textComponent.strikethrough ? "line-through" : "none"};
      text-shadow: ${textComponent.obfuscated ? "0 0 5px black" : "none"};
      white-space: pre-wrap;
    `}
  >
    {#each lines as value, i}
      <span>
        {value}
        {#if i !== lines.length - 1}
          <br />
        {/if}
      </span>
    {/each}
  </p>
{/each}
