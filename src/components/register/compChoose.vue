<template>
    <div class="fit row no-wrap text-h5 t">
        <div class="full-width column justify-center content-center r"
            :class="{ 'bg-primary': userStore.user.account.isPerson, 'text-secondary': userStore.user.account.isPerson }"
            @click="setPersonnel">
            Bireysel
        </div>
        <div class="full-width column justify-center content-center r"
            :class="{ 'bg-primary': !userStore.user.account.isPerson, 'text-secondary': !userStore.user.account.isPerson }"
            @click="setCompany">
            İşletme
        </div>
    </div>
</template>
<script>
import { useUserRegister } from '@/store/user';
export default {
    props: ["pageNumber", "setPageNumber"],
    data() {
        return {
            userStore: useUserRegister()
        }
    },
    methods: {
        goNextPage() {
            setTimeout(() => {
                if (this.setPageNumber)
                    this.setPageNumber(1);
            }, 200)
        },
        setPersonnel() {
            this.userStore.user.account.isPerson = true
            this.$router.replace("/register/personnel")
            this.goNextPage()
        },
        setCompany() {
            this.userStore.user.account.isPerson = false
            this.$router.replace("/register/company")
            this.goNextPage()
        },
    },
    mounted() {
    }
}
</script>
<style scoped>
.r {
    border-radius: 20px;
}
</style>