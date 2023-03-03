import { defineStore } from "pinia";

const event = {
  general: {
    name: "",
    description: "",
    imageCounter: 0,
    oName: "",
    oID: "",
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
};
export const useEvent = defineStore("event", {
  state: () => ({
    event: event,
  }),
  actions: {
    clear() {
      this.event = event;
    },
  },
});

export const useEvents = defineStore("events", {
  state: () => ({
    eventDict: {},
    joinedEvents: {},
    eventList: [],
    eventFlowList: [],
    eventUserCreatedList: [],
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
    removeEvent(eID) {
      this.eventList = this.eventList.filter((e) => e !== eID);
      this.eventFlowList = this.eventFlowList.filter((e) => e !== eID);
      delete this.eventDict[eID];
    },
  },
  getters: {
    state: (state) => {
      return state;
    },
  },
});
