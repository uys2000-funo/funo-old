import { defineStore } from "pinia";

export const useComments = defineStore("comments", {
  state: () => ({
    dict: {},
    lists: {},
  }),
  actions: {
    addData(cID, data) {
      if (!this.dict[cID]) this.dict[cID] = {};
      this.dict[cID].cID = cID;
      this.dict[cID].data = data;
    },
    addDataAs(dID, cID, listID, data) {
      if (!this.dict[cID]) this.dict[cID] = {};
      if (!this.dict[cID][listID]) this.dict[cID][listID] = {};
      this.dict[cID][listID].dID = dID;
      this.dict[cID][listID].data = data;
    },
    addList(listID, cID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(cID)) this.lists[listID].push(cID);
    },
    addListAs(listID, cID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(cID)) this.lists[listID].push(cID);
    },
    addListBegin(listID, cID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(cID)) this.lists[listID].unshift(cID);
    },
    addListAsBegin(listID, cID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(cID)) this.lists[listID].unshift(cID);
    },
    add(listID, data) {
      this.addData(data.dID, data.data);
      this.addList(listID, data.dID);
    },
    addTo(listID, data) {
      this.addData(data.dID, data.data);
      this.addList(listID, data.dID);
    },
    addToBegin(listID, data) {
      this.addData(data.dID, data.data);
      this.addListBegin(listID, data.dID);
    },
    addToMany(listID, data) {
      data.forEach((d) => {
        this.addTo(listID, d);
      });
    },
    addToManyBegin(listID, data) {
      data.forEach((d) => {
        this.addToBegin(listID, d);
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
      if (this.dict[listID].cID) delete this.dict[listID].cID;
      if (this.dict[listID].data) delete this.dict[listID].data;
    },
    removeDataAs(listID, cID) {
      if (this.dict[cID][listID].dID) delete this.dict[cID][listID].dID;
      if (this.dict[cID][listID].data) delete this.dict[cID][listID].data;
    },
    removeList(listID, cID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != cID);
    },
    removeListAs(listID, cID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != cID);
    },
    removeFrom(listID, data) {
      this.removeData(listID);
      this.removeList(listID, data.dID);
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
