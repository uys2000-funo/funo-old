<template>
  <div class="column no-wrap" style="height: 100%">
    <div class="col-2">
      <div class="row wrap justify-center items-center content-center q-mt-xs">
        <div class="col-4">
          <img :src="require('@/assets/images/logoText.svg')" alt="" />
        </div>
        <div class="col-4 text-center">
          <p style="margin: auto">Beyoğlu,İstanbul</p>
        </div>
        <div class="col-4 text-right">
          <img :src="require('@/assets/images/icons/message.svg')" alt="" />
          <img
            :src="require('@/assets/images/icons/notification.svg')"
            alt=""
          />
        </div>
      </div>
      <div class="q-mt-sm">
        <q-scroll-area style="height: 50px; width: calc(100vw - 10px)">
          <div class="row no-wrap">
            <div v-for="n in buttons" :key="n">
              <q-btn class="q-mx-xs">
                <div class="row no-wrap">
                  <q-icon>
                    <img
                      :src="require(`@/assets/images/icons/${n}.svg`)"
                      alt=""
                    />
                  </q-icon>
                  <span class="q-ml-sm">{{ n }}</span>
                </div>
              </q-btn>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-10">
      <div class="fit">
        <q-scroll-area style="width:100vw;height:100%">
          <router-view />
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: ["spor", "artt", "educ", "musi", "meet", "part"],
    };
  },
};
</script>

<style scoped>
.q-btn {
  background: #ffffff;
  border-radius: 15px;
}
</style>
