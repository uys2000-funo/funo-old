<template>
    <div v-if="show" class="user-borders fit">
        <q-img :src="localUser.data.account.photoURL ? localUser.data.account.photoURL : require('@/assets/images/logo.svg')" v-ripple @click="openUserProfile">
            <div class="absolute-bottom text-center">{{ localUser.data.general.nickName }}</div>
        </q-img>
    </div>
</template>
<script>
import { getUserData } from '@/services/app/user';
import { useUsers } from '@/store/user';

export default {
    props: ["user", "uID", "route"],
    data() {
        return {
            usersStore: useUsers(),
            localUser: {},
            show: false
        }
    },
    methods: {
        openUserProfile() {
            const route = this.route ? this.route : "user";
            this.$router.push(`/app/${route}/${this.localUser.uID}`)
        },
        getUserdata() {
            getUserData(this.uID).then(userData => {
                this.usersStore.addData(this.uID, userData.data)
                this.localUser = {
                    data: userData.data,
                    uID: this.uID,
                }
                console.log(this.localUser)
                this.show = true
            })
        },
        loadUser() {
            if (this.user) {
                this.localUser = this.user;
                this.show = true;
            }
            else if (this.uID) this.getUserdata();
        }
    },
    mounted() {
        this.loadUser();
    }
}
</script>
<style scoped>
.user-borders {
    border-radius: 10px;
    overflow: hidden;
}
</style>