<script lang="ts">
  import WeatherCard from "./WeatherCard.svelte"
  import type { CityDisplayData } from "$lib/weather/weatherCitiesManager"
  import type { TemperatureUnit, WeatherData } from "$lib/weather/weatherapi_types.js"

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
    <select
      bind:value={selectedCityId}
      on:change={() => {
        updateWeatherData()
      }}
    >
      {#each Object.keys(cities) as cityId}
        <option value={cityId}>{cities[cityId].name.toUpperCase()}, {cities[cityId].country}</option
        >
      {/each}
    </select>
    <select bind:value={selectedTempUnit}>
      <option value="celsius">Celsius</option>
      <option value="kelvin">Kelvin</option>
    </select>
  </aside>
  <WeatherCard
    cityName={cities[selectedCityId].name}
    country={cities[selectedCityId].country}
    tempUnit={selectedTempUnit}
    ready={weatherData !== null}
    {weatherData}
  />
</section>
