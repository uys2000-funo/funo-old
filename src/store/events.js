import { filterFunction } from "@/services/core/main";
import { defineStore } from "pinia";

export const events = defineStore("events", {
  state: () => ({
    eventDict: {},
    eventFlowList: [],
    eventPopularList: [],
    eventSuggestList: [],
    eventFollowedList: [],
    lastEvent: null,
  }),
  actions: {
    addEvent(event) {
      this.eventDict[event.eID] = event;
    },
    addEvents(events) {
      events.map((event) => {
        this.eventDict[event.eID] = event;
      });
    },
    addEventsWithFlowList(events, lastUpdate = true) {
      if (lastUpdate) this.lastEvent = events[events.length - 1].eID;
      events = this.shortWithStartTime(events);
      events.map((event) => {
        this.eventDict[event.eID] = event;
        this.eventFlowList.push(event.eID);
      });
    },
    updatePopEvent(eID) {
      const eNew = this.eventDict[eID];
      if (this.eventPopularList.length < 2) {
        console.log(!this.eventPopularList.some((i) => i == eID));
        if (!this.eventPopularList.some((i) => i == eID)) {
          this.addEventWithPopList(eNew);
          return [{ eID: eID, usersCount: eNew.usersCount }, false];
        } else return [false, false];
      } else return this.changePopEvent(eNew);
    },
    changePopEvent(eNew) {
      const eOld = this.eventDict[this.eventPopularList[0]];
      if (eOld.usersCount < eNew.usersCount) {
        this.eventPopularList.splice(0, 1);
        this.eventPopularList.push(eNew.eID);
        this.updateOrderOfPopEvents();
        return [
          { eID: eNew.eID, usersCount: eNew.usersCount },
          { eID: eOld.eID, usersCount: eOld.usersCount },
        ];
      } else return [false, false];
    },
    addEventWithPopList(event) {
      this.eventDict[event.eID] = event;
      this.eventPopularList.push(event.eID);
      this.updateOrderOfPopEvents();
    },
    shortWithStartTime(events) {
      const f = (a, b) =>
        a.startDate.timestamp.seconds - b.startDate.timestamp.seconds;
      return events.sort(f);
    },
    updateOrderOfPopEvents() {
      const eventsList = this.eventPopularList.map((i) => this.eventDict[i]);
      const f = (a, b) => a.usersCount - b.usersCount;
      this.eventPopularList = eventsList.sort(f).map((i) => i.eID);
    },
    addUserToEvent(eID, uID) {
      if (!this.eventDict[eID].users) {
        this.eventDict[eID].users = [];
      }
      this.eventDict[eID].users.push(uID);
      this.eventDict[eID].usersCount += 1;
    },
    addEventsWithSuggestionList(events) {
      events = this.shortWithStartTime(events);
      events.map((event) => {
        this.eventDict[event.eID] = event;
        this.eventSuggestList.push(event.eID);
      });
    },
    addEventsWithFollowedList(events) {
      events = this.shortWithStartTime(events);
      events.map((event) => {
        this.eventDict[event.eID] = event;
        this.eventFollowedList.push(event.eID);
      });
    },
    removeUserFromEvent(eID, uID) {
      this.eventDict[eID].users = filterFunction(
        this.eventDict[eID].users,
        uID
      );
      this.eventDict[eID].usersCount -= 1;
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
    lastFlowEventDate: (state) => {
      if (state.eventDict[state.lastEvent])
        return state.eventDict[state.lastEvent].endDate?.timestamp;
      else return null;
    },
  },
});
