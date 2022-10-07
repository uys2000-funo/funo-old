import { defineStore } from "pinia";

export const messages = defineStore("messages", {
  state: () => ({
    msgDict: {},
    msgList: [],
  }),
  actions: {
    addMsg(mID, msgList) {
      this.msgList.push(mID);
      this.msgDict[mID] = msgList;
    },
    addMsgs(allMsg) {
      allMsg.forEach((msgObj) => {
        this.addMsg(msgObj["sID"],msgObj["sID"] );
      });
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
