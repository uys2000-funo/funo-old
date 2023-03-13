import { defineStore } from "pinia";

export const useAtmospheres = defineStore("atmospheres", {
  state: () => ({
    dict: {},
    lists: {},
    notification: {},
  }),
  actions: {
    addData(aID, data) {
      if (!this.dict[aID]) this.dict[aID] = {};
      this.dict[aID].aID = aID;
      this.dict[aID].data = data;
    },
    addDataAs(dID, aID, listID, data) {
      if (!this.dict[aID]) this.dict[aID] = {};
      if (!this.dict[aID][listID]) this.dict[aID][listID] = {};
      this.dict[aID][listID].dID = dID;
      this.dict[aID][listID].data = data;
    },
    addList(listID, aID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(aID)) this.lists[listID].push(aID);
    },
    addListAs(listID, aID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(aID)) this.lists[listID].push(aID);
    },
    addListBegin(listID, aID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      if (!this.lists[listID].includes(aID)) this.lists[listID].unshift(aID);
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
      if (this.dict[dID]) {
        if (this.dict[dID].aID) delete this.dict[dID].aID;
        if (this.dict[dID].data) delete this.dict[dID].data;
      }
    },
    removeDataAs(listID, aID) {
      if (this.dict[aID][listID].dID) delete this.dict[aID][listID].dID;
      if (this.dict[aID][listID].data) delete this.dict[aID][listID].data;
    },
    removeList(listID, aID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != aID);
    },
    removeListAs(listID, aID) {
      this.lists[listID] = this.lists[listID].filter((id) => id != aID);
    },
    removeFrom(listID, data) {
      this.removeData(data.dID);
      this.removeList(listID, data.dID);
    },
    removeFromAs(listID, dID, data) {
      this.removeDataAs(listID, data.data[dID]);
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
    getList(listID) {
      if (!this.lists[listID]) this.lists[listID] = [];
      return this.lists[listID];
    },
    getItems(listID) {
      return this.getList(listID).map((aID) => this.dict[aID]);
    },
    clear() {
      this.dict = {};
      this.lists = {};
    },
  },
});
