<template>
  <div class="fit a">
    <comp-message :uID="user.ID"/>
  </div>
</template>
<script>
import compMessage from "../general/compMessage.vue";
import { user } from "@/store/user";
export default {
  components: { compMessage },
  data() {
    return {
      user: user(),
    };
  },
  mounted() {
  },
};
</script>
