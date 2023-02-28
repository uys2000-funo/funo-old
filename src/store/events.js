import { defineStore } from "pinia";

export const events = defineStore("events", {
  state: () => ({
    event:{},
    eventDict: {},
    eventList: [],
    eventFlowList: [],
    lastEvent: null,
  }),
  actions: {
    addEvent(document = { eID: "" }) {
      this.eventDict[document.eID] = document;
      if (!this.eventList.includes(document.eID))
        this.eventList.push(document.eID);
    },
    addEvents(documents = [{ eID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
      });
    },
    addEventsForFlow(documents = [{ eID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
        if (!this.eventFlowList.includes(document.eID))
          this.eventFlowList.push(document.eID);
      });
    },
    updateEventFlowOrder(){
    },
    addPopularEvent(document) {
      console.warn(document);
    },
    removePopularEvent(document) {
      console.warn(document);
    },
    updatePopularEvent(document) {
      console.warn(document);
    },
  },
  getters: {
    flowEvents: (state) => {
      return state.eventFlowList.map((eID) => state.eventDict[eID]);
    },
    flowEventsSorted: (state) => {
      const sort = (a, b) => a.date.start.timestamp - b.date.start.timestamp;
      return state.flowEvents.sort(sort);
    },
  },
});
