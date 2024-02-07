<script lang="ts">
  import { Tooltip } from "flowbite-svelte";
  import { ArrowRightFromBracketSolid } from "flowbite-svelte-icons";
  import { useNavigate } from "svelte-navigator";
  import { SushiUserType } from "../models/sushi_user";
  import { selectedMenu } from "../store/selected_menu";
  import { cart } from "../store/cart";

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

<button
  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
  on:click={handleLogout}
>
  <ArrowRightFromBracketSolid />
</button>
<Tooltip placement="bottom-end">Logout</Tooltip>
