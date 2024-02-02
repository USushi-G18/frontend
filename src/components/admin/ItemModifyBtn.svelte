<script lang="ts">
  import { Tooltip } from "flowbite-svelte";
  import { FilePenOutline } from "flowbite-svelte-icons";
  import ItemModifier from "./ItemModifier.svelte";

  export let item: any;
  let openModal = false;
</script>

<FilePenOutline
  on:click={() => {
    openModal = true;
  }}
/>
<Tooltip shadow={false} class="bg-sky-300 dark:bg-sky-200 text-sky-900"
  >Modifica</Tooltip
>
<ItemModifier bind:openModal {item} />
