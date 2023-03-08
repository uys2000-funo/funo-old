<template>
  <div class="fit column no-wrap items-center">
    <div class="full-width overflow-hidden q-pb-sm" style="flex-shrink: 0;z-index: 10;">
      <div class=" row justify-center">
        <comp-wheel :r="pageNumber" :setR="setPageNumber" :pageNumber="pageNumber" :photoURL="userStore.photoURL" />
      </div>
    </div>
    <div class="full-width" style="flex-grow: 1; overflow: auto; ">
      <div class="fit" style="overflow: auto;">
        <router-view :pageNumber="pageNumber" />
      </div>
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/discover/compWheel.vue";
import { useUser } from "@/store/user";
export default {
  components: { compWheel },
  data() {
    return {
      pageNumber: 0,
      userStore: useUser()
    }
  },
  methods: {
    setPageNumber(value) {
      this.pageNumber = value
    },
  },

};
</script>