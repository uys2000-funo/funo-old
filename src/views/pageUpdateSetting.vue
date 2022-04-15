<template>
  <q-input v-model="key" label="Ayar" />
  <q-input v-model="value" label="değer" />
  <q-btn label="Upadete" @click="updateSettings" />
</template>
<script>
import { updateSettings } from "@/services/core/main";
export default {
  data() {
    return {
      key: "",
      value: "",
    };
  },
  methods: {
    updateSettings() {
      updateSettings(this.key, this.value);
    },
  },
};
</script>
