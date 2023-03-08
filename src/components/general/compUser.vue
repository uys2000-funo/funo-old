<template>
    <div class="user-borders fit">
        <q-img :src="user.data.account.photoURL" v-ripple @click="openUserProfile">
            <div class="absolute-bottom text-center">{{ user.data.general.nickName }}</div>
        </q-img>
    </div>
</template>
<script>
export default {
    props: ["user", "route"],
    methods: {
        openUserProfile() {
            const route = this.route ? this.route : "user";
            this.$router.push(`/app/${route}/${this.user.uID}`)
        }
    }
}
</script>
<style scoped>
.user-borders {
    border-radius: 10px;
    overflow: hidden;
}
</style>