<script lang="ts" generics="T extends U">
  import {
    Heading,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
  } from "flowbite-svelte";
  import ItemUpdate from "./ItemUpdate.svelte";
  import ItemCreate from "./ItemCreate.svelte";
  import { createEventDispatcher } from "svelte";
  import ItemDelete from "./ItemDelete.svelte";

  export let items: T[];
  export let columns: ColumnDef[];
  export let editable = false;
  export let delitable = false;
  export let texts: Texts;
  export let filter: (item: T, key: string) => boolean;

  let searchTerm = "";

  $: filteredItems = items.filter((item) => filter(item, searchTerm));

  const distpatcher = createEventDispatcher();

  const handleDelete = (e: CustomEvent, item: T) => {
    distpatcher("delete", item, e);
  };

  const getValue = (item: T, column: ColumnDef) => {
    return (
      (column.valueGetter === undefined
        ? item[column.field]
        : column.valueGetter(item[column.field])) ?? ""
    );
  };
</script>

<div class="w-full min-h-screen flex flex-col">
  <div class="mb-10 mx-10">
    <div class="flex justify-between py-5">
      <Heading tag="h1" class="w-max" customSize="text-4xl font-bold">
        {texts.title}
      </Heading>
      <ItemCreate {texts} {columns} on:create />
    </div>
    <TableSearch placeholder={texts.search} bind:inputValue={searchTerm}>
      <TableHead>
        {#each columns as column}
          <TableHeadCell>{column.name}</TableHeadCell>
        {/each}
        {#if editable || delitable || $$slots.actions}
          <TableHeadCell />
        {/if}
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each filteredItems as item}
          <TableBodyRow>
            {#each columns as column}
              <TableBodyCell
                class="max-w-[18rem] overflow-hidden overflow-ellipsis"
                >{getValue(item, column)}</TableBodyCell
              >
            {/each}
            {#if editable || delitable || $$slots.actions}
              <TableBodyCell>
                <div class="flex justify-end gap-5">
                  <slot name="actions" {item} />
                  {#if editable}
                    <ItemUpdate {texts} {columns} {item} on:update />
                  {/if}
                  {#if delitable}
                    <ItemDelete
                      {texts}
                      on:delete={(e) => handleDelete(e, item)}
                    />
                  {/if}
                </div>
              </TableBodyCell>
            {/if}
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>
    {#if items.length === 0}
      <div class="flex justify-center p-8">
        <Heading tag="h1" class="w-max" customSize="text-2xl font-bold">
          {texts.empty}
        </Heading>
      </div>
    {:else if filteredItems.length === 0}
      <div class="flex justify-center p-8">
        <Heading tag="h1" class="w-max" customSize="text-2xl font-bold">
          {texts.emptyFilter}
        </Heading>
      </div>
    {/if}
  </div>
</div>
