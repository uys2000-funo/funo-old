<template>
  <div class="fit column no-wrap items-center" v-if="show">
    <div class="full-width overflow-hidden shadow-1 q-pb-sm" style="flex-shrink: 0;z-index: 10;">
      <div class=" row justify-center">
        <comp-wheel :setR="setPageNumber" :pageNumber="pageNumber" :photoURL="user?.account.photoURL" :type="type" />
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
      userOher: null,
      user: null,
      pageNumber: 0,
      show: false
    }
  },
  methods: {
    setPageNumber(value) {
      this.pageNumber = value
    },
    loadOtherUser() {
      if (this.userOher?.uID == this.$route.params.uID) {
        this.user = this.userOher;
        this.show = true
      }
      else getUserData(this.$route.params.uID).then((user) => {
        this.userOher = user.data
        this.user = user.data
        this.show = true
      })
    },
    loadUser() {
      if (this.type) this.loadOtherUser()
      else {
        this.user = this.userStore.user.userFire
        this.show = true
      }
    }
  },
  mounted() {
    this.loadUser()
  },
  provide() {
    return {
      increaseFollwer: () => {
        this.user.count.follower++
        this.userStore.user.userFire.count.followed++
      },
      decreaseFollwer: () => {
        this.user.count.follower--
        this.userStore.user.userFire.count.followed--
      }
    }
  },
  watch: {
    type() {
      this.loadUser()
    }
  },
  computed: {
    type() {
      if (this.$route.params.uID) return true
      return false
    },
  }
};
</script>
