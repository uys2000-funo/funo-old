<template>
  <div v-if="!isLogged">
    <input v-model="key" type="text" />
    <button @click="checkEvent">Enter</button>
  </div>
  <div v-if="isLogged">
    <router-view />
  </div>
</template>

<script>
import { checkOpenBetaUser } from "@/services/firebase/openBeta";
export default {
  data() {
    return {
      isLogged: false,
      key: "",
    };
  },
  methods: {
    checkEvent: function () {
      checkOpenBetaUser(this.key).then((res) => (this.isLogged = res));
    },
  },
};
</script>
