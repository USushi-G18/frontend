<script lang="ts">
  import { Listgroup, ListgroupItem } from "flowbite-svelte";
  import Plates from "./Plates.svelte";
  import Passwords from "./Passwords.svelte";
  import Categories from "./Categories.svelte";
  import { Route, useNavigate } from "svelte-navigator";
  import PlateIngredients from "./PlateIngredients.svelte";
  import PlateImage from "./PlateImage.svelte";

  const navigate = useNavigate();

  let sections = [
    { name: "Password", path: "password" },
    { name: "Categorie", path: "category" },
    { name: "Piatti", path: "plate" },
  ];

  const updatePath = (e: CustomEvent) => {
    navigate(`${e.detail.path}`);
  };
</script>

<Route path="/">
  <Listgroup
    active
    items={sections}
    let:item
    class="w-48"
    on:click={updatePath}
  >
    {item.name}
  </Listgroup>
</Route>
<Route path="password">
  <Passwords />
</Route>
<Route path="plate/*">
  <Route path="/">
    <Plates />
  </Route>
  <Route path=":id/ingredient" let:params>
    <PlateIngredients plateID={parseInt(params.id)} />
  </Route>
  <Route path=":id/image" let:params>
    <PlateImage plateID={parseInt(params.id)} />
  </Route>
</Route>
<Route path="category">
  <Categories />
</Route>
