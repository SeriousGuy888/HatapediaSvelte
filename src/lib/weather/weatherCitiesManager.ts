interface City {
  weatherSource: string
  display: {
    name: string
    country: string
  }
}

export interface CityDisplayData {
  id: string
  name: string
  country: string
}

const masterCityList: Record<string, City> = {
  forgsville_and_no: {
    weatherSource: "Toronto",
    display: {
      name: "Forgsville & No",
      country: "Remy Republic",
    },
  },
  scammington: {
    weatherSource: "Niagara Falls",
    display: {
      name: "Scammington",
      country: "Remy Republic",
    },
  },
  hawainot: {
    weatherSource: "Honolulu",
    display: {
      name: "Hawainot",
      country: "Remy Republic",
    },
  },
  floridanot: {
    weatherSource: "Miami",
    display: {
      name: "Floridanot",
      country: "Remy Republic",
    },
  },
  billzoplace: {
    weatherSource: "Thunder Bay",
    display: {
      name: "Billzoplace City",
      country: "Billzoplace City State",
    },
  },
  swamp_of_secrets: {
    weatherSource: "New Orleans",
    display: {
      name: "Swamp of Secrets",
      country: "Tobytopia",
    },
  },
  tobytopian_southern_territories: {
    weatherSource: "San Francisco",
    display: {
      name: "Southern Territories",
      country: "Tobytopia",
    },
  },
  spawn: {
    weatherSource: "Winnipeg",
    display: {
      name: "Spawn",
      country: "International Zone",
    },
  },
  layon: {
    weatherSource: "Volgograd",
    display: {
      name: "Layon",
      country: "Kingdom of Neville",
    },
  },
  mountain_base: {
    weatherSource: "Calgary",
    display: {
      name: "Mountain Base",
      country: "Holdentopia, Incorporated",
    },
  },
}

/**
  Processes the masterCityList into a format that can be used by the client
  
  @example
  {
    forgsville: {
      id: "forgsville",
      name: "Forgsville",
      country: "Remy Republic",
    },
    ...
  }
*/
export function getClientCityList(): Record<string, CityDisplayData> {
  return Object.keys(masterCityList).reduce(
    (acc, cityId) => ({
      ...acc,
      [cityId]: {
        id: cityId,
        ...masterCityList[cityId].display,
      },
    }),
    {},
  )
}

/**
  Processes the masterCityList into a kvp of city id to real city weather source
  Example:

  @example
  { 
    forgsville: "Toronto",
    ...
  }
*/
export function getFakeCityRealCityMap(): { [id: string]: string } {
  return Object.keys(masterCityList).reduce(
    (acc, cityId) => ({
      ...acc,
      [cityId]: masterCityList[cityId].weatherSource,
    }),
    {},
  )
}
