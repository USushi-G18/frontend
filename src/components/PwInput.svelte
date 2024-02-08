<script lang="ts">
  import { Input } from "flowbite-svelte";
  import EyeButton from "./EyeButton.svelte";
  export let value = "";
  export let color: "base" | "green" | "red" = "base";

  let visible = false;
</script>

<Input type={visible ? "text" : "password"} {color} bind:value placeholder="default password: u-sushi">
  <button
    type="button"
    slot="right"
    class="flex items-center justify-center"
    on:click={() => (visible = !visible)}
  >
    <EyeButton {visible} />
  </button>
</Input>
