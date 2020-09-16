import { Store, createConnectedStore } from "undux";

type State = {
  isAuthenticated: boolean;
};

let initialState: State = {
  isAuthenticated: false,
};

export default createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};
