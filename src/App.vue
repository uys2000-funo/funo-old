<template>
  <router-view />
</template>

<script>
import { c } from "@/services/c";
import { gettLastUser } from "./services/core/main";
import { autoLogin } from "./services/firebase/main";
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
  mounted() {
    this.user = gettLastUser();
    autoLogin(this.user.userFire).then((res) => {
      this.user = res;
    });
  },
};
</script>
<style>
#app > div > div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}
</style>
