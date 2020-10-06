import { Store, createConnectedStore, withReduxDevtools } from "undux";
import ChannelData from "../models/ChannelData";

type State = {
  email: string;
  username: string;
  displayUsername: string;
  picture: string;
  channels: ChannelData[];
  selectedChannel: number;
};

let initialState: State = {
  email: "default@default.com",
  username: "default",
  displayUsername: "Default",
  picture: "default",
  channels: [],
  selectedChannel: 0,
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
