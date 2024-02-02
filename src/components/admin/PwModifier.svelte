<script lang="ts">
  import { Modal, Label, Helper, Button } from "flowbite-svelte";
  import PwInput from "../PwInput.svelte";
  import { sushiUserName, type SushiUserType } from "../../models/sushi-user";

  $: color =
    newPassword === "" || repeatPassword === ""
      ? <const>"base"
      : newPassword === repeatPassword
        ? <const>"green"
        : <const>"red";

  export let user: SushiUserType;
  export let openModal: boolean;
  let newPassword = "";
  let repeatPassword = "";
  let currPassword = "";
</script>

<Modal
  title={"Cambia password di " + sushiUserName(user, { plural: true })}
  bind:open={openModal}
  autoclose
  outsideclose
  class="w-[80%] modal"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25"
>
  <form class="flex flex-col space-y-6">
    <Label class="space-y-2">
      <span>Vecchia Password</span>
      <PwInput bind:value={currPassword} />
    </Label>
    <Label class="space-y-2">
      <span>Nuova Password</span>
      <PwInput bind:value={newPassword} {color} />
    </Label>
    <Label class="space-y-2">
      <span>Ripeti Nuova Password</span>
      <PwInput bind:value={repeatPassword} {color} />
      <Helper
        class="mt-2"
        color={repeatPassword == newPassword ? "green" : "red"}
      >
        {#if newPassword !== "" && repeatPassword !== ""}
          {#if newPassword !== repeatPassword}
            <span class="font-bold">Attenzione!</span> Le password non coincidono!
          {:else}
            <span class="font-bold">Le password coincidono!</span>
          {/if}
        {/if}
      </Helper>
    </Label>
  </form>
  <svelte:fragment slot="footer">
    <Button
      disabled={newPassword === "" || newPassword !== repeatPassword}
      on:click={() => alert("ADD FUNCTION")}>Modifica</Button
    >
    <Button color="alternative">Annulla</Button>
  </svelte:fragment>
</Modal>
