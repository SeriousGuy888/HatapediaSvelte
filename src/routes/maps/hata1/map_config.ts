import type { MapPinData, MapRegionData } from "./map_marker_types"

export const MAP_DIMENSIONS = {
  width: 10001,
  height: 10001,
}

// The map image is a map of a Minecraft world.
// This constant stores the *image* coordinates at which the *Minecraft* coordinates (0, 0) are located.
export const MAP_WORLD_ORIGIN_OFFSET: [number, number] = [5001, 5001]

// Start with the camera centered at this location.
export const WORLD_DEFAULT_LOCATION: [number, number] = [423, 875]

export const regions: { [key: string]: MapRegionData } = {
  remy_republic: {
    name: "Remy Republic",
    geometry: "57007f",
  },
  helospalustriis: {
    name: "Helospalustriis",
    geometry: "0094ff",
  },
  tobytopia: {
    name: "Tobytopia",
    geometry: "bf642f",
  },
  neville: {
    name: "Neville",
    geometry: "ff006e",
  },
  korolarachi: {
    name: "Korolarachi",
    geometry: "ffd800",
  },
  international_zone: {
    name: "International Zone",
    geometry: "ffffff",
  },
  holdens_holdings: {
    name: "Holden's Holdings",
    geometry: "00ff90",
  },
  bakaville: {
    name: "Bakaville",
    geometry: "1c69a8",
    description: "Settlement of dogs. Founded by Billzo & Remy, run by their dogs.",
    articles: ["remy", "billzoshoom"],
  },
  billzoplace: {
    name: "Billzoplace",
    geometry: "00137f",
  },
}

export const pins: { [key: string]: MapPinData } = {
  spawn: {
    name: "Spawn",
    description:
      "This is where people spawn into the world. It is now home to several floating islands with stuff on them.",
    coordinates: [423, 875],
  },
  un: {
    name: "United Nations HQ",
    description:
      "Originally just some house that Arvi built and intended to sell, this building has since been converted by Remy into the headquarters of the United Nations.",
    articles: ["united_nations", "arvi"],
    coordinates: [559, 813],
    banner: "cyan",
  },
  arvi_craters: {
    name: "The Arvi Craters",
    description:
      "Arvi attempted to fight a wither here, leaving a field of destroyed terrain. Nobody has cleaned it up yet.",
    articles: ["arvi"],
    coordinates: [412, 1038],
  },
  billzoplace_city: {
    name: "Billzoplace City",
    description:
      "A small city state built mostly upon the island of Sheapland at the common mouth of the Spawn River and Sheapland River.",
    articles: ["billzoplace"],
    coordinates: [113, 1135],
    banner: "blue",
  },
  villagermeat_harbour: {
    name: "Villagermeat Harbour",
    description:
      "Also called Port de Villakameat, the Villagermeat Harbour is the main port of Billzoplace City, and a hub of trade and commerce. A parkour course between the hay carts and the big boat is available for those who wish to test their Minecraft prowess.",
    articles: ["billzoplace"],
    coordinates: [6, 1170],
    banner: "blue",
  },
  oil_rig: {
    name: "Limedye Oil Rig",
    description:
      "An oil rig, as part of Project Pollution, built by Billzoshoom in order to pump as much pollution as practically possible into the ocean and the air. (Built atop a slime farm)",
    articles: ["billzoplace"],
    coordinates: [-120, 1222],
    banner: "blue",
  },
  billzo_random_island: {
    name: "Billzoplace Random Island",
    articles: ["billzoplace"],
    coordinates: [-2322, 2441],
    banner: "blue",
  },
  forgsville: {
    name: "Forgsville",
    description:
      "The first province of the Remy Republic. Home to RemyForg and the famous Forgsville rollercoaster.",
    articles: ["remy_republic"],
    coordinates: [313, 1547],
    banner: "purple",
  },
  no: {
    name: "No",
    description:
      "A huge wheat plantation started by Remy and massively expanded by Billzoshoom with some help from Arvi while Remy was on vacation. No is the heart of the Remyan agricultural industry.",
    articles: ["remy_republic", "mangrovepox"],
    coordinates: [390, 1511],
    banner: "purple",
  },
  scammington: {
    name: "Scammington",
    description:
      "A beach where Remy plans to turn into a luxury resort or something like that in order to siphon as much money out of its visitors as possible. Still waiting on that Shimadome...",
    articles: ["remy_republic", "scammington"],
    coordinates: [275, 1442],
    banner: "purple",
  },
  hawainot: {
    name: "Hawainot",
    description: "Capital of the Remy Republic. Toby really wants it.",
    articles: ["remy_republic"],
    coordinates: [-92, 1427],
    banner: "purple",
  },
  new_mangrovia: {
    name: "New Mangrovia",
    description:
      "Formerly known as Remyan Mangrovia, but renamed after the resolution of the Great Mangrove War.",
    articles: ["remy_republic", "tobytopia", "remy", "holden"],
    coordinates: [248, 964],
    banner: "purple",
  },
  north_mangrovia: {
    name: "North Mangrovia",
    description:
      "Remy claimed this right after Toby started building his canal, and this area was the subject of a brief territorial dispute and the site of several skirmishes between the Remy Republic and Tobytopia.",
    articles: ["remy_republic", "tobytopia"],
    coordinates: [293, 841],
    banner: "purple",
  },
  cocoa_bean_cove: {
    name: "Cocoa Bean Cove",
    description:
      "Remy claimed this after Toby yoinked the nearby jungle island before Remy could claim it.",
    articles: ["remy_republic"],
    coordinates: [-865, 1423],
    banner: "purple",
  },
  edmonton: {
    name: "Edmonton",
    description: "A cool waterfall that Remy claimed on his way to claim Floridanot.",
    articles: ["remy_republic"],
    coordinates: [-421, 2285],
    banner: "purple",
  },
  floridanot: {
    name: "Floridanot",
    description: "Far away vacation home for Remy.",
    articles: ["remy_republic"],
    coordinates: [-1072, 3388],
    banner: "purple",
  },
  auze: {
    name: "Auze",
    description:
      "A mushroom island claimed by Remy. Was invaded by Neville briefly during the Mushroom War.",
    articles: ["remy_republic", "mushroom_war"],
    coordinates: [2576, -746],
    banner: "purple",
  },
  toby_palace: {
    name: "Toby's Palace",
    description:
      "This is Toby's base: a tall, majestic structure with a very mysterious moat that once looked like a DVD player while Toby was building it. Its towering silhouette looms quite ominously over the rest of Tobytown, especially on foggy days.",
    articles: ["tobytopia"],
    coordinates: [141, 575],
    banner: "orange",
  },
  tobytown: {
    name: "Tobytown",
    description:
      "Tobytown is the capital city of the Tobytopian Empire, and is a hub of international commerce. The Tobytown harbour facilitates trade from all over the world. A KFV is available in the city for those who need to eat something with a lot of protein.",
    articles: ["tobytopia"],
    coordinates: [227, 600],
    banner: "orange",
  },
  toby_canal: {
    name: "Toby's Canal",
    description:
      "Toby started building this canal so that trade could flow through a much shorter route between Tobytopia and other countries to the south.",
    articles: ["tobytopia"],
    coordinates: [330, 846],
    banner: "orange",
  },
  tobytopia_south_place: {
    name: "Tobytopian Southern Territories",
    description: "Home of Toby's beach house.",
    articles: ["tobytopia"],
    coordinates: [153, 2045],
    banner: "orange",
  },
  tobytopia_jungle_island: {
    name: "Unnamed Tobytopian Jungle Island",
    description: "An island claimed by Toby right before Remy was going to claim it.",
    articles: ["tobytopia", "remy_republic", "remy", "toby"],
    coordinates: [-753, 1574],
    banner: "orange",
  },
  korolarachi_snowplace: {
    name: "Korolarachi Snowplace",
    description: "It has polar bears.",
    articles: ["korolarachi"],
    coordinates: [1702, 1502],
    banner: "yellow",
  },
  holden_iceberg: {
    name: "Holden's Iceberg",
    description: "Cold",
    articles: ["holden"],
    coordinates: [1893, 2406],
    banner: "lime",
  },
  holden_house: {
    name: "Holden's House",
    description: "Holden lives here with his roommate Cary Owo.",
    articles: ["holden"],
    coordinates: [1497, 3432],
    banner: "lime",
  },
  holden_cave: {
    name: "Upper Limbo",
    description: "Some cave of Holden's",
    articles: ["holden"],
    coordinates: [1507, 3779],
    banner: "lime",
  },
  layon: {
    name: "City of Layon",
    description:
      "Arvi lives here. He founded it after abandoning Korolarachi entirely and moving to so random remote place.",
    articles: ["neville", "layon", "arvi"],
    coordinates: [1375, 472],
    banner: "pink",
  },
  nevillian_cherry_grove: {
    name: "Untitled Cherry Grove",
    description: "Arvi claimed this cherry grove, but is yet to do much with it.",
    articles: ["neville"],
    coordinates: [1657, -3300],
    banner: "pink",
  },
}
