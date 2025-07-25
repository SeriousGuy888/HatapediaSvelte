<script>
  import HeaderSearchBar from "./HeaderQuickSwitcher.svelte"
  import Logo from "./Logo.svelte"
  import ThemeToggle from "./HeaderThemeToggle.svelte"
</script>

<nav
  class="fixed print:absolute flex justify-between items-center py-4 px-8 print:px-0 gap-8 bg-brand text-white print:bg-transparent print:text-black inset-x-0 max-w-[100vw] z-10 h-16"
>
  <!-- Displayed on webpage most of the time. -->
  <section class="print:hidden flex items-center text-sm gap-4">
    <Logo />
    <a href="/maps">Maps</a>
    <a href="/weather">Weather</a>
  </section>
  <section class="print:hidden flex items-center gap-4">
    <HeaderSearchBar />
    <ThemeToggle />
  </section>

  <!-- Only displayed when printing. -->
  <section class="hidden print:flex">
    <Logo />
  </section>
  <section class="hidden print:flex">
    <p>
      printed {new Intl.DateTimeFormat("en-CA", {
        dateStyle: "short",
        timeStyle: "long",
        hour12: false,
        timeZone: "UTC"
      }).format(new Date())}
    </p>
  </section>
</nav>
