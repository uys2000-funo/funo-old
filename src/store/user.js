import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => ({
    user: {
      userAuth: {
        accessToken: "",
        languageCode: "",
        currentUser: {
          accessToken: "",
          displayName: "",
          email: "",
          emailVerified: false,
          isAnonymous: false,
          phoneNumber: "",
          photoURL: "",
          uid: "",
        },
      },
      userFire: {
        birthdate: "",
        imgLocation: "",
        imgType: "",
        mail: "",
        name: "",
        phoneNumber: "",
        sex: true,
        timestamp: {
          nanoseconds: 0,
          seconds: 0,
        },
        type: true,
        userName: "",
      },
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setUserAuth(userAuth) {
      this.user.userAuth = userAuth;
    },
    setUserFire(userFire) {
      this.user.userFire = userFire;
    },
  },
  getters: {
    uID: (state) => {
      if (state.user.userAuth) return state.user.userAuth.uid;
      else return false;
    },
    name: (state) => {
      if (state.user.userFire) return state.user.userFire.name;
      else return false;
    },
    userName: (state) => {
      if (state.user.userFire) return state.user.userFire.userName;
      else return false;
    },
  },
});
