import { filterFunction } from "@/services/core/main";
import { defineStore } from "pinia";

export const events = defineStore("events", {
  state: () => ({
    eventDict: {},
    eventFlowList: [],
    popularEventList: [],
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
    shortWithStartTime(events) {
      const f = (a, b) =>
        a.startDate.timestamp.seconds - b.startDate.timestamp.seconds;
      return events.sort(f);
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
    addPopularEvent(document) {
      console.warn(document);
    },
    removePopularEvent(document) {
      console.warn(document);
    },
    updatePopularEvent(document) {
      console.warn(document);
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
