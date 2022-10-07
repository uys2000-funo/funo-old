<template>
  <div class="column reverse no-wrap fit">
    <div class="rounded">
      <q-input outlined rounded v-model="msg" placeholder="Mesaj Gönder">
        <template v-slot:append>
          <q-btn flat dense round icon="send" @click="sendMessage" />
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
import { getMsgs, sendMessage, updateUsersMsgList } from '@/services/core/message';
import compMessageGetted from './compMessage/compMessageGetted.vue';
import compMessageSended from './compMessage/compMessageSended.vue';
import { user } from '@/store/user';
import { messages } from "@/store/messages"
export default {
  components: { compMessageGetted, compMessageSended },
  data() {
    return {
      msg: "",
      user: user(),
      uMsgList: user().uMsgList,
      messages: messages()
    }
  },
  methods: {
    addMsg: messages().addMsg,
    sendMessageCore: function (uID, rID, mID) {
      this.addMsg(mID, this.msg)
      this.msg = ""
    },
    sendMessageDB: function (uID, rID, mID, msg, isFirstTime) {
      if (isFirstTime)
        updateUsersMsgList(uID, rID)
      sendMessage(mID, uID, msg)
    },
    sendMessage: function () {
      if (this.msg != "") {
        const uID = this.user.ID
        const rID = this.$route.params.id
        const mID = [uID, rID].sort().join("");
        const isFirstTime = !this.uMsgList.some((val => val == rID))
        this.sendMessageCore(uID, rID, mID, this.msg, isFirstTime)
        this.sendMessageDB(uID, rID, mID, this.msg, isFirstTime)
      }

    },
    getMessages: function () {
      const uID = this.user.ID;
      const rID = this.$route.params.id;
      const mID = [uID, rID].sort().join("");
      getMsgs(mID).then((data) => {
        console.log(data)
        this.addMsg(mID, data)
      })
    }
  }, mounted() {
    this.getMessages()
  }
}
</script>
<style scoped>
.rounded {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>