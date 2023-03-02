<template>
  <div class="fit column no-wrap items-center">
    <div class="overflow-hidden">
      <comp-wheel :setR="setPageNumber" :pageNumber="pageNumber" />
      <div class="row justify-around no-wrap">
        <div>
          <div>
            {{ user.user.userFire }}
          </div>
          <div>
            Puan
          </div>
        </div>
      </div>
    </div>
    <div>
      {{ pageNumber }}
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/user/compWheel.vue";
import { user } from "@/store/user";
export default {
  components: { compWheel },
  data() {
    return {
      user: user(),
      pageName: "",
      pageNumber: 0
    }
  },
  methods: {
    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
    },
  }
};
</script>
