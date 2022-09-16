<template>
  <div id="map" style="width: 600px; height: 400px"></div>
</template>

<script>
import { ymaps } from "@/assets/ymap.js";

export default {
  mounted() {
    const init = function () {
      // Creating the map.
      new ymaps.Map("map", {
        // The map center coordinates.
        // Default order: “latitude, longitude”.
        // To not manually determine the map center coordinates,
        // use the Coordinate detection tool.
        center: [55.76, 37.64],
        // Zoom level. Acceptable values:
        // from 0 (the entire world) to 19.
        zoom: 7,
      });
    };
    ymaps.ready(init);
  },
};
</script>
