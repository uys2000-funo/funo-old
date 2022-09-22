<template>
  <div class="bg-secondary">
    <comp-img-show :cImg="event.imgCount" :eID="$route.params.id" />
    <comp-info :event="event" />
    <div>
      <q-input
        v-model="text"
        filled
        type="textarea"
        placeholder="Yorum Ekle..."
        autogrow
      />
      <div class="text-right text-subtitle2">12 yorumun tümünü görün</div>
    </div>
    <div class="text-center">
      <q-btn class="bt bg-primary">
        <span> Katıl </span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import compImgShow from "../components/event/compImgShow.vue";
import compInfo from "@/components/event/compInfo.vue";
export default {
  components: {
    compImgShow,
    compInfo,
  },
  props: ["event"],
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped>
.h {
  font-size: 2pc;
}
.bt {
  border-radius: 10px;
  height: 7vh;
  width: 30vw;
  margin: 1vh;
}
</style>
