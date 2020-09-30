import { Store, createConnectedStore } from "undux";
import ChannelData from "../models/ChannelData";

type State = {
  email: string;
  username: string;
  picture: string;
  channels: ChannelData[];
  selectedChannel: number;
};

let initialState: State = {
  email: "default@default.com",
  username: "default",
  picture: "default",
  channels: [],
  selectedChannel: 0,
};

export default createConnectedStore(initialState);

export type StoreProps = {
  store: Store<State>;
};
