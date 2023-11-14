import { writable } from 'svelte/store';

// Inizializza il carrello di partenza con il valore corrente del carrello in localStorage
const initialCart = JSON.parse(localStorage.getItem('cart') || '[]');

export const cart = writable(initialCart);

// Ogni volta che il carrello cambia, aggiorna localStorage
cart.subscribe(value => {
  localStorage.setItem('cart', JSON.stringify(value));
});