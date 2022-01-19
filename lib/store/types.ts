import { StoreonModule } from "storeon";
import { AuthEvents, AuthStore } from "./auth/types";

export interface State {
  auth: AuthStore,
}

export type Events = AuthEvents

export type createStoreModule = (apiUrl: string) => StoreonModule<State, Events>
