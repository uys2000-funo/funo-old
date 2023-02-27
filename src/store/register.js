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
      imgType: "",
      imgLocation: "",
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
