import UnduxStores from "../undux/UnduxStores";
import { hasAuthenticationToken } from "../utils/LocalStorage";
import Net from "../utils/Net";

interface IProps {
  children?: any;
}

function SessionCheck(props: IProps) {
  let { auth } = UnduxStores.useStores();
  if (hasAuthenticationToken() && !auth.get("isAuthenticated")) {
    Net.get("/api/auth/checksession").then((response) => {
      if (response.data && response.data.isValid === false) {
        auth.set("token")(null);
      } else {
        auth.set("isAuthenticated")(true);
      }
    });
  }
  return props.children;
}

export default SessionCheck;
