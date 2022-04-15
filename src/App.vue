<template>
  <router-view />
</template>

<script>
import c from "@/services/c";
export default {
  name: "LayoutDefault",
  components: {},
  data() {
    return {
      user: null,
    };
  },
  provide() {
    return {
      getUser: this.getUser,
      setUser: this.setUser,
    };
  },
  methods: {
    getUser: function () {
      return c("Run getUser:", this.user);
    },
    setUser: function (value) {
      this.user = c("Run setUser:", value);
    },
  },
};
</script>
