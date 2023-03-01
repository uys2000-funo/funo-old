import { defineStore } from "pinia";

export const event = defineStore("event", {
  state: () => ({
    event: {
      general: {
        name: "",
        description: "",
        imageCounter: 0,
      },
      conditions: {
        age: { min: 0, max: 0 },
        approval: false,
        userLimit: 0,
        price: 0,
      },
      date: { start: 0, end: 0 },
      location: {
        isOnline: false,
        text: "", // Location or App Name
        description: "", // Adress Description or URL
        cordinates: null,
      },
      tags: {
        main: [],
        user: [],
      },
    },
  }),
  actions: {
    clearEvent() {
      this.event.general.name = "";
      this.event.general.description = "";
      this.event.general.imageCounter = 0;
      this.event.conditions.age.min = 0;
      this.event.conditions.age.max = 0;
      this.event.conditions.approval = false;
      this.event.conditions.userLimit = 0;
      this.event.conditions.price = 0;
      this.event.date.start = 0;
      this.event.date.end = 0;
      this.event.location.isOnline = false;
      this.event.location.text = "";
      this.event.location.description = "";
      this.event.location.cordinates = null;
      this.event.tags.main = [];
      this.event.tags.user = [];
    },
  },
});

export const events = defineStore("events", {
  state: () => ({
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
    updateEventFlowOrder() {},
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
