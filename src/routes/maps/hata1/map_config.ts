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
  test: {
    name: "test region",
    description: "epic",
    coordinates: [
      [0, 0],
      [0, 100],
      [100, 100],
      [100, 0],
      [50, -50],
    ],
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
  billzoplace: {
    name: "Billzoplace",
    description: "A small city state at the intersection of three rivers.",
    articles: ["billzoplace"],
    coordinates: [47, 1061],
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
  remy_jungle: {
    name: "Remyjungle",
    description:
      "Remy claimed this after Toby yoinked the nearby jungle island before Remy could claim it.",
    articles: ["remy_republic"],
    coordinates: [-865, 1423],
    banner: "purple",
  },
  remy_waterfall: {
    name: "Remywaterfall",
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
  tobytopia: {
    name: "Toby's Base",
    description:
      "Large DVD player. Toby's home. He has a lot of stuff here. Built in the Swamp of Secrets.",
    articles: ["tobytopia"],
    coordinates: [141, 575],
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
  neville: {
    name: "City of Neville",
    description:
      "Arvi lives here. He founded it after abandoning Korolarachi entirely and moving to so random remote place.",
    articles: ["neville", "arvi"],
    coordinates: [1375, 472],
    banner: "pink",
  },
  bakaville: {
    name: "Bakaville",
    description: "Settlement of dogs. Founded by Billzo & Remy, run by their dogs.",
    articles: ["remy", "billzoshoom"],
    coordinates: [1639, 3310],
    banner: "red",
  },
}
