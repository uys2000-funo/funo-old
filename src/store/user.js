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
        photoURL: "",
        mail: "",
        name: "",
        phoneNumber: "",
        sex: true,
        isHidden: false,
        timestamp: {
          nanoseconds: 0,
          seconds: 0,
        },
        type: true,
        userName: "",
        counters: {
          point: 0,

          createdEvent: 0,
          joinedEvent: 0,
          joinedEventTrue: 0,

          followedEvent: 0,
          followedUser: 0,
          followerUser: 0,

          reporterUser: 0,
          reportedUser: 0,
          reportedEvent: 0,
          image: 0,
          comment: 0,
          like: 0,
        },
        countersTotal: {},
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
