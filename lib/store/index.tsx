import React from "react";
import { createStoreon, StoreonStore } from "storeon";
import { StoreContext } from "storeon/react";
import { Events, State } from "./types";
import { auth } from "./auth";

let store: StoreonStore<State, Events>;

export const StoreProvider: React.FC<{ apiUrl: string }> = ({ apiUrl, children }) => {
  if (!store) {
    store = createStoreon<State, Events>([
      auth(apiUrl),
    ]);
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
