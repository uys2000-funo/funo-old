import { defineStore } from "pinia";

export const pages = defineStore("pages", {
  state: () => ({
    event: {},
  }),
  actions: {
    closeEventSettinsg() {
      this.eventSettingsDialog = false;
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
