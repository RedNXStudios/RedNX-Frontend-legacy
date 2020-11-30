import { withReduxDevtools } from "undux";
import {
  deleteAuthenticationToken,
  setAuthenticationToken,
  hasAuthenticationToken,
} from "../utils/LocalStorage";
import { StoreEffects } from "./UnduxStores";

let effects: StoreEffects = ({
  auth,
  feed,
  profile,
  sidebar,
  watch,
  channel,
}) => {
  auth.on("token").subscribe((next) => {
    if (next === undefined || next === null) {
      deleteAuthenticationToken();
      auth.set("isAuthenticated")(false);
    } else {
      setAuthenticationToken(next);
      auth.set("isAuthenticated")(hasAuthenticationToken());
    }
  });
  return {
    auth: withReduxDevtools(auth),
    feed: withReduxDevtools(feed),
    profile: withReduxDevtools(profile),
    sidebar: withReduxDevtools(sidebar),
    watch: withReduxDevtools(watch),
    channel: withReduxDevtools(channel),
  };
};

export default effects;
