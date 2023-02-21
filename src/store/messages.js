import { defineStore } from "pinia";

export const messages = defineStore("messages", {
  state: () => ({
    msgIDList: [],
    msgDict: {},
  }),
  actions: {
    addMsg(sID, msg) {
      if(!this.msgDict[sID]) this.msgDict[sID] = []
      if (this.msgDict[sID] != msg) this.msgDict[sID].unshift(msg);
    },
    addMsgs(sID, msgList) {
      this.msgIDList.push(sID);
      this.msgDict[sID] = msgList
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
