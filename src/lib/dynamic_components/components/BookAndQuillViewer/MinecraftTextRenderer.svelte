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
  }

  function mcColourToHex(mcCol: string) {
    // https://minecraft.wiki/w/Formatting_codes#Color_codes
    switch (mcCol) {
      case "black":
      case "reset":
        return "#000000"
      case "dark_blue":
        return "#0000AA"
      case "dark_green":
        return "#00AA00"
      case "dark_aqua":
        return "#00AAAA"
      case "dark_red":
        return "#AA0000"
      case "dark_purple":
        return "#AA00AA"
      case "gold":
        return "#FFAA00"
      case "gray":
        return "#AAAAAA"
      case "dark_gray":
        return "#555555"
      case "blue":
        return "#5555FF"
      case "green":
        return "#55FF55"
      case "aqua":
        return "#55FFFF"
      case "red":
        return "#FF5555"
      case "light_purple":
        return "#FF55FF"
      case "yellow":
        return "#FFFF55"
      case "white":
        return "#FFFFFF"
      default:
        return mcCol
    }
  }
</script>

{#each flattenedExtras as textComponent}
  {@const lines = textComponent.text?.split("\\n") ?? []}
  <p
    class="text-minecraft"
    style={`
      color: ${mcColourToHex(textComponent.color ?? "black")};
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
