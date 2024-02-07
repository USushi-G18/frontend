<script lang="ts">
  import { cart } from "../../store/cart";
  import { selectedMenu } from "../../store/selected_menu";
  import OrdersList from "../../components/restaurant/CartList.svelte";
  import { Link, useNavigate } from "svelte-navigator";
  import { SushiUserType } from "../../models/sushi_user";

  const navigator = useNavigate();

  const handleLogout = () => {
    $selectedMenu = undefined;
    $cart = [];
    for (const user of Object.keys(SushiUserType)) {
      localStorage.removeItem(`${user.toUpperCase()}_TOKEN`);
    }
    navigator("/");
  };
</script>

{#if $cart.length !== 0}
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
      <Link
        to="../"
        class="text-xl mt-3 text-primary-500 dark:text-primary-300 hover:underline"
        >Torna al menu</Link
      >
      <Link
        to="/"
        class="text-xl mt-3 text-primary-500 dark:text-primary-300 hover:underline"
        on:click={handleLogout}>Chiudi il conto ed Esci</Link
      >
    </div>
  </div>
{/if}
