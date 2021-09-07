import { writable } from "svelte/store";

type startType = {
  [key: string]: { start: number; end: number };
};

const createInitItems = () => {

  const {
    subscribe, update
  } = writable<startType>({});

  return {
    subscribe,
    update: (id: string, start: number, end: number) => {

      update((object) => {

        object[id] = {
          end,
          start
        };

        return object;

      });

    }
  };

};

export const initItems = createInitItems();
