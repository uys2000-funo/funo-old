<template>
  <div class="column no-wrap q-mt-sm" style="height: 100%">
    <div class="col-2">
      <div class="row wrap justify-center items-center content-center q-mt-xs">
        <div class="col-4">
          <img :src="require('@/assets/images/logoText.svg')" alt="" />
        </div>
        <div class="col-4 text-center">
          <p style="margin: auto">{{ location.getPosition }}</p>
        </div>
        <div class="col-4 text-right">
          <img
            :src="require('@/assets/images/icons/message.svg')"
            alt=""
            @click="pages.setMessagesDialog(true)"
          />
          <img
            :src="require('@/assets/images/icons/notification.svg')"
            alt=""
            @click="pages.setNotificationDialog(true)"
          />
        </div>
      </div>
      <div class="q-mt-sm">
        <q-scroll-area style="height: 50px; width: calc(100vw - 10px)">
          <div class="row no-wrap">
            <div v-for="n in tags" :key="n">
              <q-btn
                class="q-mx-xs"
                :class="{ bgWhite: tagsColor[n] }"
                @click="updateTags(n)"
              >
                <div class="row no-wrap">
                  <q-icon>
                    <img
                      :src="require(`@/assets/images/icons/${n}.svg`)"
                      alt=""
                    />
                  </q-icon>
                  <span
                    class="q-ml-sm"
                    :style="`color:${tagsColor[n] ? 'white' : 'black'}`"
                    >{{ buttons[n] }}</span
                  >
                </div>
              </q-btn>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-10">
      <router-view :tags="cTags" />
    </div>
  </div>
  <comp-notifications />
  <comp-messages />
</template>

<script>
import { location } from "@/storages/location";
import { pages } from "@/storages/pages";
import compNotifications from "@/components/compNotifications.vue";
import compMessages from "@/components/compMessages.vue";
export default {
  inject: ["getUser"],
  components: { compNotifications, compMessages },
  data() {
    return {
      location: location(),
      pages: pages(),
      buttons: {
        spor: "spor",
        artt: "art",
        educ: "education",
        musi: "music",
        meet: "meeting",
        part: "party",
      },
      tagsColor: {
        spor: false,
        artt: false,
        educ: false,
        musi: false,
        meet: false,
        part: false,
      },
      tags: [],
      cTags: [],
      notDialog: false,
    };
  },
  methods: {
    updateTags: function (val) {
      if (this.cTags.find((v) => v == val)) {
        this.tagsColor[val] = false;
        this.cTags = this.cTags.filter((v) => v != val);
      } else {
        this.tagsColor[val] = true;
        this.cTags.push(val);
      }
    },
    checkTags: function (val) {
      return this.tags.some((i) => i == val);
    },
  },
  mounted() {
    this.tags = this.getUser().userFire?.tags;
  },
};
</script>

<style scoped>
.q-btn {
  background: #ffffff;
  border-radius: 15px;
}
.bgWhite {
  background: #ff7f00;
}
</style>
