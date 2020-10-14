import { Store, createConnectedStore, withReduxDevtools } from "undux";

type State = {
  show: boolean;
};

let initialState: State = {
  show: true,
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
