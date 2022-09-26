<template>
  <div class="row o flex column">
    <div
      class="col-4 flex justify-center"
      style="overflow: hidden; max-width: 100vw"
    >
      <comp-wheel :r="r" :setR="(value) => (r = value)" />
    </div>
    <div class="col-8">
      <router-view :page="r" :user="user" />
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/othersProfile/compWheel.vue";
import { getUser } from "@/services/firebase/user";
export default {
  components: {
    compWheel,
  },
  data() {
    return {
      r: 0,
      user: null,
    };
  },
  methods: {
    getUser: function () {
      getUser(this.$route.params.id).then((user) => (this.user = user));
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>
