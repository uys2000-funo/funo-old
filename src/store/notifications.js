import { defineStore } from "pinia";

export const useNotifications = defineStore("nottifications", {
  state: () => ({
      dict: {},
      lists: {},
      notification: {},
  }),
  actions: {
    addData(nID, data) {
      if (!this.dict[nID]) this.dict[nID] = {};
      this.dict[nID].nID = nID;
      this.dict[nID].data = data;
    },
    addDataAs(dID, nID, listID, data) {
      if (!this.dict[nID]) this.dict[nID] = {};
      if (!this.dict[nID][listID]) this.dict[nID][listID] = {};
      this.dict[nID][listID].dID = dID;
      this.dict[nID][listID].data = data;
    },
    addList(listID, nID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(nID)) this.lists[listID].push(nID);
    },
    addListAs(listID, nID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(nID)) this.lists[listID].push(nID);
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
      if (this.dict[listID].nID) delete this.dict[listID].nID;
      if (this.dict[listID].data) delete this.dict[listID].data;
    },
    removeDataAs(listID, nID) {
      if (this.dict[nID][listID].dID) delete this.dict[nID][listID].dID;
      if (this.dict[nID][listID].data) delete this.dict[nID][listID].data;
    },
    removeList(listID, nID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != nID);
    },
    removeListAs(listID, nID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != nID);
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
