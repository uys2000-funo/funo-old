<template>
  <div class="fit column no-wrap items-center">
    <div class="full-width overflow-hidden" style="flex-shrink: 0;">
      <div class="row justify-center">
        <comp-wheel :setR="setPageNumber" :pageNumber="pageNumber" :photoURL="userStore.user.userFire.account.photoURL"
          :type="type" />
      </div>
      <comp-header v-if="user" :user="user" />
    </div>
    <div class="full-width" style="flex-grow: 1; overflow: auto; ">
      <div class="fit" style="overflow: auto;">
        <router-view :pageNumber="pageNumber" :user="user" :type="type" />
      </div>
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/user/compWheel.vue";
import compHeader from "@/components/user/compHeader.vue";
import { useUser } from "@/store/user";
import { getUserData } from "@/services/app/user";
export default {
  components: { compWheel, compHeader },
  data() {
    return {
      userStore: useUser(),
      user: null,
      pageNumber: 0
    }
  },
  methods: {
    setPageNumber(value) {
      this.pageNumber = value
    },
  },
  mounted() {
    if (!this.state)
      getUserData(this.$route.params.uID).then((user) => this.user = user.data)
    else this.user = this.userStore.user.userFire
  },
  provide() {
    return {
      increaseFollwer: () => { this.user.count.follower++ },
      decreaseFollwer: () => { this.user.count.follower-- }
    }
  },
  computed: {
    type() {
      if (!this.$route.params.uID) return true
      return false
    }
  }
};
</script>
