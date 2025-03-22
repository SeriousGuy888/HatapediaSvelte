<script lang="ts">
  import WeatherCard from "./WeatherCard.svelte"
  import type { TemperatureUnit, WeatherData } from "$lib/weather/weatherapi_types.js"
  import SelectDropdown from "./SelectDropdown.svelte"
  import { onMount } from "svelte"
  import { swr } from "@svelte-drama/swr"
  import RadioSwitch from "./RadioSwitch.svelte"

  import { cities, citiesFlat } from "$lib/weather/master_cities_list"

  let selectedCityId = $state(Object.keys(citiesFlat)[0])
  let selectedTempUnit: TemperatureUnit = $state("celsius")

  let weatherData: WeatherData | null = $state(null)

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
  <title>Weather - HATApedia</title>
  <meta property="og:title" content="HATA Weather" />
  <meta property="og:description" content="Live weather updates from HATA!" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="HATApedia" />
</svelte:head>

<section class="my-12 mx-auto w-[90%] sm:max-w-prose">
  <noscript class="block text-center text-xl mb-8">
    <p>Please enable JavaScript in your browser to view the weather.</p>
  </noscript>
  <aside class="w-full flex gap-2 *:flex-1 items-stretch mb-8">
    <SelectDropdown
      options={Object.entries(cities).reduce(
        // Go through the cities, go into each optgroup, and replace all the `City`s with the city's name and country.

        (acc, [optgroup, cities]) => ({
          ...acc,
          [optgroup]: Object.entries(cities).reduce(
            (acc, [id, city]) => ({
              ...acc,
              [id]: `${city.display.name}, ${city.display.country}`,
            }),
            {}, // Reconstruct the entries array into an object: [[a, b], ...] => { a: b, ... }
          ),
        }),
        {}, // Reconstruct the entries array into an object: [[a, b], ...] => { a: b, ... }
      )}
      bind:value={selectedCityId}
      on:change={updateWeatherData}
    />
    <RadioSwitch
      options={{
        celsius: "Celsius",
        kelvin: "Kelvin",
      }}
      bind:value={selectedTempUnit}
    />
  </aside>
  <WeatherCard
    cityName={citiesFlat[selectedCityId].display.name}
    country={citiesFlat[selectedCityId].display.country}
    tempUnit={selectedTempUnit}
    ready={weatherData !== null}
    {weatherData}
  />
</section>
