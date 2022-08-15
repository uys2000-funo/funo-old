import { defineStore } from "pinia";

export const eventStorage = defineStore("events", {
  state: () => ({
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
    //cleanEvents() {
    //  this.eventsAll = [];
    //  this.eventsShow = [];
    //},
    //cleanEventsAll() {
    //  this.eventsAll = [];
    //},
    //cleanEventsShow() {
    //  this.eventsShow = [];
    //},
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
  },
  getters: {
    events: (state) => {
      return state.eventsShow;
    },
  },
});
