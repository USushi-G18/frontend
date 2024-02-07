import { writable, type Writable } from "svelte/store";
import { Menu } from "../models/menu";

// init the menu with the value saved in localStorage
const initialMenu: Menu = (localStorage.getItem("menu") as Menu) ?? undefined;

export const selectedMenu: Writable<Menu | undefined> = writable(initialMenu);

// every time the menu changes update localStorage
selectedMenu.subscribe((value) => {
  if (value) {
    localStorage.setItem("menu", value);
  } else {
    localStorage.removeItem("menu");
  }
});
