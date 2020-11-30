import { EffectsAs, Store, createConnectedStoreAs } from "undux";
import {
  hasAuthenticationToken,
  getAuthenticationToken,
} from "../utils/LocalStorage";
import effects from "./UnduxEffects";

type Auth = {
  isAuthenticated: boolean;
  token: string | null;
};

let initialAuthState: Auth = {
  isAuthenticated: hasAuthenticationToken(),
  token: getAuthenticationToken(),
};

type Feed = {
  channelFeed: any[];
  watchFeed: any[];
};

let initialFeedState: Feed = {
  channelFeed: [{}, {}, {}, {}, {}, {}, {}, {}],
  watchFeed: [{}, {}, {}, {}, {}, {}, {}, {}],
};

type Profile = {
  loaded: boolean;
  email: string;
  username: string;
  displayUsername: string;
  picture: string;
  channels: any[];
  selectedChannel: number;
};

let initialProfileState: Profile = {
  loaded: false,
  email: "default@default.com",
  username: "default",
  displayUsername: "Default",
  picture: "default",
  channels: [],
  selectedChannel: 0,
};

type Sidebar = {
  show: boolean;
};

let initialSidebarState: Sidebar = {
  show: true,
};

type Watch = {
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
  comments: any[];
};

let initialWatchState: Watch = {
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
  comments: [],
};

type Channel = {
  id: string;
  guid: string;
  link: string;
  name: string;
  picture: string;
  description: string;
  followers: number;
  following: boolean;
};

let initialChannelState: Channel = {
  id: "0",
  guid: "default",
  link: "default",
  name: "Default",
  description: "Default",
  picture: "default",
  followers: 0,
  following: false,
};

export default createConnectedStoreAs(
  {
    auth: initialAuthState,
    feed: initialFeedState,
    profile: initialProfileState,
    sidebar: initialSidebarState,
    watch: initialWatchState,
    channel: initialChannelState,
  },
  effects
);

export type StoreProps = {
  auth: Store<Auth>;
  feed: Store<Feed>;
  profile: Store<Profile>;
  sidebar: Store<Sidebar>;
  watch: Store<Watch>;
  channel: Store<Channel>;
};

export type StoreEffects = EffectsAs<{
  auth: Auth;
  feed: Feed;
  profile: Profile;
  sidebar: Sidebar;
  watch: Watch;
  channel: Channel;
}>;
