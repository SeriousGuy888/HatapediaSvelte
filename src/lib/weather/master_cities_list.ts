export interface City {
  // Where to get the real weather data from.
  // Can be a city name, a lat/long pair, or any other valid location query.
  // See https://www.weatherapi.com/docs/
  realWeatherSource: string

  display: {
    name: string
    country: string
  }
}

export interface CityList {
  [optgroup: string]: {
    [id: string]: City
  }
}

export const cities: CityList = {
  "HATA 2": {
    pirate_capital: {
      realWeatherSource: "Antananarivo",
      display: {
        name: "Capital District",
        country: "Piracy Corporation",
      },
    },
    lighthouse_rock: {
      realWeatherSource: "-43.81442286009742, -176.70929888107432", // Port Hutt, New Zealand
      display: {
        name: "Lighthouse Rock",
        country: "Piracy Corporation",
      },
    },
    polar_port: {
      realWeatherSource: "Longyearbyen",
      display: {
        name: "Polar Port",
        country: "Piracy Corporation",
      },
    },
    shipwreck_village: {
      realWeatherSource: "Cape Town",
      display: {
        name: "Shipwreck Village",
        country: "Independent Territory",
      },
    },
  },
  "HATA 1": {
    forgsville_and_no: {
      realWeatherSource: "Toronto",
      display: {
        name: "Forgsville & No",
        country: "Remy Republic",
      },
    },
    scammington: {
      realWeatherSource: "Niagara Falls",
      display: {
        name: "Scammington",
        country: "Remy Republic",
      },
    },
    hawainot: {
      realWeatherSource: "Honolulu",
      display: {
        name: "Hawainot",
        country: "Remy Republic",
      },
    },
    floridanot: {
      realWeatherSource: "Miami",
      display: {
        name: "Floridanot",
        country: "Remy Republic",
      },
    },
    billzoplace: {
      realWeatherSource: "Thunder Bay",
      display: {
        name: "Billzoplace City",
        country: "Billzoplace City State",
      },
    },
    tobytown: {
      realWeatherSource: "New Orleans",
      display: {
        name: "Tobytown",
        country: "Tobytopia",
      },
    },
    tobytopian_southern_territories: {
      realWeatherSource: "San Francisco",
      display: {
        name: "Southern Territories",
        country: "Tobytopia",
      },
    },
    spawn: {
      realWeatherSource: "Winnipeg",
      display: {
        name: "Spawn",
        country: "International Zone",
      },
    },
    layon: {
      realWeatherSource: "Volgograd",
      display: {
        name: "Layon",
        country: "Kingdom of Neville",
      },
    },
    mountain_base: {
      realWeatherSource: "Calgary",
      display: {
        name: "Mountain Base",
        country: "Holdentopia, Incorporated",
      },
    },
  },
}

// Flattened list (optgroups removed) for more convenient lookups by ID
// IN:  { A: { a: {...}, b: {...} }, B: { c: {...}, d: {...} } }
// OUT: { a: {...}, b: {...}, c: {...}, d: {...} }
let flatteningCities: { [id: string]: City } = {}
for (const group of Object.values(cities)) {
  for (const [id, city] of Object.entries(group)) {
    flatteningCities[id] = city
  }
}

export const citiesFlat = Object.freeze(flatteningCities)