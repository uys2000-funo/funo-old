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
    },
  }),
  actions: {
    setPage(value) {
      this.page = value;
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
