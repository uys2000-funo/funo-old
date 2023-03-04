import { defineStore } from "pinia";

const event = {
  general: {
    name: "",
    description: "",
    photoURLs: [],
    userPhotoURL: [],
  },
  owner: {
    name: "",
    uID: "",
    isPerson: false,
    photoURL: "",
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
    dict: {},
    listAll: [],
    listFlow: [],
    listJoined: [],
    listCreated: [],
  }),
  actions: {
    add(document = { dID: "" }) {
      this.dict[document.dID] = document.data;
      if (!this.eventList.includes(document.dID))
        this.listAll.push(document.dID);
    },
    addTo(key = "", document = { dID: "" }) {
      this.dict[document.dID] = document.data;
      if (!this[key].includes(document.dID)) this[key].push(document.dID);
    },
    addList(documents = [{ dID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
      });
    },
    addListTo(key = "", documents = [{ dID: "" }]) {
      documents.forEach((document) => {
        this.addTo(key, document);
      });
    },
    remove(eID = "") {
      this.listAll = this.listAll.filter((e) => e !== eID);
      this.listFlow = this.listFlow.filter((e) => e !== eID);
      this.listJoined = this.listJoined.filter((e) => e !== eID);
      this.listCreated = this.listCreated.filter((e) => e !== eID);
      delete this.eventDict[eID];
    },
    removeFrom(key = "", eID = "") {
      return this[key] = this[key].filter((e) => e !== eID);
    },
    lastItemID() {
      return this.listAll[this.listAll.length - 1];
    },
    lastItem() {
      return this.dict[this.lastItemID()];
    },
    lastItemIDFrom(key = "") {
      const index = this[key].length - 1;
      return this[key][index];
    },
    lastItemFrom(key = "") {
      return this.dict[this.lastItemIDFrom(key)];
    },
  },
  getters: {
    all: (state) => {
      return state.listAll.map((eID) => state.dict[eID]);
    },
    flow: (state) => {
      return state.listFlow.map((eID) => state.dict[eID]);
    },
    joined: (state) => {
      return state.listJoined.map((eID) => state.dict[eID]);
    },
    created: (state) => {
      return state.listCreated.map((eID) => state.dict[eID]);
    },
  },
});
