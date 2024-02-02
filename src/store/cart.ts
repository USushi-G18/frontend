import { writable } from "svelte/store";
import type { CartItem } from "../models/cart";

// init the cart with the value saved in localStorage
const initialCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

export const cart = writable(initialCart);

// every time the cart changes update localStorage
cart.subscribe((value) => {
  localStorage.setItem("cart", JSON.stringify(value));
});
