import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => ({
    user: {},
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
