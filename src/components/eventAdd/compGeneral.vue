<template>
  <div class="full-width">
    <span class="text-h6">Etkinlik Adı</span>
    <div>
      <q-input
        v-model="eventAdd.event.name"
        outlined
        placeholder="Etkinlik Adı"
      />
    </div>
  </div>
  <div class="full-width">
    <span class="text-h6">Açıklama</span>
    <div>
      <q-input
        v-model="eventAdd.event.desc"
        outlined
        placeholder="Etkinlik hakkında detaylı bilgi girin"
      />
    </div>
  </div>
  <div class="full-width">
    <span class="text-h6">Etkinlik Kategorisini Seçin</span>
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
    </div>
  </div>
</template>
<script>
import { eventAdd } from "@/store/eventAdd";
import compButtonCheck from "../create/compButtonCheck.vue";
export default {
  components: { compButtonCheck },
  data() {
    return {
      eventAdd: eventAdd(),
      buttons: ["spor", "artt", "educ", "musi", "meet", "part"],
      buttonNames: ["Spor", "Art", "Education", "Music", "Meeting", "Party"],
    };
  },
};
</script>
