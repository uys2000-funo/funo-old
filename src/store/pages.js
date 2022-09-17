import { defineStore } from "pinia";

export const pages = defineStore("pages", {
  state: () => ({
    notificationDialog: false,
    messagesDialog: false,
    eventSettingsDialog: false,
    event: {},
  }),
  actions: {
    setNotificationDialog(value) {
      this.notificationDialog = value;
    },
    setMessagesDialog(value) {
      this.messagesDialog = value;
    },
    openEventSettinsg(value) {
      this.eventSettingsDialog = true;
      this.event = value;
    },
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
