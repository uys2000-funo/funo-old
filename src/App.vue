<template>
  <router-view />

  <q-dialog v-model="inf">
    <q-card style="width:50vw">
      <q-card-section>
        <div class="text-h6">Info</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> Loginning </q-card-section>
    </q-card>
  </q-dialog>
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
      inf: false,
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
    if (this.user) this.inf = true;
    autoLogin(this.user.userFire).then((res) => {
      if (res) {
        this.inf = false;
        this.setUser(res);
        const path = this.$route.path;
        if (path == "/" || path == "/login") this.$router.push("/app/main");
      }
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
