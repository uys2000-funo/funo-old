import { defineStore } from "pinia";

export const event = defineStore("event", {
  state: () => ({
    event: {
      general: {
        name: "",
        description: "",
        imageCounter: 0,
        oName: "",
        oID: "",
      },
      counters: {
        joinedUser: 0,
        joinedUserTrue: 0,
        followerUser: 0,
        reporterUser: 0,

        image: 0,
        comment: 0,
        like: 0,
      },
      countersTotal: {},
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
        cordinates: null,
      },
      tags: {
        main: [],
        user: [],
      },
    },
  }),
  actions: {
    clearEvent() {
      this.event.general.name = "";
      this.event.general.description = "";
      this.event.general.imageCounter = 0;
      this.event.conditions.age.min = 0;
      this.event.conditions.age.max = 0;
      this.event.conditions.approval = false;
      this.event.conditions.userLimit = 0;
      this.event.conditions.price = 0;
      this.event.date.start = 0;
      this.event.date.end = 0;
      this.event.location.isOnline = false;
      this.event.location.text = "";
      this.event.location.description = "";
      this.event.location.cordinates = null;
      this.event.tags.main = [];
      this.event.tags.user = [];
    },
  },
});

export const events = defineStore("events", {
  state: () => ({
    eventDict: {},
    joinedEvents: {},
    eventList: [],
    eventFlowList: [],
    eventUserCreatedList: [],
  }),
  actions: {
    addEvent(document = { eID: "" }) {
      this.eventDict[document.eID] = document;
      if (!this.eventList.includes(document.eID))
        this.eventList.push(document.eID);
    },
    addEvents(documents = [{ eID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
      });
    },
    addEventsForFlow(documents = [{ eID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
        if (!this.eventFlowList.includes(document.eID))
          this.eventFlowList.push(document.eID);
      });
    },
    addEventsForUserCreated(documents = [{ eID: "" }]) {
      documents.forEach((document) => {
        this.addEvent(document);
        if (!this.eventUserCreatedList.includes(document.eID))
          this.eventUserCreatedList.push(document.eID);
      });
    },
    removeEvent(eID) {
      this.eventList = this.eventList.filter((e) => e !== eID);
      this.eventFlowList = this.eventFlowList.filter((e) => e !== eID);
      delete this.eventDict[eID];
    },
    addJoinedEvent(document) {
      this.joinedEvents[document.eID] = document.isActive;
    },
    removeJoinedEvent(document) {
      console.log(document);
    },
    updateJoinedEvent(document) {
      console.log(document);
    },
  },
  getters: {
    flowLastTime: (state) => {
      const eID = state.eventFlowList[state.eventFlowList.length - 1];
      return state.eventDict[eID]?.date.end;
    },
    flowEvents: (state) => {
      return state.eventFlowList.map((eID) => state.eventDict[eID]);
    },
    flowEventsSorted: (state) => {
      const sort = (a, b) => a.date.start.timestamp - b.date.start.timestamp;
      return state.flowEvents.sort(sort);
    },
    userCreatedLastTime: (state) => {
      const eID =
        state.eventUserCreatedList[state.eventUserCreatedList.length - 1];
      return state.eventDict[eID]?.timestamp;
    },
    userCreatedEvents: (state) => {
      return state.eventUserCreatedList.map((eID) => state.eventDict[eID]);
    },
    userCreatedEventsSorted: (state) => {
      const sort = (a, b) => a.date.start.timestamp - b.date.start.timestamp;
      return state.userCreatedEvents.sort(sort);
    },
  },
});
