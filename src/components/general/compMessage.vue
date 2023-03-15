<template>
  <div class="fit column no-wrap">
    <div class="fit column no-wrap justify-end overflow-hidden" style="flex-grow: 1;">
      <q-infinite-scroll reverse class="fit column no-wrap reverse overflow-auto q-pb-sm q-px-sm" @load="getOldMessages">
        <div v-for="(mID, index) in messages" :key="index" :set="uID = messageStore.dict[mID].data.rID">
          <comp-message-getted v-if="uID != rID" :message="messageStore.dict[mID].data.message"
            :photoUrl="userStore.photoURL" />
          <comp-message-sended v-else :message="messageStore.dict[mID].data.message" :photoUrl="rPhotoURL" />
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <div class="q-mb-sm q-px-sm">
      <q-input rounded outlined v-model="message" placeholder="Mesaj Gönder">
        <template v-slot:append>
          <q-btn flat dense round icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </div>
  </div>
</template>
<script>
import { useUser } from '@/store/user';
import { useMessages } from "@/store/messages"
import compMessageGetted from './compMessage/compMessageGetted.vue';
import compMessageSended from './compMessage/compMessageSended.vue';
import { sendMessage, getOldReceivedChatMessages, getOldSendedChatMessages, watchNewChatMessages, updateMessageHistory } from '@/services/app/message';
import { Timestamp } from '@firebase/firestore';
import { setMessageHistory } from '@/services/app/message';
export default {
  components: { compMessageGetted, compMessageSended },
  props: ["rID", "rPhotoURL", "rNickName"],
  data() {
    return {
      message: "",
      userStore: useUser(),
      messageStore: useMessages(),
    }
  },
  methods: {
    setListener() {
      watchNewChatMessages(this.userStore.uID, this.rID, (doc) =>
        this.messageStore.addTo(this.rID, doc)
      )
    },
    setMessageHistory(message) {
      setMessageHistory(this.userStore.uID, this.rID, this.userStore.nickName, this.rNickName, message, this.userStore.photoURL, this.rPhotoURL)
    },
    updateMessageHistory() {
      const lastMessage = this.messageStore.getLast(this.rID);
      if (lastMessage?.data)
        updateMessageHistory(this.userStore.uID, this.rID, this.userStore.nickName, this.rNickName, lastMessage.data.message, this.userStore.photoURL, this.rPhotoURL)
    },
    getReceivedMessages(last) {
      return getOldReceivedChatMessages(this.userStore.uID, this.rID, last)
    },
    getSendedMessages(last) {
      return getOldSendedChatMessages(this.userStore.uID, this.rID, last)
    },
    shortOldMessages(rMessages = [], sMessages = [], done) {
      const l = rMessages.length + sMessages.length
      let [rIndex, sIndex, messages] = [0, 0, []]
      for (let i = 0; i < l; i++) {
        if (!rMessages[rIndex] && !sMessages[sIndex]) {
          break;
        } else if (!rMessages[rIndex]) {
          messages.push(sMessages[sIndex])
          sIndex++
        } else if (!sMessages[sIndex]) {
          messages.push(rMessages[rIndex])
          rIndex++
        } else if (rMessages[rIndex].data.timestamp.seconds < sMessages[sIndex].data.timestamp.seconds) {
          messages.push(sMessages[sIndex])
          sIndex++
        } else if (rMessages[rIndex].data.timestamp.seconds > sMessages[sIndex].data.timestamp.seconds) {
          messages.push(rMessages[rIndex])
          rIndex++
        } else if (rMessages[rIndex].data.timestamp.nanoseconds < sMessages[sIndex].data.timestamp.nanoseconds) {
          messages.push(sMessages[sIndex])
          sIndex++
        } else if (rMessages[rIndex].data.timestamp.nanoseconds > sMessages[sIndex].data.timestamp.nanoseconds) {
          messages.push(rMessages[rIndex])
          rIndex++
        }
      }
      this.messageStore.addToMany(this.rID, messages.reverse())
      done(messages.length == 0)
    },
    getOldMessages(index, done) {
      const last = this.messageStore.getFirst(this.rID)?.data.timestamp
      this.getReceivedMessages(last).then((receivedMessages) => {
        this.getSendedMessages(last).then((sendedMessages) => {
          this.shortOldMessages(receivedMessages, sendedMessages, done)
        })
      })
    },
    sendMessage() {
      sendMessage(this.userStore.uID, this.rID, this.message).then(({ dID }) => {
        if (this.messages.length == 0) this.setMessageHistory(this.message)
        const m = { dID: dID, data: { rID: this.rID, message: this.message, timestamp: Timestamp.now() } }
        this.messageStore.addTo(this.rID, m)
        this.message = ""
      })
    }
  },
  computed: {
    messages() {
      if (!this.messageStore.lists[this.rID])
        return []
      return [...this.messageStore.lists[this.rID]].reverse()
    }
  },
  mounted() {
    this.setListener();

  },
  beforeUnmount() {
    if (this.msgListener)
      this.msgListener()
    this.updateMessageHistory()
  }
}
</script>