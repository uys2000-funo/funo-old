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
        {{ msgs }}
        <template v-for="m in msgs" :key="m">
          <div>
            m
          </div>
        </template>
        <template v-for="msgID in messages.msgDict[sID]" :key="msgID">
          <comp-message-getted v-if="msgID.user != uID"
            uIMG="https://firebasestorage.googleapis.com/v0/b/gogol-test-app.appspot.com/o/U%2FXvrtXQT8S4aPiF4YwQ5q7jJKbpS2%2Fimgs%2FuImg?alt=media&token=1d976c42-5d36-4492-afb4-ddb77c3ca726"
            :msg="msgID.msg" />
          <comp-message-sended v-else
            uIMG="https://firebasestorage.googleapis.com/v0/b/gogol-test-app.appspot.com/o/U%2FXvrtXQT8S4aPiF4YwQ5q7jJKbpS2%2Fimgs%2FuImg?alt=media&token=1d976c42-5d36-4492-afb4-ddb77c3ca726"
            :msg="msgID.msg" />
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
import compMessageGetted from './compMessage/compMessageGetted.vue';
import compMessageSended from './compMessage/compMessageSended.vue';
import { user } from '@/store/user';
import { messages } from "@/store/messages"
import { getTarget, sendMessage, setupMessage, getMessages, getMessage, shortMessages } from '@/services/app/message';
getMessages
export default {
  components: { compMessageGetted, compMessageSended },
  data() {
    return {
      uID: "",
      sID: "",
      msg: "",
      msgs: [],
      target: "",
      user: user(),
      messages: messages(),
      msgListener: null,
    }
  },
  methods: {
    setTarget() {
      const uID = this.user.ID;
      const sID = this.$route.params.id

      this.uID = uID;
      this.target = getTarget(uID, sID);
    },
    isFisrtTime() {
      if (this.messages.msgIDList.includes(this.$route.params.id))
        return false;
      return true;
    },
    setFirstTime() {
      const c = this.sendMessage
      this.sendMessage = this.sendMessageFirstTime;
      this.sendMessageFirstTime = c;
    },
    setListener() {
      this.messages.msgDict[this.sID] = []
      this.msgListener = getMessage(this.target, changes => {
        changes.forEach((change) => {
          console.log(change.type);
          if (change.type == "added")
            this.messages.addMsg(this.sID, change.doc.data())
        })
        this.messages.msgDict[this.sID] = shortMessages(this.messages.msgDict[this.sID])
      })
    },
    sendMessageFirstTime() {
      this.uID = this.user.ID;
      this.sID = this.$route.params.id

      this.messages.msgIDList.push(this.sID)
      setupMessage(this.uID, this.sID)

      sendMessage(this.target, this.uID, this.msg);
      this.setListener();
      this.setFirstTime();
    },
    sendMessage: function () {
      sendMessage(this.target, this.uID, this.msg)
    },
    getMessages: function () {
      getMessages(this.target).then(msgs => {
        this.messages.addMsgs(this.sID, shortMessages(msgs))
      })
    }
  }, mounted() {
    this.setTarget();
    if (this.isFisrtTime())
      this.setFirstTime();
    else this.setListener();

  }, beforeUnmount() {
    if (this.msgListener)
      this.msgListener()
  }
}
</script>
<style scoped>
.rounded {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>