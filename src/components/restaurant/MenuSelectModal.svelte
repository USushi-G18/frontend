<script lang="ts">
  import { Modal, Label, DarkMode } from "flowbite-svelte";
  import { Menu } from "../../models/plate";
  import { selectedMenu } from "../../store/selected_menu";
  import Logout from "../Logout.svelte";

  export let open: boolean;
</script>

<Modal
  dismissable={false}
  autoclose={false}
  bind:open
  size="sm"
  backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
>
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold text-center">Seleziona un menu</h1>
    <div class="flex flex-row gap-1">
      <DarkMode onclick="this.blur();" />
      <Logout />
    </div>
  </div>
  <div class="flex flex-row items-start justify-center w-full gap-7">
    <div
      class="flex flex-col items-start justify-center w-full border-primary-400 border-y-2 p-4 rounded-lg"
    >
      <Label class="flex flex-col items-center justify-center w-full">
        <span>All You Can Eat</span>
      </Label>
      <div class="flex flex-row items-start justify-center w-full gap-5">
        <button
          class="px-4 py-2 mt-4 text-white bg-primary-500 rounded-md hover:bg-primary-600"
          on:click={() => {
            $selectedMenu = Menu.Dinner;
          }}>Cena</button
        >
        <button
          class="px-4 py-2 mt-4 text-white bg-primary-500 rounded-md hover:bg-primary-600"
          on:click={() => {
            $selectedMenu = Menu.Lunch;
          }}>Pranzo</button
        >
      </div>
    </div>
    <div
      class="flex flex-col items-start justify-center w-full border-primary-400 border-y-2 p-4 rounded-lg"
    >
      <Label class="flex flex-col items-center justify-center w-full">
        <span>Paga quello che ordini</span>
      </Label>
      <div class="flex flex-row items-start justify-center w-full gap-5">
        <button
          class="px-4 py-2 mt-4 text-white bg-primary-500 rounded-md hover:bg-primary-600"
          on:click={() => {
            $selectedMenu = Menu.Carte;
          }}>Carte</button
        >
      </div>
    </div>
  </div>
</Modal>
