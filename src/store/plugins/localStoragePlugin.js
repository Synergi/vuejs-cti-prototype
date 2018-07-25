// store/plugins

import { STORAGE_KEY } from "../modules/fsm/transitions";

export default function localStoragePlugin() {
  return store => {
    store.subscribe((mutation, { current }) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    });
  };
}
