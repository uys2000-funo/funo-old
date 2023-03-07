<template>
    <div class="fit column no-wrap">
        <q-infinite-scroll class="fit" @load="onLoad" :offset="250">
            <div v-for="(item, index) in commentsStore.lists[$route.params.eID]" :key="index" class="caption">
                {{ item }}
            </div>
            <template v-slot:loading>
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                </div>
            </template>
        </q-infinite-scroll>
        <q-input :disable="isDisabled" rounded outlined v-model="comment" placeholder="Yorum Yap">
            <template v-slot:append>
                <q-btn flat dense round icon="send" @click="sendComment" />
            </template>
        </q-input>
    </div>
</template>

<script>
import { watchComments } from '@/services/app/comment';
import { addComment } from '@/services/app/comment';
import { getComments } from '@/services/app/comment';
import { useComments } from '@/store/comment';
import { useEvent } from '@/store/event';
import { useUser } from '@/store/user';

export default {
    data() {
        return {
            commentsStore: useComments(),
            eventStore: useEvent(),
            userStore: useUser(),
            isDisabled: false,
            listener: null,
            comment: "",
        }
    },
    methods: {
        setListener() {
            watchComments(this.$route.params.eID,
                (doc) => this.commentsStore.addTo(this.$route.params.eID, doc),
                (doc) => this.commentsStore.removeFrom(this.$route.params.eID, doc)
            )
        },
        unmountListener() {
            if (this.listener) this.listener();
        },
        onLoad(index, done) {
            getComments(this.$route.params.eID)
                .then(res => {
                    this.commentsStore.addToMany(this.$route.params.eID, res)
                    done(res.length == 0)
                })
        },
        sendComment() {
            this.isDisabled = true
            addComment(
                this.userStore.uID,
                this.eventStore.event.data.owner.uID,
                this.$route.params.eID,
                this.userStore.photoURL,
                this.comment).then(() => {
                    this.isDisabled = false
                })
        }
    }
}
</script>