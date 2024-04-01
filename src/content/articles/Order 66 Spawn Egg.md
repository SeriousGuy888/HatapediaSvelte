---
date_created: 2024-03-31
date_modified: 2024-03-31
subtitle: One of Remy's Unfair Advantages
tags:
  - item
  - hata1
image: "[[pillager_spawn_egg.png]]"
aliases:
  - Order 66
  - Remyan Clone Trooper
  - Order 66 spawn eggs
---

**Order 66 spawn eggs**, also known as **order 66 eggs** or **clone trooper spawn eggs**, are an item that allows the user to spawn a <ruby>pillager<rt>Remyan Clone Trooper</rt></ruby>, holding a crossbow in its mainhand, explosive fireworks in its left hand, and wearing a [[Remy Republic|Remyan]] banner on its head. These spawn eggs were occasionally given to [[Remy]] who could spawn them on his own, but Remy could also sometimes ask [[Billzo]] to use the same spawn eggs to spawn these clone troopers.

These clone troopers, although they wear the Remyan banner on their heads, are not actually loyal to Remy. They appear to simply target whoever is closest to them when they are spawned, which often leads to Remy getting shot by his own clone troopers when he attempts to spawn them on someone else. This is regarded by [[the Laughs]] as well as the Writers of Hatapedia as something extremely funny.

# Item Data

The following is a `/give` command, tested to work in **1.20.4**, that will spawn in a stack of Order 66 spawn eggs as seen on HATA.

```mcfunction
give @p pillager_spawn_egg{display: {Name: '{"text":"Order 66","color":"light_purple"}'}, EntityTag: {ArmorItems: [{}, {}, {id: "minecraft:leather_chestplate", tag: {display: {color: 16777215}}, Count: 1b}, {id: "minecraft:white_banner", tag: {BlockEntityTag: {Patterns: [{Pattern: "mr", Color: 10}, {Pattern: "hhb", Color: 4}, {Pattern: "tts", Color: 3}]}}, Count: 1b}], DeathLootTable: "no_loot_table_pls", Tags: ["66"], HandItems: [{id: "minecraft:crossbow", tag: {display: {Name: '{"text":"Remyan Clone Trooper Blaster","color":"light_purple"}'}, Enchantments: [{id: "minecraft:quick_charge", lvl: 5s}], Unbreakable: 1b}, Count: 1b}, {id: "minecraft:firework_rocket", tag: {Fireworks: {Flight: 2b, Explosions: [{Type: 4, Colors: [I; 16711680]}, {Type: 4, Colors: [I; 16711680]}, {Type: 4, Colors: [I; 16711680]}, {Type: 4, Colors: [I; 16711680], FadeColors: [I; 16764247]}, {Type: 4, Colors: [I; 16711680], FadeColors: [I; 16764247]}, {Type: 0, FadeColors: [I; 16764247], Colors: [I; 16711680], Flicker: 1b}]}, Enchantments: [{}]}, Count: 127b}], ArmorDropChances: [0.085f, 0.085f, 0.085f, 0.0f], HandDropChances: [0.0f, 0.0f], AbsorptionAmount: 20.0f, CustomName: '{"text":"Remyan Clone Trooper"}', Attributes: [{Name: "generic.armor", Base: 20}]}} 64
```

It is worth noting that the data on *these* spawn eggs are not exactly the same as the originals: the originals had `DeathLootTable: "no loot table pls"` where the version here has `DeathLootTable: "no_loot_table_pls"` because having spaces in the loot table did not cause problems originally but causes the pillager to fail to spawn in Minecraft 1.20.4.

# History

i don't remember why i made these for remy

## Notable Appearances

- [[Boxing Matchbox War]]
- idk when else