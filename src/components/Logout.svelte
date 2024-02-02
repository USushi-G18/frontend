<script lang="ts">
  import { Tooltip } from "flowbite-svelte";
  import { ArrowRightFromBracketSolid } from "flowbite-svelte-icons";

  function handleClick() {
    //TODO: logout
  }
</script>

<button
  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
  on:click={handleClick}
>
  <ArrowRightFromBracketSolid onclick="this.blur();" />
</button>
<Tooltip placement="bottom-end">Logout</Tooltip>
