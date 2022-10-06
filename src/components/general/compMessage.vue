<template>
  <div class="column reverse no-wrap fit">
    <div class="rounded">
      <q-input outlined rounded v-model="msg" placeholder="Mesaj Gönder">
        <template v-slot:append>
          <q-btn flat dense round icon="send" @click="mesageSend" />
        </template>
      </q-input>
    </div>
    <q-scroll-area style="width: 100%; height: 100%">
      <div class="full-height column reverse ">
        <comp-message-getted
          uIMG="https://firebasestorage.googleapis.com/v0/b/gogol-test-app.appspot.com/o/U%2FXvrtXQT8S4aPiF4YwQ5q7jJKbpS2%2Fimgs%2FuImg?alt=media&token=1d976c42-5d36-4492-afb4-ddb77c3ca726"
          msg="test" />
        <comp-message-sended
          uIMG="https://firebasestorage.googleapis.com/v0/b/gogol-test-app.appspot.com/o/U%2FXvrtXQT8S4aPiF4YwQ5q7jJKbpS2%2Fimgs%2FuImg?alt=media&token=1d976c42-5d36-4492-afb4-ddb77c3ca726"
          msg="send" />
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
import compMessageGetted from './compMessage/compMessageGetted.vue';
import compMessageSended from './compMessage/compMessageSended.vue';
export default {
  components: { compMessageGetted, compMessageSended },
  data() {
    return { msg: "" }
  },
  methods: {
    mesageSend: {

    }
  }
}
</script>
<style scoped>
.rounded {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>