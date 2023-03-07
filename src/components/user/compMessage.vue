<template>
    <div class="fit">
        <comp-message :rID="user.uID" :rPhotoURL="user.account.photoURL" :rNickName="user.general.nickName"
            v-if="isReceivable" />
        <div v-else class="q-px-lg q-py-xl">
            <p>
                Kullanıcı Yeni Mesajları Engelliyor.
            </p>
            <p>
                Daha önce konuştuysanız, Mesajlar bölümünden konuşmaya devam edebilirsiniz.
            </p>
        </div>
    </div>
</template>
<script>
import compMessage from "@/components/general/compMessage.vue";
export default {
    components: { compMessage },
    props: ["user"],
    data() {
        return {
            isReceivable: false,
        }
    },
    mounted() {
        console.log(this.user)
        this.isReceivable = this.user.settings.isReceivable;
    },
};
</script>
  