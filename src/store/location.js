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
    setLocation(value) {
      this.location = value;
    },
  },
  getters: {
    getPosition: (state) => {
      return [state.position.latitude, state.position.longitude];
    },
  },
});
