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
    removeNotification(notification) {
      if (this.notifications.includes(notification))
        this.notifications = this.notifications.filter(
          (n) => n != notification
        );
    },
    updateNotification(index, notification) {
      if (this.notifications[index]) this.notifications[index] = notification;
    },
    addAnnouncement(announcement) {
      if (!this.announcements.includes(announcement))
        this.announcements.unshift(announcement);
    },
    removeAnnouncement(announcement) {
      if (this.announcements.includes(announcement))
        this.announcements = this.announcements.filter(
          (n) => n != announcement
        );
    },
    updateAnnouncement(index, announcement) {
      if (this.announcements[index]) this.announcements[index] = announcement;
    },
    addAproval(aproval) {
      if (!this.aprovals.includes(aproval)) this.aprovals.unshift(aproval);
    },
    removeAproval(aproval) {
      if (this.aprovals.includes(aproval))
        this.aprovals = this.aprovals.filter((n) => n != aproval);
    },
    updateAproval(index, aproval) {
      if (this.aprovals[index]) this.aprovals[index] = aproval;
    },
    add(document) {
      if (document.type === "announcement") this.addAnnouncement(document);
      else if (document.type === "notification") this.addNotification(document);
      else if (document.type === "approval") this.addAproval(document);
    },
    remove(document) {
      if (document.type === "announcement") this.removeNotification(document);
      else if (document.type === "notification")
        this.removeAnnouncement(document);
      else if (document.type === "approval") this.removeAproval(document);
    },
    update(index, document) {
      if (document.type === "announcement")
        this.updateNotification(index, document);
      else if (document.type === "notification")
        this.updateAnnouncement(index, document);
      else if (document.type === "approval")
        this.updateAproval(index, document);
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
