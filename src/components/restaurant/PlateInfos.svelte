<script lang="ts">
  import type { Plate } from "../../models/plate";
  import { Img, Modal } from "flowbite-svelte";
  import { allergens, ingredients } from "../../store/models";
  import { fetchTable } from "../../utils/fetch";
  import { menuName } from "../../models/menu";

  export let openModal: boolean;
  export let plate: Plate;
  export let category: string;
  export let image: string | undefined;

  const fetchPlateIngredients = async () => {
    let ingred = await fetchTable<PlateIngredient>(
      `plate/${plate.id}/ingredient`
    );
    return ingred.map((pi) => {
      let allergen = $allergens.find((a) => a.id === pi.ingredientID);
      let ingredient = $ingredients.find((i) => i.id === pi.ingredientID);
      return {
        id: pi.ingredientID,
        name: ingredient?.name ?? "",
        allergen: allergen?.name ?? "",
      };
    });
  };
</script>

<Modal bind:open={openModal} autoclose outsideclose title={plate.name}>
  <div>
    {#if image !== undefined}
      <Img
        class="rounded-lg w-72 float-right aspect-auto p-4"
        src="data:image;base64, {image}"
        alt={plate.name}
      />
    {/if}
    <p>
      <b class="dark:text-white text-gray-700">Pezzi</b><br />
      {plate.pieces}
    </p>
    <br />
    <p>
      <b class="dark:text-white text-gray-700">Descrizione</b><br />
      {plate.description}
    </p>
    <br />
    <p>
      <b class="dark:text-white text-gray-700">Categoria</b><br />
      {category}
    </p>
    {#await fetchPlateIngredients() then ingredients}
      <br />
      <p>
        <b class="dark:text-white text-gray-700">Ingredienti</b><br />
        {ingredients.map((i) => i.name).join(", ")}
      </p>
      <br />
      <p>
        <b class="dark:text-white text-gray-700">Allergeni</b><br />
        {ingredients.map((i) => i.allergen).join(", ")}
      </p>
    {/await}
    <br />
    <p>
      <b class="dark:text-white text-gray-700">Prezzo</b><br />
      {plate.price + " €"}
    </p>
    <br />
    <p>
      <b class="dark:text-white text-gray-700">Menu</b><br />{menuName(
        plate.menu
      )}
    </p>
    <br />
  </div>
</Modal>
