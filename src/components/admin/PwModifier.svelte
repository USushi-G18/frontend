<script lang="ts">
  import { Modal, Label, Helper, Button } from "flowbite-svelte";
  import PwInput from "../PwInput.svelte";
  import { sushiUserName, type SushiUserType } from "../../models/sushi_user";
  import { postReq } from "../../utils/fetch";
  import { notification } from "../../store/notification";

  export let user: SushiUserType;
  export let openModal: boolean;

  let oldPassword = "";
  let newPassword = "";
  let repeatPassword = "";

  let color: "base" | "green" | "red" = "base";
  $: {
    if (!newPassword || !repeatPassword) {
      color = "base";
    } else if (newPassword === repeatPassword) {
      color = "green";
    } else {
      color = "red";
    }
  }

  const handleChangePassword = async () => {
    let res = await postReq(`auth/password/${user}`, {
      newPassword: newPassword,
      oldPassword: oldPassword,
    });
    if (res.status !== 200) {
      $notification = {
        type: "ERROR",
        message: "Errore. Controlla che la password sia corretta",
      };
    } else {
      $notification = {
        type: "INFO",
        message: "Password cambiata con successo",
      };
    }
  };
</script>

<Modal
  title={"Cambia password di " + sushiUserName(user)}
  bind:open={openModal}
  autoclose
  outsideclose
  class="w-[80%] modal"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-25"
>
  <form class="flex flex-col space-y-6">
    <Label class="space-y-2">
      <span>Vecchia Password</span>
      <PwInput bind:value={oldPassword} />
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
        color={repeatPassword === newPassword ? "green" : "red"}
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
      on:click={handleChangePassword}>Modifica</Button
    >
    <Button color="alternative">Annulla</Button>
  </svelte:fragment>
</Modal>
