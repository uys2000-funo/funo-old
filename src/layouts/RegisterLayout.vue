<template>
  <div class="column no-wrap justify-center items-center content-center">
    <div class="col-4">
      <div class="reg">
        <register-wheel v-if="page != -4" :page="page" />
      </div>
      <div class="bec">
        <q-btn round flat fab-mini @click="goBack">
          <q-icon>
            <img
              :src="require('@/assets/images/icons/backArrow.svg')"
              alt="icon"
            />
          </q-icon>
        </q-btn>
      </div>
    </div>
    <div class="col-7">
      <router-view :page="page" :right="right" :uWatch="uWatch" ref="r" />
    </div>
    <div class="col-1">
      <q-btn
        v-if="page != 0 && page != -4 && page != 3"
        class="btn"
        @click="goNext"
      >
        <div>Devam</div>
      </q-btn>
      <q-btn
        v-if="page == -4 || page == 3"
        :disable="!right"
        class="btn"
        @click="register"
      >
        <div>Kaydol</div>
      </q-btn>
    </div>
  </div>
</template>
<script>
import registerWheel from "@/components/compRegisterWheel.vue";
import { registerCheck } from "@/services/core/main";

registerCheck;
export default {
  components: {
    registerWheel,
  },
  data() {
    return {
      page: 0,
      right: false,
      uWatch: false,
      user: {},
    };
  },
  methods: {
    abs: function (val) {
      return Math.abs(val);
    },
    setPage: function (value) {
      this.page = value;
    },
    goNext: function () {
      this.page < 0 ? (this.page -= 1) : (this.page += 1);
    },
    goBack: function () {
      this.page < 0 ? (this.page += 1) : (this.page -= 1);
      if (this.page == 0) this.$router.go(-1);
    },
    register: function () {
      this.uWatch = true;
      setTimeout(() => {
        if (registerCheck(this.user)) console.log(this.user);
      }, 10);
    },
  },
  provide() {
    return {
      setPage: this.setPage,
      setRight: () => (this.right = !this.right),
      setUser: (user) => (this.user = user),
    };
  },
};
</script>
<style scoped>
.reg {
  height: 100%;
  margin: auto;
}
.bec {
  position: fixed;
  left: 2vw;
  top: 1vh;
}
.btn {
  background: #ff7f00;
  border-radius: 20px;
  width: 75vw;
}
</style>
