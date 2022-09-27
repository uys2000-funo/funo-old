import { loginFunction } from "@/services/firebase/login";
import { getLastUser } from "./main";
import { c } from "@/services/c";

export const autoLogin = function (user, loginPopup, route, router) {
  user.setLastUser(getLastUser());
  if (user.isUsableLastUser) {
    c("check: isUsableLastUser", user.isUsableLastUser);
    loginFunction(user.lastUser?.userFire)
      .then((res) => {
        c("check: loginFunction", res);
        user.setUser(res);
        if (route.path == "/" || route.path == "/login")
          router.push("/app/main/events");
      })
  }
};
