import { defineStore } from "pinia";

export const notifications = defineStore("notifications", {
  state: () => ({
    notifications: [],
    announcements: [],
    aprovals: [],
  }),
  actions: {
    addNotification(notification) {
      if (!this.notifications.includes(notification))
        this.notifications.unshift(notification);
    },
    addAnnouncement(announcement) {
      if (!this.announcements.includes(announcement))
        this.announcements.unshift(announcement);
    },
    addAproval(aproval) {
      if (!this.aprovals.includes(aproval)) this.aprovals.unshift(aproval);
    },
    add(document) {
      console.log(document.type);
      if (document.type === "announcement") this.addAnnouncement(document);
      else if (document.type === "notification") this.addNotification(document);
      else if (document.type === "approval") this.addAproval(document);
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
