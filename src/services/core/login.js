import { getLastUser } from "./main";

export const autoLogin = function (user) {
  user.setLastUser(getLastUser());
  if (
    user.lastUser?.userFire?.mail &&
    user.lastUser?.userFire?.pass
  ) {
    this.inf = true;
    autoLogin(user.lastUser?.userFire).then((res) => {
      if (res) {
        this.inf = false;
        user.setUser(res);
        const path = this.$route.path;
        if (path == "/" || path == "/login")
          this.$router.push("/app/main/events");
      }
    });
  }
};
