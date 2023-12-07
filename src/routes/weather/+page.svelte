<script lang="ts">
  import WeatherCard from "./WeatherCard.svelte"
  import type { CityDisplayData } from "$lib/weather/weatherCitiesManager"
  import type { TemperatureUnit, WeatherData } from "$lib/weather/weatherapi_types.js"
  import SelectDropdown from "./SelectDropdown.svelte"
  import { onMount } from "svelte"
  import { swr } from "@svelte-drama/swr"

  export let data

  const cities: Record<string, CityDisplayData> = data.cities

  let selectedCityId = Object.keys(cities)[0]
  let selectedTempUnit: TemperatureUnit = "celsius"

  let weatherData: WeatherData | null = null

  // Create a SWR model to fetch the weather data
  // will cache the data so if the user switches back to the same city it will be instant
  // and won't require another API call
  const model = swr<string, WeatherData>({
    key(id: string) {
      return id
    },
    async fetcher(url: string) {
      console.log("fetching", url)
      const res = await fetch(url)
      const data = await res.json()
      return data.body
    },
    maxAge: 1000 * 60 * 15, // 15 minutes
  })

  async function updateWeatherData() {
    weatherData = await model.fetch(`/api/weather/${selectedCityId}`)
  }

  // query the weather once on mount (it will also update when the city changes)
  onMount(() => {
    updateWeatherData()
  })
</script>

<svelte:head>
  <title>HATA Weather</title>
  <meta property="og:title" content="HATA Weather" />
  <meta property="og:description" content="Live weather updates from HATA!" />
</svelte:head>

<section class="my-12 mx-auto w-[90%] sm:max-w-prose">
  <aside class="w-full flex gap-2 [&>*]:flex-1 items-stretch mb-8">
    <SelectDropdown
      options={Object.entries(cities).reduce(
        (acc, [id, displayData]) => ({
          ...acc,
          [id]: `${displayData.name}, ${displayData.country}`,
        }),
        {},
      )}
      bind:value={selectedCityId}
      on:change={updateWeatherData}
    />
    <SelectDropdown
      options={{
        celsius: "Celsius",
        kelvin: "Kelvin",
      }}
      bind:value={selectedTempUnit}
    />
  </aside>
  <WeatherCard
    cityName={cities[selectedCityId].name}
    country={cities[selectedCityId].country}
    tempUnit={selectedTempUnit}
    ready={weatherData !== null}
    {weatherData}
  />
</section>
