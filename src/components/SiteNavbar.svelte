<script lang="ts">
  import { Navbar, NavBrand, DarkMode } from "flowbite-svelte";
  import Logo from "./icons/Logo.svelte";
  import Logout from "./Logout.svelte";

  export let logout = false;
</script>

<Navbar class="mx-5 z-40" fluid={true}>
  <NavBrand class="my-2 mx-5">
    <Logo />
    <span
      class="self-center whitespace-nowrap text-[20pt] font-semibold dark:text-white"
      >U-Sushi</span
    >
  </NavBrand>
  <div class="flex mr-5 space-x-1">
    <slot name="right" />
    <DarkMode />
    {#if logout}
      <Logout />
    {/if}
  </div>
</Navbar>
