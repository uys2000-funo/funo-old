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
      if (state.user.userAuth) return state.user.userAuth.user.uid;
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
    addJEvents: (state) => {
      if (state.user.userFire?.joinEvent) return state.user.userFire?.joinEvent;
      else return null;
    },
  },
});
