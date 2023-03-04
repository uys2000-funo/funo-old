import { defineStore } from "pinia";

export const useLocation = defineStore("location", {
  state: () => ({
    city: "",
    address: "",
    coordinates: {
      latitude: 39.9334,
      longitude: 32.8597,
    },
  }),
  actions: {},
  getters: {
    getCoordinates: (state) => {
      return [state.coordinates.latitude, state.coordinates.longitude];
    },
  },
});
