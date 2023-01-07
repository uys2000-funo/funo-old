import { filterFunction } from "@/services/core/main";
import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => ({
    user: {},
    lastUser: {},
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setLastUser(user) {
      this.lastUser = user;
    },
    setHidden(value) {
      this.user.userFire.hidden = value;
    },
    addEventToUser(eID) {
      this.user.userFire.joinEvent.push(eID);
      this.user.userFire.joinEventCount += 1;
    },
    removeEventFromUser(eID) {
      this.user.userFire.joinEvent = filterFunction(
        this.user.userFire.joinEvent,
        eID
      );
      this.user.userFire.joinEventCount -= 1;
    },
    addFollower(fID) {
      this.user.userFire.fUsers.push(fID);
    },
    removeFollower(fID) {
      this.user.userFire.fUsers = filterFunction(
        this.user.userFire.fUsers,
        fID
      );
    },
    checkFollowedUser(fID) {
      return this.user.userFire.fUsers.indexOf(fID);
    },
  },
  getters: {
    fire: (state) => {
      if (state.user.userFire) return state.user.userFire;
      else return false;
    },
    auth: (state) => {
      if (state.user.userAuth) return state.user.userAuth;
      else return false;
    },
    ID: (state) => {
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
    hidden: (state) => {
      if (state.user.userFire?.hidden) return state.user.userFire.hidden;
      else return false;
    },
    tags: (state) => {
      if (state.user.userFire?.tags) return state.user.userFire?.tags;
      else return ["spor", "artt", "educ", "musi", "meet", "part"];
    },
    jEvents: (state) => {
      if (state.user.userFire?.joinEvent) return state.user.userFire?.joinEvent;
      else return null;
    },
    cEvents: (state) => {
      if (state.user.userFire?.events) return state.user.userFire?.events;
      else return null;
    },
    isUsableLastUser: (state) => {
      const mail = state.lastUser?.userFire?.mail;
      const pass = state.lastUser?.userFire?.pass;
      if (mail && pass) return true;
      else return false;
    },
    uMsgList: (state) => {
      if (state.user.userFire?.uMsgList) return state.user.userFire?.uMsgList;
      else return [];
    },
  },
});
