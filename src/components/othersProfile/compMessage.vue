<template>
  <div class="fit a">
    <div>Message Page Will be Developed</div>
  </div>
</template>
<script>
import { user } from "@/store/user";
export default {
  data() {
    return {
      user: user().user.userFire,
      text: "",
    };
  },
  mounted() {
    console.log(this.user);
  },
};
</script>
<style scoped>
.a > div {
  height: 7vh;
  min-height: 75px;
}
.z {
  max-width: 100%;
  max-height: 100%;
}
</style>
