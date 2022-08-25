import { defineStore } from "pinia";

export const pages = defineStore("pages", {
  state: () => ({
    notificationDialog: false,
    messagesDialog: false,
  }),
  actions: {
    setNotificationDialog(value) {
      this.notificationDialog = value;
    },
    setMessagesDialog(value) {
      this.messagesDialog = value;
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
