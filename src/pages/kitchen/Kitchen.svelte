<script lang="ts">
  import { onMount } from "svelte";
  import CommandCard from "../../components/kitchen/CommandCard.svelte";
  import { type Command } from "../../models/command";
  import { fetchReq, fetchTable } from "../../utils/fetch";
  import { SushiUserType } from "../../models/sushi_user";
  import type { Session } from "../../models/session";

  let commands: { tableNumber: number; commands: Command[] }[] = [];

  $: {
    setInterval(fetchCommands, 10 * 1000);
  }

  const fetchCommands = async () => {
    let cmds = await fetchTable<Command>("command", {
      user: SushiUserType.Employee,
    });
    let cMap = cmds.reduce((acc: { [sessionID: number]: Command[] }, c) => {
      if (!(c.sessionID in acc)) {
        acc[c.sessionID] = [];
      }
      acc[c.sessionID].push(c);
      return acc;
    }, {});
    let cMapList = Object.entries(cMap).map(async ([sessionID, commands]) => {
      let session = await fetchReq<Session>(`session/${sessionID}`, {
        user: SushiUserType.Employee,
      });
      return { tableNumber: session.tableNumber, commands: commands };
    });
    commands = await Promise.all(cMapList);
  };

  onMount(fetchCommands);
</script>

<div class="orders items-stretch w-full h-full m-7 self-start">
  {#each commands as command}
    <CommandCard table={command.tableNumber} commands={command.commands}
    ></CommandCard>
  {/each}
</div>

<style>
  .orders {
    display: grid;
    grid-gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
</style>
