<template>
  <div class="f">
    <div class="d" v-for="event in events" :key="event">
      <div>
        <span>name: {{ event.name }}</span>
        <br />
        <span>desc: {{ event.desc }}</span>
        <br />
        <span>tags: {{ event.tags }}</span>
        <br />
        <span>startDate: {{ event.startDate }}</span>
        <br />
        <span>endDate: {{ event.endDate }}</span>
        <br />
        <span>limit: {{ event.limit }}</span>
        <br />
        <span>apro: {{ event.apro }}</span>
        <br />
        <span>type: {{ event.type }}</span>
        <br />
        <span>apro: {{ event.apro }}</span>
        <br />
        <span>app: {{ event.app }}</span>
        <br />
        <span>url: {{ event.url }}</span>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import { getAllEvents } from "@/services/firebase/event";
export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    getAllEvents().then(
      (res) => (this.events = res.docs.map((item) => item.data()))
    );
  },
};
</script>

<style scoped>
.d {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border: solid black 1px;
  margin: 5px;
}
.f {
  height: 100vh;
  overflow: auto;
}
</style>
