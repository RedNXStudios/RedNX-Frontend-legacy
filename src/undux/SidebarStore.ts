import { Store, createConnectedStore, withReduxDevtools } from "undux";

type State = {
  show: boolean;
};

let initialState: State = {
  show: false,
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
