import { writable } from "svelte/store";
import type { Category } from "../models/category";
import type { Plate } from "../models/plate";
import { fetchTable, request } from "../utils/fetch";
import { SushiUserType } from "../models/sushi_user";

export const images = writable<Image[]>([]);
export const categories = writable<Category[]>([]);
export const allergens = writable<Allergen[]>([]);
export const ingredients = writable<Ingredient[]>([]);
export const plates = writable<Plate[]>([]);

export async function fetchAll() {
  fetchImages("image");

  const [category, allergen, ingredient, plate] = await Promise.all(
    ["category", "allergen", "ingredient", "plate"].map((url) => {
      if (localStorage.getItem("CLIENT_TOKEN")) {
        return fetchTable(url, { user: SushiUserType.Client });
      } else if (localStorage.getItem("ADMIN_TOKEN")) {
        return fetchTable(url);
      }
    })
  );
  categories.set(category as Category[]);
  allergens.set(allergen as Allergen[]);
  ingredients.set(ingredient as Ingredient[]);
  plates.set(plate as Plate[]);
}
fetchAll();

async function fetchImages(url: string) {
  const limit = 20;
  let offset = 0;
  while (true) {
    let req;
    if (localStorage.getItem("CLIENT_TOKEN")) {
      req = await request(`${url}?limit=${limit}&offset=${offset}`, {
        method: "GET",
        body: undefined,
        user: SushiUserType.Client,
      });
    } else {
      req = await request(`${url}?limit=${limit}&offset=${offset}`, {
        method: "GET",
        body: undefined,
        user: SushiUserType.Admin,
      });
    }
    let others = await req.json();
    images.update((v) => {
      v.push(...others);
      return v;
    });
    if (others.length < limit) {
      return;
    }
    offset += limit;
  }
}
