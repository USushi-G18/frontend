<script lang="ts">
  import {
    UserSettingsSolid,
    WalletSolid,
    UsersSolid,
  } from "flowbite-svelte-icons";
  import { SushiUserType } from "../../models/sushi-user";
  export let user: SushiUserType;
</script>

<div
  class="flex items-center justify-center gap-2 px-3 text-gray-800 dark:text-gray-400"
>
  {#if user === SushiUserType.Admin}
    <UserSettingsSolid size="md" class="outline-none" />
    <span>Admin</span>
  {:else if user === SushiUserType.Employee}
    <UsersSolid size="md" class="outline-none" />
    <span>Dipendenti</span>
  {:else if user === SushiUserType.Client}
    <WalletSolid size="md" class="outline-none" />
    <span>Clienti</span>
  {/if}
</div>
