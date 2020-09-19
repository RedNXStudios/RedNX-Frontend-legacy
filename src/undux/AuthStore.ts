import { Effects, Store, createConnectedStore } from "undux";
import effects from "./AuthEffects";

type State = {
  isAuthenticated: boolean;
  token: string | null;
};

let initialState: State = {
  isAuthenticated: false,
  token: null,
};

export default createConnectedStore(initialState, effects);

export type StoreProps = {
  store: Store<State>;
};

export type StoreEffects = Effects<State>