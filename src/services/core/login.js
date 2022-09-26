import { loginFunction } from "@/services/firebase/login";
import { getLastUser } from "./main";

export const autoLogin = function (user, loginPopup, route, router) {
  user.setLastUser(getLastUser());
  if (user.isUsableLastUser) {
    loginFunction(user.lastUser?.userFire)
      .then((res) => {
        if (res) {
          user.setUser(res);
          loginPopup = false;
          if (route.path == "/" || route.path == "/login")
            router.push("/app/main/events");
        }
      })
      .catch(() => (loginPopup = false));
  }
};
