import { Store, createConnectedStore, withReduxDevtools } from "undux";

type State = {
  guid: string;
  link: string;
  name: string;
  picture: string;
  description: string;
  followers: number;
  following: boolean;
};

let initialState: State = {
  guid: "default",
  link: "default",
  name: "Default",
  description: "Default",
  picture: "default",
  followers: 0,
  following: false,
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
