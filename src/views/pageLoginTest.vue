<template>
  <div>
    <h6>person</h6>
    <div>
      <q-input v-model="lObj.mail" label="Mail" />
      <q-input v-model="lObj.pass" label="Password" />

      <q-btn style="width: 100%" label="Login" @click="loginFunction(lObj)" />
    </div>
    <div>
      <q-btn
        style="width: 100%"
        label="Login Google"
        @click="loginFunctionGoogle()"
      />
    </div>
  </div>
  {{ user }}
</template>

<script>
import { loginFunction, loginFunctionGoogle } from "../services/firebase/main";
import { setLastUser } from "@/services/core/main";
export default {
  inject: ["setUser"],
  data() {
    return {
      lObj: {
        mail: "",
        pass: "",
      },
      user: null,
    };
  },
  methods: {
    loginFunction: function (data) {
      loginFunction(data, this.pImg, this.tImg).then((res) => {
        this.setUser(res);
        setLastUser(res);
      });
    },
    loginFunctionGoogle: function () {
      loginFunctionGoogle().then((res) => {
        this.setUser(res);
        setLastUser(res);
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
h6 {
  margin-top: 20px;
}
</style>
