import { getClientCityList } from "$lib/weather/weatherCitiesManager.js"

export async function load() {
  return { cities: getClientCityList() }
}
