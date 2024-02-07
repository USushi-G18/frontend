<script lang="ts" generics="T extends U">
  import { Tooltip } from "flowbite-svelte";
  import { FilePenOutline } from "flowbite-svelte-icons";
  import ItemModal from "./ItemModal.svelte";

  export let item: T;
  export let columns: ColumnDef[];
  export let texts: Texts;
  let openModal = false;
</script>

<FilePenOutline
  on:click={() => {
    openModal = true;
  }}
/>
<Tooltip shadow={false} class="bg-sky-300 dark:bg-sky-200 text-sky-900"
  >{texts.update.info}</Tooltip
>
<ItemModal type="update" {texts} {columns} bind:openModal {item} on:update />
