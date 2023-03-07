<template>
    <div class="full-width row justify-around items-end align-center no-wrap text-h6 q-pt-md q-pb-xs">
        <div class="w text-center">
            <div class="text-bold">
                {{ user?.count.point }}
            </div>
            <div>
                Puan
            </div>
        </div>
        <div v-if="!this.$route.params.uID" class="w text-center">
            <div class="text-bold">
                {{ user?.count.followed }}
            </div>
            <div>
                Takip
            </div>
        </div>
        <q-btn v-else class="bg-primary" style="height: 50%; width: 40%;" dense @click="followButton">
            {{ !state ? "Takip Et" : "Takipten Çık" }}
        </q-btn>
        <div class="w text-center">
            <div class="text-bold">
                {{ user?.count.follower }}
            </div>
            <div>
                Takipçi
            </div>
        </div>
    </div>
</template>
<script>
import { followUser } from '@/services/app/user';
import { unfollowUser } from '@/services/app/user';
import { followedUser } from '@/services/app/user';
import { useUser } from '@/store/user';

export default {
    props: ["user"],
    inject: ["increaseFollwer", "decreaseFollwer"],
    data() {
        return {
            userStore: useUser(),
            state: false,
            dID: "",
        }
    },
    methods: {
        unfollowUser() {
            unfollowUser(this.userStore.uID, this.$route.params.uID, this.dID).then(() => {
                this.decreaseFollwer()
                this.state = false

            })
        },
        followUser() {
            followUser(this.userStore.uID, this.$route.params.uID).then(doc => {
                this.dID = doc.dID
                this.increaseFollwer()
                this.state = true
            })
        },
        followButton() {
            if (!this.state) this.followUser()
            else this.unfollowUser()
        }
    },
    mounted() {
        if (!this.$route.params.uID) this.count = this.userStore.user.userFire.count
        else {
            followedUser(this.userStore.uID, this.$route.params.uID).then(doc => {
                if (doc.length == 0) this.state = false
                else {
                    this.dID = doc[0].dID
                    this.state = doc[0].data.isFollowing
                }
            })
        }
    }
}
</script>
<style>
.w {
    width: 33%;
}
</style>