<script lang="ts">
  import WeatherCard from "./WeatherCard.svelte"
  import type { CityDisplayData } from "$lib/weather/weatherCitiesManager"
  import type { TemperatureUnit, WeatherData } from "$lib/weather/weatherapi_types.js"
  import SelectDropdown from "./SelectDropdown.svelte"

  export let data

  const cities: Record<string, CityDisplayData> = data.cities

  let selectedCityId = Object.keys(cities)[0]
  let selectedTempUnit: TemperatureUnit = "celsius"

  let weatherData: WeatherData | null = null

  async function updateWeatherData() {
    fetch(`/api/weather/${selectedCityId}`)
      .then((res) => res.json())
      .then((data) => {
        weatherData = data.body
      })
      .catch((err) => {
        console.error(err)
        weatherData = null
      })
  }
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
          [id]: displayData.name,
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
