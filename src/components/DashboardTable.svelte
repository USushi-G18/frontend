<script lang="ts">
  import {
    Button,
    Heading,
    Modal,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Tooltip,
  } from "flowbite-svelte";
  import { PlusSolid, TrashBinSolid } from "flowbite-svelte-icons";
  import { translator } from "../models/translator";
  import ItemModifyBtn from "./admin/ItemModifyBtn.svelte";
  import ItemAdder from "./admin/ItemAdder.svelte";

  export let items: any[];
  export let editBtn = false;
  export let delBtn = false;
  export let title: string;
  export let header: string[];
  export let mx = "mx-16";

  let searchTerm = "";
  $: filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );
</script>

<div class="w-full min-h-screen flex flex-col">
  <div class="mb-10 {mx}">
    <div class="flex justify-between py-5">
      <Heading tag="h1" class="w-max" customSize="text-4xl font-bold ">
        {title}
      </Heading>
      <ItemAdder keys={Object.keys(items[0])} />
    </div>
    <TableSearch
      placeholder="Cerca"
      divClass="shadow-none"
      bind:inputValue={searchTerm}
    >
      <TableHead>
        {#each header as h}
          <TableHeadCell>{translator[h] ? translator[h] : h}</TableHeadCell>
        {/each}
        {#if editBtn || delBtn}
          <TableHeadCell />
        {/if}
      </TableHead>
      <TableBody>
        {#each filteredItems as item}
          <TableBodyRow>
            {#each header as h}
              <TableBodyCell class="pr-16">{item[h]}</TableBodyCell>
            {/each}

            {#if editBtn || delBtn || $$slots.actions}
              <TableBodyCell class="flex justify-end px-0">
                <div class="flex gap-7 pr-6">
                  <slot name="actions" {item} />
                  {#if editBtn}
                    <ItemModifyBtn {item} />
                  {/if}
                  {#if delBtn}
                    <TrashBinSolid class="text-red-500" />
                    <Tooltip
                      shadow={false}
                      class="bg-red-200 dark:bg-red-200 text-red-500"
                      >Elimina</Tooltip
                    >
                  {/if}
                </div>
              </TableBodyCell>
            {/if}
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>
  </div>
</div>
