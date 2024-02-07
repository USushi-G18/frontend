<script lang="ts">
  import {
    Button,
    Helper,
    Input,
    Label,
    NumberInput,
    Select,
  } from "flowbite-svelte";
  import PwInput from "../PwInput.svelte";
  import { SushiUserType } from "../../models/sushi_user";
  import { Menu, menuName } from "../../models/menu";
  import { postReq } from "../../utils/fetch";
  import { notification } from "../../store/notification";
  import { useNavigate } from "svelte-navigator";
  import { fetchAll } from "../../store/models";
  import { selectedMenu } from "../../store/selected_menu";
  import { cart } from "../../store/cart";

  export let user: SushiUserType;

  const navigate = useNavigate();

  let password: string;
  let tableNumber: number | undefined;
  let menu: Menu | undefined;

  let menus = Object.keys(Menu).map((m) => {
    return {
      value: m as Menu,
      name: menuName(m as Menu),
    };
  });

  const handleLogin = async () => {
    let req = await postReq(
      "auth/login",
      {
        password: password,
        tableNumber: tableNumber,
        menu: menu,
        seating: 1,
      },
      {
        user: user,
      }
    );
    if (req.status !== 200) {
      $notification = {
        type: "ERROR",
        message: `Errore. Controlla che i dati inseriti siano corretti`,
      };
      return;
    }
    let body = await req.json();
    localStorage.setItem(`${user.toUpperCase()}_TOKEN`, body.token);
    if (user === SushiUserType.Client) {
      $cart = [];
      $selectedMenu = menu;
    }
    if (user !== SushiUserType.Employee) {
      await fetchAll();
    }
    switch (user) {
      case SushiUserType.Admin:
        navigate("/admin");
        break;
      case SushiUserType.Client:
        navigate("/restaurant");
        break;
      case SushiUserType.Employee:
        navigate("/kitchen");
        break;
    }
  };
</script>

<div class="flex flex-col space-y-6">
  <Label class="space-y-2">
    <span>Password</span>
    <PwInput bind:value={password} />
  </Label>
  {#if user === SushiUserType.Client}
    <Label class="space-y-2">
      <span>Tavolo</span>
      <NumberInput bind:value={tableNumber} min="0" />
    </Label>
    <Label class="space-y-2">
      <span>Menu</span>
      <Select items={menus} bind:value={menu} />
    </Label>
  {/if}
  <Button class="p-4" on:click={handleLogin}>Login</Button>
</div>
