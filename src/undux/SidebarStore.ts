import { Store, createConnectedStore } from "undux";

type State = {
  show: boolean;
};

let initialState: State = {
  show: true,
};

export default createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};
