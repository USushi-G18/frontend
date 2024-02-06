<script lang="ts">
  import { Button } from "flowbite-svelte";
  import ItemModal from "./ItemModal.svelte";
  import { PlusSolid } from "flowbite-svelte-icons";

  export let columns: ColumnDef[];
  export let texts: Texts;
  let openModal = false;
</script>

<Button size="sm" on:click={() => (openModal = true)}>
  <PlusSolid class="text-white mr-3" size="sm" />
  {texts.create.info}
</Button>
<ItemModal type="create" {texts} {columns} bind:openModal on:create />
