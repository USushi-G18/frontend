<script lang="ts">
  import { Fileupload, Img, Spinner } from "flowbite-svelte";
  import { images, plates } from "../../store/models";
  import { fetchTable, postReq, putReq } from "../../utils/fetch";
  import { notification } from "../../store/notification";
  import type { Plate } from "../../models/plate";

  export let plateID: number;

  $: plate = $plates.find((p) => p.id === plateID);
  $: base64img = $images.find((i) => i.id === plate?.imageID)?.image;

  let loading = false;
  $: {
    loading = plate === undefined;
  }

  const handleFileUpload = (event: Event) => {
    loading = true;
    if (event.target) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          let base64data = reader.result as string;
          base64data = base64data.slice(base64data.indexOf(",") + 1);
          let res = await postReq("image", {
            image: base64data,
          });
          let body = await res.json();
          if (res.status !== 201 || !("id" in body)) {
            $notification = {
              type: "ERROR",
              message: "Errore nella creazione dell'immagine",
            };
            loading = false;
            return;
          }
          let p = { ...plate, imageID: body.id };
          res = await putReq(`plate/${plateID}`, p);
          if (res.status !== 200) {
            $notification = {
              type: "ERROR",
              message: "Errore nella assegnazione dell'immagine",
            };
            loading = false;
            return;
          }
          let [pl, im] = await Promise.all([
            fetchTable<Plate>("plate"),
            fetchTable<Image>("image"),
          ]);
          $plates = pl;
          $images = im;
          $notification = {
            type: "INFO",
            message: "Immagine cambiata con successo",
          };
          loading = false;
        };
      }
    }
  };
</script>

<form class="flex flex-col items-center space-y-6">
  {#if loading}
    <Spinner color="blue" size="20" />
  {:else if base64img !== undefined}
    <Img
      class="rounded-lg"
      size="max-w-[30rem]"
      src="data:image;base64, {base64img}"
      alt="img"
    />
  {/if}
  <Fileupload name="img" on:change={handleFileUpload} />
</form>
