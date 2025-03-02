<script lang=ts>
  interface Props {
    title: string;
    data: string;
  }

  let { title, data }: Props = $props();
</script>

<li
  class="
    bg-black/10
    filter backdrop-blur-xl

    rounded-md p-4 text-center break-words
    @container/infobox
  "
>
  <h2 class="uppercase text-xs tracking-tight text-gray-300 mb-2">
    {title}
  </h2>
  <p class="text-base @xs/infobox:text-lg leading-4">{data}</p>
</li>


<!-- 

const InfoBox: NextPage<{ title: string; data: string }> = ({
  title,
  data,
}) => {
  return (
    <li
      class={`
        bg-black bg-opacity-10
        filter backdrop-blur-xl

        rounded-md p-4 text-center break-words
        @container/infobox
      `}
    >
      <h2 class="uppercase text-xs tracking-tight text-gray-300 mb-2">
        {title}
      </h2>
      <p class="text-base @xs/infobox:text-lg leading-4">{data}</p>
    </li>
  )
}

export default WeatherCard -->
