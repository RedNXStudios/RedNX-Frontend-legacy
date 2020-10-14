import { Store, createConnectedStore, withReduxDevtools } from "undux";

type State = {
  id: string;
  guid: string;
  title: string;
  classification: number;
  description: string;
  videoLength: number;
  thumb: string;
  icon: string;
  views: number;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  creationDate: string;
};

let initialState: State = {
  id: "0",
  guid: "default",
  title: "Default",
  classification: 0,
  description: "",
  videoLength: 0,
  thumb: "default",
  icon: "",
  views: 0,
  likes: 0,
  dislikes: 0,
  liked: false,
  disliked: false,
  creationDate: "",
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
