import { defineStore } from "pinia";

export const register = defineStore("register", {
  state: () => ({
    agreement: false,
    pass: "",
    profileImage: "",
    user: {
      type: true,
      name: "",
      phoneNumber: "",
      userName: "",
      mail: "",
      photoURL: "willBeSetAfterImageUpload",
      isHidden: false,
      counters: {
        point: 0,

        createdEvent: 0,
        joinedEvent: 0,
        joinedEventTrue: 0,

        followedEvent: 0,
        followedUser: 0,
        followerUser: 0,

        image: 0,
        comment: 0,
        like: 0,
      },
      countersTotal: {},
    },
    userPerson: {
      birthdate: null,
      sex: true,
    },
    userCompany: {
      taxnumber: "",
      companyAdress: "",
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
  getters: {
    fire: (state) => {
      if (state.user.userFire) return state.user.userFire;
      else return false;
    },
  },
});
