<script lang="ts">
  import { run } from 'svelte/legacy';

  import type {
    TemperatureUnit,
    WeatherCondition,
    WeatherData,
  } from "$lib/weather/weatherapi_types"
  import WeatherCardField from "./WeatherCardField.svelte"

  import _weatherConditions from "./weather_conditions.json"
  const weatherConditions = _weatherConditions as unknown as Record<string, WeatherCondition>

  interface Props {
    cityName: string;
    country: string;
    weatherData?: WeatherData | null;
    tempUnit?: TemperatureUnit;
    ready?: boolean;
  }

  let {
    cityName,
    country,
    weatherData = null,
    tempUnit = "celsius",
    ready = false
  }: Props = $props();

  let currWeather: WeatherData["current"] | null = $state(null)
  let unitSymbol: string = $derived(tempUnit === "celsius" ? "°C" : "K")
  run(() => {
    currWeather = weatherData?.current ?? null
  });
  

  function getWeatherCondition(code: number, defaultConditionText: string, isDay: boolean) {
    const conditionObj = weatherConditions[code.toString()]
    if (!conditionObj) {
      return defaultConditionText
    }

    let descriptionFromCode = conditionObj.description
    if (!isDay && conditionObj.description_night) {
      descriptionFromCode = conditionObj.description_night
    }

    return descriptionFromCode
  }

  function getWeatherImage(code: number) {
    const conditionObj = weatherConditions[code.toString()]
    if (!conditionObj) {
      return "clear"
    }

    return conditionObj.image
  }

  function getTemp(tempCelsius: number) {
    let temperature = Math.round(tempCelsius)
    switch (tempUnit) {
      case "celsius":
        return temperature
      case "kelvin":
        return temperature + 273
    }
  }

  let actualTemp = $state(0)
  let feelsLikeTemp = $state(0)
  run(() => {
    tempUnit
    actualTemp = getTemp(currWeather?.temp_c ?? 0)
    feelsLikeTemp = getTemp(currWeather?.feelslike_c ?? 0)
  });
</script>

{#if weatherData?.error}
  <article class="rounded-xl w-full p-8 bg-red-200 text-black">
    <h1>Error while getting weather data.</h1>
    <p>{weatherData.error.message}</p>
  </article>
{:else}
  <article
    class={`
      rounded-xl overflow-clip
      w-full p-8 text-white
      flex flex-col gap-8
      @container
      
      relative
    `}
  >
    <div class="absolute inset-0 select-none pointer-events-none -z-10">
      <img
        src={`/weather/${getWeatherImage(currWeather?.condition.code ?? 1000)}.jpg`}
        class="absolute w-full h-full object-cover"
        aria-hidden="true"
        alt=""
      />
      <span class="absolute inset-0 bg-blue-900 opacity-60"></span>
    </div>
    <header class="flex justify-between gap-4 flex-col-reverse @md:flex-row">
      <section class="flex flex-col items-center @md:items-start">
        <h1 class="relative">
          <span class="text-7xl">{ready ? actualTemp : "..."}</span>
          <span class="text-xl absolute -right-6 top-2">
            {ready ? unitSymbol : ""}
          </span>
        </h1>
        <p class="text-xs">
          {ready && feelsLikeTemp !== actualTemp
            ? `Feels like ${feelsLikeTemp}${unitSymbol}`
            : "\u200b"}
        </p>
      </section>
      <section class="flex-shrink text-center @md:text-right">
        <p class="text-xl @md:text-lg font-bold">
          {ready ? cityName : "Waiting..."}
        </p>
        <p class="text-sm text-blue-100 font-light">
          {ready ? country : "Please select a city."}
        </p>
      </section>
    </header>
    <section>
      <p class="text-center uppercase leading-4 text-sm tracking-wider @md:text-base">
        {ready && currWeather
          ? getWeatherCondition(
              currWeather.condition.code,
              currWeather.condition.text,
              !!currWeather.is_day,
            )
          : "Waiting..."}
      </p>
    </section>
    {#if ready && currWeather}
      <ul class="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(40%,1fr))]">
        <WeatherCardField title={"Humidity"} data={`${currWeather.humidity}%`} />
        <WeatherCardField
          title={"Wind"}
          data={`${currWeather.wind_kph}km/h, ${currWeather.wind_dir}`}
        />
        <WeatherCardField title={"Cloud Cover"} data={`${currWeather.cloud}%`} />
        <WeatherCardField title={"Precipitation"} data={`${currWeather.precip_mm}mm`} />
      </ul>
    {/if}
    <footer class="flex justify-between items-center gap-4">
      <p class="flex-grow text-right text-[0.5rem] uppercase opacity-30">
        Last Updated:{" "}
        {#if currWeather}
          {currWeather.last_updated}
        {:else}
          _________
        {/if}
      </p>
    </footer>
  </article>
{/if}
