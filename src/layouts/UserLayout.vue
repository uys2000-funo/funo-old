<template>
  <div class="fit column no-wrap items-center">
    <div class="full-width overflow-hidden">
      <div class="row justify-center">
        <comp-wheel :setR="setPageNumber" :pageNumber="pageNumber" :photoURL="userStore.user.userFire.account.photoURL" :type="false"/>
      </div>
      <comp-header />
    </div>
    <div class="full-width" style="flex-grow: 1; overflow: auto; ">
      <div class="fit" style="overflow: auto;">
        <router-view :pageNumber="pageNumber" />
      </div>
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/user/compWheel.vue";
import compHeader from "@/components/user/compHeader.vue";
import { useUser } from "@/store/user";
export default {
  components: { compWheel, compHeader },
  data() {
    return {
      userStore: useUser(),
      pageNumber: 0
    }
  },
  methods: {
    setPageNumber(value) {
      this.pageNumber = value
    },
  }
};
</script>
