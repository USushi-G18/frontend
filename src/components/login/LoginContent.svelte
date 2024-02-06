<script lang="ts">
  import { Button, Input, Label } from "flowbite-svelte";
  import PwInput from "../PwInput.svelte";
  import { SushiUserType } from "../../models/sushi_user";

  export let user: SushiUserType;
</script>

<div class="flex flex-col w-auto items-center pt-3">
  <div class="pwTable flex gap-2 flex-row items-center w-full pb-3">
    <div class="pw w-fill">
      <Label class="mb-2">Password</Label>
      <PwInput />
    </div>
    {#if user === SushiUserType.Client}
      <div class="tableIn">
        <Label class="mb-2">Tavolo</Label>
        <Input name="table" type="text" id="table" class="w-20 py-2" required />
      </div>
    {/if}
  </div>
  <Button type="submit" class="mt-6 mb-3 w-64">Login</Button>
</div>
