<script lang="ts">
  import { Button, Modal, Tooltip } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { createEventDispatcher } from "svelte";

  export let texts: Texts;
  let openModal = false;

  const distpatcher = createEventDispatcher();

  const handleConfirm = (e: MouseEvent) => {
    distpatcher("delete", e);
  };
</script>

<TrashBinSolid class="text-red-500" on:click={() => (openModal = true)} />
<Tooltip shadow={false} class="bg-red-200 dark:bg-red-200 text-red-500"
  >{texts.delete.info}</Tooltip
>
<Modal
  title={texts.delete.title}
  bind:open={openModal}
  autoclose
  class="modal"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25"
>
  <h1>{texts.delete.confirm}</h1>
  <svelte:fragment slot="footer">
    <Button on:click={handleConfirm}>{texts.confirm}</Button>
    <Button color="alternative">{texts.cancel}</Button>
  </svelte:fragment>
</Modal>
