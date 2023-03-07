import { defineStore } from "pinia";

export const useMessages = defineStore("messages", {
  state: () => ({
    dict: {},
    lists: {},
  }),
  actions: {
    addData(mID, data) {
      if (!this.dict[mID]) this.dict[mID] = {};
      this.dict[mID].mID = mID;
      this.dict[mID].data = data;
    },
    addDataAs(dID, mID, listID, data) {
      if (!this.dict[mID]) this.dict[mID] = {};
      if (!this.dict[mID][listID]) this.dict[mID][listID] = {};
      this.dict[mID][listID].dID = dID;
      this.dict[mID][listID].data = data;
    },
    addList(listID, mID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(mID)) this.lists[listID].push(mID);
    },
    addListAs(listID, mID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(mID)) this.lists[listID].push(mID);
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
      if (this.dict[listID].mID) delete this.dict[listID].mID;
      if (this.dict[listID].data) delete this.dict[listID].data;
    },
    removeDataAs(listID, mID) {
      if (this.dict[mID][listID].dID) delete this.dict[mID][listID].dID;
      if (this.dict[mID][listID].data) delete this.dict[mID][listID].data;
    },
    removeList(listID, mID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != mID);
    },
    removeListAs(listID, mID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != mID);
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
    getFirstID(listID) {
      return this.lists[listID][0];
    },
    getFirst(listID) {
      if (!this.lists[listID]) return null;
      else return this.dict[this.getFirstID(listID)];
    },
    clear() {
      this.dict = {};
      this.lists = {};
    },
  },
});
