<script lang="ts">
  import { AngleLeftSolid, AngleRightSolid } from "flowbite-svelte-icons";
  import {
    CommandStatus,
    commandStatusName,
    nextCommandStatus,
    prevCommandStatus,
  } from "../../models/command";

  export let state: CommandStatus;

  let color: string;
  let text: string;
  $: {
    if (state == CommandStatus.Ordered) {
      color = "text-red-500";
    } else if (state == CommandStatus.Preparing) {
      color = "text-orange-400";
    } else if (state == CommandStatus.Prepared) {
      color = "text-green-500";
    } else if (state == CommandStatus.Delivered) {
      color = "text-blue-500";
    }
    text = `pointer-events-none dark:text-${
      state == CommandStatus.Delivered ? "gray" : "white"
    } text-${state == CommandStatus.Delivered ? "gray" : "gray-800"}`;
  }
</script>

<div class="flex items-center justify-end">
  <span class="{color} rounded-md flex items-center text-sm font-medium"
    >{commandStatusName(state)}</span
  >
  <button
    disabled={state == CommandStatus.Ordered}
    class="ml-1"
    on:click={() => (state = prevCommandStatus(state))}
  >
    <AngleLeftSolid size="sm" class={text} />
  </button>
  <button
    disabled={state == CommandStatus.Delivered}
    class="ml-2"
    on:click={() => (state = nextCommandStatus(state))}
  >
    <AngleRightSolid size="sm" class={text} />
  </button>
</div>
