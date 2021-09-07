import { writable } from "svelte/store";

export const initStart = writable<Record<string, number>>({});
