import { Store, createConnectedStore } from "undux";

type State = {
  isAuthenticated: boolean;
  token: string | null;
};

let initialState: State = {
  isAuthenticated: false,
  token: null,
};

export default createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};
