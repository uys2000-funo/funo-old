import { defineStore } from "pinia";

export const events = defineStore("events", {
  state: () => ({
    eventsCreated: [],
    eventsJoined: [],
    eventsAll: [],
    eventsShow: [],
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
    addEvents(events) {
      this.eventsAll = this.eventsAll.concat(events);
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
  },
});
