import { writable } from 'svelte/store';
import type { OrderedPlate } from '../models/ordered_plate';

// Inizializza il carrello di partenza con il valore corrente del carrello in localStorage
const initialCart: OrderedPlate[] = JSON.parse(localStorage.getItem('cart') || '[]');

export const cart = writable(initialCart);

// Ogni volta che il carrello cambia, aggiorna localStorage
cart.subscribe(value => {
  localStorage.setItem('cart', JSON.stringify(value));
});