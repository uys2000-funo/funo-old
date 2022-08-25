import { defineStore } from "pinia";

export const location = defineStore("location", {
  state: () => ({
    location: "",
    position: {
      latitude: 0,
      longitude: 0,
    },
  }),
  actions: {
    setPosition(latitude, longitude) {
      this.position = {
        latitude: latitude,
        longitude: longitude,
      };
    },
  },
  getters: {
    getPosition: (state) => {
      return [state.position.latitude, state.position.longitude];
    },
    getPosition2: (state) => {
      return [state.position.latitude+10, state.position.longitude+10];
    },
  },
});
