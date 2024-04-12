import { WEATHER_API_COM_API_KEY as apiKey } from "$env/static/private"
import type { WeatherData } from "../../../../lib/weather/weatherapi_types.ts"
import { json } from "@sveltejs/kit"
import { citiesFlat } from "$lib/weather/master_cities_list.ts"

export async function GET({ params }) {
  const { city } = params
  const foundCity = citiesFlat[city]

  if (!foundCity) {
    // I don't know how to return a 404 status code response with json body
    return json({
      status: 404,
      body: {
        error: {
          code: -1,
          message: `City not found: ${city}`,
        },
      } as WeatherData,
    })
  }

  try {
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${foundCity.realWeatherSource}&aqi=no`,
    )
    const weatherData: WeatherData = await weatherRes.json()

    return json({
      status: 200,
      body: weatherData,
    })
  } catch (err) {
    return json({
      status: 500,
      body: {
        error: {
          code: -1,
          message: `Failed to make API request: ${err}`,
        },
      } as WeatherData,
    })
  }
}
