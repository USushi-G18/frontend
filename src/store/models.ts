import { writable } from "svelte/store";
import type { Category } from "../models/category";
import type { Plate } from "../models/plate";
import { fetchTable } from "../utils/fetch";

export const images = writable<Image[]>([]);
export const categories = writable<Category[]>([]);
export const allergens = writable<Allergen[]>([]);
export const ingredients = writable<Ingredient[]>([]);
export const plates = writable<Plate[]>([]);

Promise.all(
  ["image", "category", "allergen", "ingredient", "plate"].map(fetchTable)
).then(([image, category, allergen, ingredient, plate]) => {
  images.set(image as Image[]);
  categories.set(category as Category[]);
  allergens.set(allergen as Allergen[]);
  ingredients.set(ingredient as Ingredient[]);
  plates.set(plate as Plate[]);
});
