import { defineStore } from "pinia";

const event = {
  general: {
    name: "",
    description: "",
    photoURLs: [],
    userPhotoURLs: [],
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
    lists: {},
  }),
  actions: {
    addData(eID, data) {
      if (!this.dict[eID]) this.dict[eID] = {};
      this.dict[eID].eID = eID;
      this.dict[eID].data = data;
    },
    addDataAs(dID, eID, listID, data) {
      if (!this.dict[eID]) this.dict[eID] = {};
      if (!this.dict[eID][listID]) this.dict[eID][listID] = {};
      this.dict[eID][listID].dID = dID;
      this.dict[eID][listID].data = data;
    },
    addList(listID, dID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(dID)) this.lists[listID].push(dID);
    },
    addListAs(dID, dID2) {
      if (!this.lists[dID]) this.lists[dID] = [];
      if (!this.lists[dID].includes(dID2)) this.lists[dID].push(dID2);
    },
    addTo(listID, data) {
      this.addData(data.dID, data.data);
      this.addList(listID, data.dID);
    },
    addToMany(listID, data) {
      data.forEach((d) => {
        this.addTo(listID, d);
      });
    },
    addToAs(listID, dID, data) {
      this.addDataAs(data.dID, data.data[dID], listID, data.data);
      this.addListAs(listID, data.data[dID]);
    },
    addToAsMany(listID, dID2, data) {
      data.forEach((d) => {
        this.addToAs(listID, dID2, d);
      });
    },
    removeData(dID) {
      delete this.dict[dID][dID];
      delete this.dict[dID].data;
    },
    removeDataAs(dID, dID2) {
      delete this.dict[dID][dID2][dID2];
      delete this.dict[dID][dID2].data;
    },
    removeList(dID) {
      this.lists[dID] = this.lists[dID].filter((id) => id != dID);
    },
    removeListAs(dID, dID2) {
      this.lists[dID] = this.lists[dID].filter((id) => id != dID2);
    },
    removeFrom(dID, data) {
      this.removeData(dID, data);
      this.removeList(dID);
    },
    removeFromAs(dID, dID2, data) {
      this.removeData(dID, dID2, data);
      this.removeList(dID, dID2);
    },
    getLastID(listID) {
      return this.lists[listID][this.lists[listID].length - 1];
    },
    getLast(listID) {
      if (!this.lists[listID]) return null;
      else return this.dict[this.getLastID(listID)]
    },
  },
});
