import { Store, createConnectedStore, withReduxDevtools } from "undux";

type ChannelVideoData = {
  id: string;
  guid: string;
  title: string;
  thumb: string;
  videoLength: number;
  views: number;
  creationDate: string;
}

type State = {
  channelFeed: any[];
};

let initialState: State = {
  channelFeed: [{}, {}, {}, {}, {}, {}, {}, {}],
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
