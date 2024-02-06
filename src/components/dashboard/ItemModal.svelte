<script lang="ts" generics="T extends U">
  import { Modal, Label, Input, Button, Select } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let type: "create" | "update";
  export let item: T | undefined = undefined;
  export let openModal = false;
  export let columns: ColumnDef[];
  export let texts: Texts;

  let values: U;
  $: values = { ...item };

  const getValue = (column: ColumnDef) => {
    return column.valueGetter === undefined
      ? values[column.field]
      : column.valueGetter(values[column.field]);
  };

  const distpatcher = createEventDispatcher();

  const handleConfirm = (e: MouseEvent) => {
    let v = { ...item, ...values };
    distpatcher(type, v, e);
  };

  const handleInput = (e: Event, column: ColumnDef) => {
    if (e.target) {
      let value: any = (e.target as HTMLInputElement).value;
      if (column.type === "number") {
        value = parseFloat(value);
        if (isNaN(value)) {
          value = undefined;
        }
      }
      values[column.field] =
        column.valueSetter === undefined ? value : column.valueSetter(value);
    }
  };
</script>

<Modal
  title={type === "create" ? texts.create.title : texts.update.title}
  bind:open={openModal}
  autoclose
  class="modal"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25"
>
  <form class="flex flex-col space-y-6" action="javascript:void(0);">
    {#each columns as column}
      {#if column.editable}
        <Label class="space-y-2">
          <span>{column.name}</span>
          {#if column.type === "string" || column.type === undefined}
            <Input
              name={column.name}
              type="text"
              value={getValue(column)}
              on:input={(e) => handleInput(e, column)}
            />
          {:else if column.type === "number"}
            <Input
              name={column.name}
              type="number"
              min="0"
              step="1"
              value={getValue(column)}
              on:input={(e) => handleInput(e, column)}
            />
          {:else if column.type === "select"}
            <Select
              name={column.name}
              value={getValue(column)}
              on:input={(e) => handleInput(e, column)}
            >
              {#each column.selectOptions || [] as opt}
                <option>{opt}</option>
              {/each}
            </Select>
          {/if}
        </Label>
      {/if}
    {/each}
  </form>
  <svelte:fragment slot="footer">
    <Button on:click={handleConfirm}>{texts.confirm}</Button>
    <Button color="alternative">{texts.cancel}</Button>
  </svelte:fragment>
</Modal>
