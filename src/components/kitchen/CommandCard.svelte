<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { Command } from "../../models/command";
  import CommandStatus from "./CommandStatus.svelte";

  export let table: number;
  export let commands: Command[];
</script>

<Card padding="md" class="w-full">
  <h5 class="mb-2 text-2xl font-medium text-gray-500 dark:text-gray-400">
    Tavolo {table}
  </h5>
  <table class="my-4 w-full">
    {#each commands as command}
      <tr>
        <td>
          {command.at.getHours()}:{command.at.getMinutes()}
        </td>
        <td
          class="max-w-[9rem] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          <span class="text-base font-normal text-gray-700 dark:text-gray-400"
            >{command.plateID}</span
          >
        </td>
        <td class="text-center">
          <span class=" text-base font-normal text-gray-700 dark:text-gray-400"
            >x {command.quantity}
          </span>
        </td>
        <td>
          <CommandStatus state={command.status} />
        </td>
      </tr>
    {/each}
  </table>
</Card>
