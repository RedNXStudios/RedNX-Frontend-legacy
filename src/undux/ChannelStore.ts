import { Store, createConnectedStore, withReduxDevtools } from "undux";

type State = {
  id: string;
  link: string;
  name: string;
  picture: string;
  followers: number;
};

let initialState: State = {
  id: "default",
  link: "default",
  name: "Default",
  picture: "default",
  followers: 0,
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
