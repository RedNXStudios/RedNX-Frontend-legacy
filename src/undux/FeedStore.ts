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
  watchFeed: any[];
};

let initialState: State = {
  channelFeed: [{}, {}, {}, {}, {}, {}, {}, {}],
  watchFeed: [{}, {}, {}, {}, {}, {}, {}, {}],
};

export default createConnectedStore(initialState, withReduxDevtools);

export type StoreProps = {
  store: Store<State>;
};
