// https://minecraft.wiki/w/Raw_JSON_text_format#Java_Edition
// https://minecraft.wiki/w/Written_Book#Data_values

// export interface WrittenBookData {
//   pages: string[]
//   title?: string
//   author?: string
//   generation?: number
// }

export interface MinecraftTextComponent {
  text?: string
  color?: string
  bold?: boolean
  italic?: boolean
  underlined?: boolean
  strikethrough?: boolean
  obfuscated?: boolean
  extra?: MinecraftTextComponent[]
}
