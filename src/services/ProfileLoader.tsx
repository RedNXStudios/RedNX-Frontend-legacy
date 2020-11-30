import { useEffect } from "react";
import UnduxStores from "../undux/UnduxStores";
import Net from "../utils/Net";

function ProfileLoader(props: any) {
  let { auth, profile } = UnduxStores.useStores();
  useEffect(() => {
    if (auth.get("isAuthenticated") && !profile.get("loaded")) {
      Net.get("/api/account/get").then((e) => {
        if (e.data) {
          profile.set("loaded")(true);
          profile.set("email")(e.data.email);
          profile.set("displayUsername")(e.data.displayUsername);
          profile.set("username")(e.data.username);
          profile.set("picture")(e.data.picture);
        }
      });
    }
  });
  return null;
}

export default ProfileLoader;
