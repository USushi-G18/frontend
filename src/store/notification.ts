import { writable, type Writable } from "svelte/store";

export type Notification = {
  type: "ERROR" | "INFO";
  message: string;
};

export const notification: Writable<Notification | undefined> = writable();
