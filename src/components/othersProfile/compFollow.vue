<template>
  <div class="fit a row">
    <q-btn
      style="margin: auto"
      class="bg-primary"
      :label="checkFollowedUser($route.params.id) ? `follow` : `unfollow`"
      @click="buttonEvent"
    />
  </div>
</template>
<script>
import { user } from "@/store/user";
import { updateUser } from "@/services/firebase/core/sFirestore";
export default {
  data() {
    return {
      user: user(),
      fUsers: user().user.userFire.fUsers,
    };
  },
  methods: {
    addFollower: user().addFollower,
    removeFollower: user().removeFollower,
    checkFollowedUser: user().checkFollowedUser,
    buttonEvent: function () {
      const id = this.$route.params.id;
      if (this.checkFollowedUser(id)) this.addFollower(id);
      else this.removeFollower(id);
      updateUser(this.user.ID, { fUsers: this.fUsers });
    },
  },
};
</script>
<style scoped>
.a > div {
  height: 5vh;
  min-height: 40px;
}
</style>
