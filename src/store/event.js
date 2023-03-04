import { defineStore } from "pinia";

const event = {
  general: {
    name: "",
    description: "",
    images: [],
  },
  owner: {
    Name: "",
    uID: "",
    isPerson: false,
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
    coordinates: null,
    city: "",
  },
  tags: {
    main: [],
    user: [],
  },
};
const filter = {
  ownerType: "all",
  isOnline: "false",
  hasApproval: "all",
  hasUserLimit: "all",
  hasPrice: "all",
};
const filterArgs = [
  {
    column: "",
    condition: "",
    equality: "",
    order: true,
    where: true,
    serverTimestamp: false,
  },
];
export const useEvent = defineStore("event", {
  state: () => ({
    event: event,
    images: [],
    imageURLs: [],
  }),
  actions: {
    clear() {
      this.event = event;
      this.images = [];
      this.imageURLs = [];
    },
  },
});

export const useEvents = defineStore("events", {
  state: () => ({
    filter: filter,
    filterArgs: filterArgs,
    tags: [],
    eventDict: {},
    eventsList: [],
    eventsFlowList: [],
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
