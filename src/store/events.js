import { defineStore } from "pinia";

export const events = defineStore("events", {
  state: () => ({
    eventDict: {},
    eventDictForTag: {},
    eventFlowListCache: [],
    eventFlowList: [],
    index: 0,
    count: 5,
  }),
  actions: {
    setIndex(index) {
      this.index = index;
    },
    setCount(count) {
      this.count = count;
    },
    setEvents(events) {
      this.eventsAll = events;
    },
    addEvent(event) {
      this.eventDict[event.eID] = event;
    },
    addEvents(events) {
      events.map((event) => {
        this.eventDict[event.eID] = event;
      });
    },
    addEventsWithFlowList(events) {
      events.map((event) => {
        this.eventDict[event.eID] = event;
        this.eventFlowListCache.push(event.eID);
        this.eventFlowShort();
      });
    },
    eventFlowShort() {
      // This is for minimize sorting problem
      // because firebase does not accept this
      // orderBy("startDate.timestamp"),
      // where("endDate.timestamp", ">", Timestamp.fromDate(new Date()))
      let eventList = this.eventFlowListCache.map((i) => this.eventDict[i]);
      const f = (a, b) =>
        a.startDate.timestamp.seconds - b.startDate.timestamp.seconds;
      this.eventFlowList = eventList.sort(f).map((i) => i.eID);
    },
    getNextEvents(i, f = () => "") {
      const events = this.eventsAll.slice(this.index, this.index + this.count);
      this.index += events.length;
      this.eventsShow = this.eventsShow.concat(events);
      f();
    },
    setEventsJoined(events) {
      this.eventsJoined = events;
    },
    setEventsCreated(events) {
      this.eventsCreated = events;
    },
    addEventsCreated(events) {
      this.eventsCreated = this.eventsCreated.concat(events);
    },
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
    lastFlowEventDate: (state) => {
      return state.eventDict[
        state.eventFlowListCache[state.eventFlowListCache.length - 1]
      ].endDate.timestamp;
    },
  },
});
