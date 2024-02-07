<script lang="ts">
  import { AngleLeftSolid, AngleRightSolid } from "flowbite-svelte-icons";
  import {
    CommandStatus,
    commandStatusName,
    nextCommandStatus,
    prevCommandStatus,
    type Command,
  } from "../../models/command";
  import { putReq } from "../../utils/fetch";
  import { SushiUserType } from "../../models/sushi_user";
  import { notification } from "../../store/notification";

  export let command: Command;
  let state = command.status;

  let color: string;
  let text: string;
  $: {
    if (state === CommandStatus.Ordered) {
      color = "text-red-500";
    } else if (state === CommandStatus.Preparing) {
      color = "text-orange-400";
    } else if (state === CommandStatus.Prepared) {
      color = "text-green-500";
    } else if (state === CommandStatus.Delivered) {
      color = "text-blue-500";
    }
    text = `pointer-events-none dark:text-${
      state === CommandStatus.Delivered ? "gray" : "white"
    } text-${state === CommandStatus.Delivered ? "gray" : "gray-800"}`;
  }

  const handleUpdateState = async (status: CommandStatus) => {
    let req = await putReq(
      "order-status",
      {
        sessionID: command.sessionID,
        plateID: command.plateID,
        at: command.at,
        status: status,
      },
      { user: SushiUserType.Employee }
    );
    if (req.status !== 200) {
      $notification = {
        type: "ERROR",
        message: "Errore nella modifica dello stato",
      };
      return;
    }
    state = status;
  };
</script>

<div class="flex items-center justify-end">
  <span class="{color} rounded-md flex items-center text-sm font-medium"
    >{commandStatusName(state)}</span
  >
  <button
    disabled={state === CommandStatus.Ordered}
    class="ml-1"
    on:click={() => handleUpdateState(prevCommandStatus(state))}
  >
    <AngleLeftSolid size="sm" class={text} />
  </button>
  <button
    disabled={state === CommandStatus.Delivered}
    class="ml-2"
    on:click={() => handleUpdateState(nextCommandStatus(state))}
  >
    <AngleRightSolid size="sm" class={text} />
  </button>
</div>
