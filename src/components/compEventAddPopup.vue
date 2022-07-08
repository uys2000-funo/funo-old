<template>
  <div>
    <q-carousel
      :model-value="`${page}`"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      class="co bg-secondary"
    >
      <q-carousel-slide name="0">
        <div>
          <span>Etkinlik Adı</span>
          <div>
            <q-input placeholder="Etkinlik Adı" />
          </div>
        </div>
        <div>
          <span>Açıklama</span>
          <div>
            <q-input placeholder="Etkinlik hakkında detaylı bilgi girin" />
          </div>
        </div>
        <div>
          <span>Etkinlik Kategorisini Seçin</span>
          <div>
            <div class="row wrap">
              <div
                class="col-4 row"
                v-for="n in [...Array(buttons.length).keys()]"
                :key="n"
              >
                <comp-button-check
                  :btn="buttons[n]"
                  :btnName="buttonNames[n]"
                  clr="bg-secondary"
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import compButtonCheck from "./compButtonCheck.vue";
export default {
  components: {
    compButtonCheck,
  },
  props: ["page"],
  data() {
    return {
      buttons: ["spor", "artt", "educ", "musi", "meet", "part"],
      buttonNames: ["Spor", "Art", "Education", "Music", "Meeting", "Party"],
    };
  },
};
</script>
<style scoped>
.co {
  width: 100vw;
  height: 100%;
}
</style>
