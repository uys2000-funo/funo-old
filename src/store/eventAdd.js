import { defineStore } from "pinia";

export const eventAdd = defineStore("eventAdd", {
  state: () => ({
    page: 0,
    pageBtn: 0,
    images: [],
    event: {
      name: "",
      desc: "",
      tags: {
        spor: false,
        artt: false,
        educ: false,
        musi: false,
        meet: false,
        part: false,
      },
      startDate: {
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
      endDate: {
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
      ageRange: { min: 0, max: 0 },
      limit: 0,
      apro: false,
      type: false,
      app: { text: "", coord: [0, 0] },
      url: "",
      price: 0,
    },
  }),
  actions: {
    setPage(value) {
      this.page = value;
    },
    cleanEvent() {
      this.images = [];
      this.event = {
        name: "",
        desc: "",
        tags: {
          spor: false,
          artt: false,
          educ: false,
          musi: false,
          meet: false,
          part: false,
        },
        startDate: {
          date: "",
          time: "",
        },
        endDate: {
          date: "",
          time: "",
        },
        ageRange: { min: 0, max: 0 },
        limit: 0,
        apro: false,
        type: false,
        app: { text: "", coord: [0, 0] },
        url: "",
        price: 0,
      };
    },
    setEvent(event) {
      this.event = event;
    },
    setTime() {
      const d = new Date();
      const f = function (val) {
        if (val < 10) return `0${val}`;
        else return val;
      };
      this.event.startDate = {
        date: `${f(d.getDate())}/${f(d.getMonth())}/${d.getFullYear()}`,
        time: `${f(d.getHours())}:${f(d.getMinutes())}`,
      };
      this.event.endDate = {
        date: `${f(d.getDate())}/${f(d.getMonth())}/${d.getFullYear()}`,
        time: `${f(d.getHours())}:${f(d.getMinutes())}`,
      };
    },
  },
  getters: {
    getPage: (state) => {
      const p = state.page % 4;
      if (p < 0) return p + 4;
      else return p;
    },
  },
});
