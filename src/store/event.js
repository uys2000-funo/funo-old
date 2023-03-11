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
    event: { data: event, eID: "" },
    images: [],
    imageURLs: [],
  }),
  actions: {
    clear() {
      this.event = { data: event, eID: "" };
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
    addList(listID, eID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(eID)) this.lists[listID].push(eID);
    },
    addListAs(listID, eID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(eID)) this.lists[listID].push(eID);
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
    removeData(listID) {
      if (this.dict[listID].eID) delete this.dict[listID].eID;
      if (this.dict[listID].data) delete this.dict[listID].data;
    },
    removeDataAs(listID, eID) {
      if (this.dict[eID][listID].dID) delete this.dict[eID][listID].dID;
      if (this.dict[eID][listID].data) delete this.dict[eID][listID].data;
    },
    removeList(listID, eID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != eID);
    },
    removeListAs(listID, eID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != eID);
    },
    removeFrom(listID, data) {
      this.removeData(listID, data);
      this.removeList(listID);
    },
    removeFromAs(listID, dID, data) {
      data.data[dID], listID, this.removeDataAs(listID, data.data[dID]);
      this.removeListAs(listID, data.data[dID]);
    },
    getLastID(listID) {
      return this.lists[listID][this.lists[listID].length - 1];
    },
    getLast(listID) {
      if (!this.lists[listID]) return null;
      else return this.dict[this.getLastID(listID)];
    },
    getEvents(listID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      return this.lists[listID].map((eID) => this.dict[eID]);
    },
  },
});
