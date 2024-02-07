<script lang="ts">
  import { onMount } from "svelte";
  import DashboardTable from "../../components/dashboard/DashboardTable.svelte";
  import { ingredients } from "../../store/models";
  import { notification } from "../../store/notification";
  import { postReq, fetchTable, deleteReq } from "../../utils/fetch";
  import { texts } from "./texts";

  export let plateID: number;

  let plateIngredients: PlateIngredient[] = [];

  const fetchPlateIngredients = async () => {
    plateIngredients = await fetchTable<PlateIngredient>(
      `plate/${plateID}/ingredient`
    );
  };

  onMount(fetchPlateIngredients);

  let columns: ColumnDef[];
  $: columns = [
    {
      field: "ingredientID",
      name: "Ingrediente",
      type: "select",
      selectOptions: $ingredients.map((i) => i.name),
      valueGetter: (v) => $ingredients.find((i) => i.id === v)?.name,
      valueSetter: (v) => $ingredients.find((i) => i.name === v)?.id,
      editable: true,
    },
  ];

  const handleCreate = async (event: CustomEvent) => {
    let res = await postReq(`plate/${plateID}/ingredient`, event.detail);
    if (res.status !== 201) {
      $notification = {
        type: "ERROR",
        message:
          "Errore nella creazione dell'ingrediente. Potrebbe essere causato da valori duplicati",
      };
      return;
    }
    fetchPlateIngredients();
  };

  const handleDelete = async (event: CustomEvent) => {
    let res = await deleteReq(
      `plate/${plateID}/ingredient/${event.detail.ingredientID}`
    );
    if (res.status !== 200) {
      $notification = {
        type: "ERROR",
        message: "Errore nella cancellazione dell'ingrediente",
      };
      return;
    }
    fetchPlateIngredients();
  };

  const filter = (item: PlateIngredient, key: string) => {
    let name = $ingredients.find((i) => i.id === item.ingredientID)?.name;
    if (!name) {
      return false;
    }
    return name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  };
</script>

{#key $ingredients}
  <DashboardTable
    texts={{ ...texts, title: "Ingredienti" }}
    items={plateIngredients}
    {columns}
    {filter}
    delitable
    on:create={handleCreate}
    on:delete={handleDelete}
  />
{/key}
