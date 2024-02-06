import { writable, type Writable } from "svelte/store";
import { Menu } from "../models/menu";

// Inizializza il carrello di partenza con il valore corrente del carrello in localStorage
const initialMenu: Menu = (localStorage.getItem("menu") as Menu) || undefined;

export const selectedMenu: Writable<Menu> | undefined = writable(initialMenu);

// Ogni volta che il carrello cambia, aggiorna localStorage
selectedMenu.subscribe((value) => {
  localStorage.setItem("menu", value);
});
