import { writable } from "svelte/store";
import type { Category } from "../models/category";
import type { Plate } from "../models/plate";
import { fetchTable } from "../utils/fetch";
import { SushiUserType } from "../models/sushi_user";

export const images = writable<Image[]>([]);
export const categories = writable<Category[]>([]);
export const allergens = writable<Allergen[]>([]);
export const ingredients = writable<Ingredient[]>([]);
export const plates = writable<Plate[]>([]);

export async function fetchAll() {
  const [image, category, allergen, ingredient, plate] = await Promise.all(
    ["image", "category", "allergen", "ingredient", "plate"].map((url) => {
      if (localStorage.getItem("CLIENT_TOKEN")) {
        return fetchTable(url, { user: SushiUserType.Client });
      } else if (localStorage.getItem("ADMIN_TOKEN")) {
        return fetchTable(url);
      }
    })
  );
  images.set(image as Image[]);
  categories.set(category as Category[]);
  allergens.set(allergen as Allergen[]);
  ingredients.set(ingredient as Ingredient[]);
  plates.set(plate as Plate[]);
}
fetchAll();
