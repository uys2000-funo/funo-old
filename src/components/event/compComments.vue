<template>
    <div class="fit column no-wrap overflow-hidden">
        <q-infinite-scroll reverse class="fit  overflow-auto q-pa-sm" style="flex-grow: 1;" @load="onLoad" :offset="250">
            <div v-for="(cID, index) in comments" :key="index" class="caption">
                <comp-comment :comment="commentsStore.dict[cID]" />
            </div>
            <template v-slot:loading>
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                </div>
            </template>
        </q-infinite-scroll>
        <q-input :disable="isDisabled" rounded outlined v-model="comment" placeholder="Yorum Yap">
            <template v-slot:append>
                <q-btn flat dense round @click="sendComment">
                    <q-icon size="sm" name="send" :color="`${!isDisabled ? 'primary' : ''}`" />
                </q-btn>
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
import compComment from './compComment.vue';

export default {
    components: { compComment },
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
            getComments(this.$route.params.eID, this.commentsStore.getLast(this.$route.params.eID)?.data.timestamp)
                .then(docs => {
                    this.commentsStore.addToMany(this.$route.params.eID, docs)
                    done(docs.length == 0)
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
    },
    computed: {
        comments() {
            if (this.commentsStore.lists[this.$route.params.eID])
                return [...this.commentsStore.lists[this.$route.params.eID]].reverse()
            else return []
        }
    },
    mounted() {
        this.setListener()
    },
    beforeUnmount() {
        this.unmountListener()
    }
}
</script>