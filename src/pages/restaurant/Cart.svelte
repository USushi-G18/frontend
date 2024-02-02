<script lang="ts">
  import { cart } from "../../store/cart";
  import { selectedMenu } from "../../store/selected_menu";
  import OrdersList from "../../components/restaurant/CartList.svelte";
</script>

{#if $cart.length != 0}
  <div class="w-full self-start flex flex-col">
    <div class="pt-16 pb-10 pl-16 pr-16 flex justify-center">
      <div class="flex flex-col w-[90%] lg:flex-row justify-between">
        <OrdersList />
      </div>
    </div>
  </div>
{:else}
  <div class="flex flex-col items-center">
    <h1 class="text-5xl font-bold text-primary-700 dark:text-primary-400">
      Il carrello è vuoto!!
    </h1>
    <div class="flex gap-20">
      <a
        href="/restaurant"
        class="text-xl mt-3 text-primary-500 dark:text-primary-300 hover:underline"
        >Torna al menu</a
      >
      <!-- TODO: logout -->
      <a
        href="/restaurant"
        class="text-xl mt-3 text-primary-500 dark:text-primary-300 hover:underline"
        on:click={() => {
          $selectedMenu = undefined;
          $cart = [];
        }}>Chiudi il conto ed Esci</a
      >
    </div>
  </div>
{/if}
