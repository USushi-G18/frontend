<script lang="ts">
  import CommandCard from "../../components/kitchen/CommandCard.svelte";
  import { CommandStatus, type Command } from "../../models/command";

  let orders: { table: number; commands: Command[] }[] = [
    {
      table: 1,
      commands: [
        {
          sessionID: 1,
          plateID: 1,
          at: new Date(),
          quantity: 2,
          status: CommandStatus.Delivered,
        },
      ],
    },
  ];
</script>

<div class="orders items-stretch w-full h-full m-7 self-start">
  {#each orders as order}
    <CommandCard table={order.table} commands={order.commands}></CommandCard>
  {/each}
</div>

<style>
  .orders {
    display: grid;
    grid-gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
</style>
