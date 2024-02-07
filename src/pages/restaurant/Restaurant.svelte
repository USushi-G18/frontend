<script lang="ts">
  import { selectedMenu } from "../../store/selected_menu";
  import { Menu } from "../../models/menu";
  import { TabItem, Tabs } from "flowbite-svelte";
  import PlateDisplay from "../../components/restaurant/PlatesDisplay.svelte";
  import { categories, plates } from "../../store/models";

  $: menu = $selectedMenu;

  $: categoriesMenu = $plates
    .filter((p) => {
      switch (menu) {
        case Menu.Carte:
          return true;
        case Menu.Dinner:
          return p.menu === Menu.Dinner || p.menu === Menu.Lunch;
        case Menu.Lunch:
          return p.menu === Menu.Lunch;
      }
    })
    .reduce((acc: { [category: string]: number[] }, p) => {
      let name = $categories.find((c) => c.id === p.categoryID)?.name;
      if (!name) {
        return acc;
      }
      if (!(name in acc)) {
        acc[name] = [];
      }
      acc[name].push(p.id);
      return acc;
    }, {});
</script>

<div class="flex flex-col items-center self-start w-full m-7">
  <Tabs
    style="pill"
    contentClass="w-full"
    defaultClass="flex space-x-1 max-w-[90%] overflow-hidden overflow-x-scroll no-scrollbar"
  >
    {#each Object.entries(categoriesMenu) as [category, plates], i}
      <TabItem
        class="w-full"
        open={i === 0}
        title={category}
        defaultClass="inline-block text-sm font-bold text-center disabled:cursor-not-allowed"
      >
        <PlateDisplay {plates} {category} />
      </TabItem>
    {/each}
  </Tabs>
</div>
