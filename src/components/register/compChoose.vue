<template>
    <div class="fit row no-wrap text-h5 t">
        <div class="full-width column justify-center content-center r"
            :class="{ 'bg-primary': register.user.type, 'text-secondary': register.user.type }" @click="setPersonnel">
            Bireysel
        </div>
        <div class="full-width column justify-center content-center r"
            :class="{ 'bg-primary': !register.user.type, 'text-secondary': !register.user.type }" @click="setCompany">
            İşletme
        </div>
    </div>
</template>
<script>
import { register } from '@/store/register';
export default {
    props: ["pageNumber", "setPageNumber"],
    data() {
        return {
            register: register()
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
            this.register.user.type = true
            this.$router.push("/register/personnel")
            this.goNextPage()
        },
        setCompany() {
            this.register.user.type = false
            this.$router.push("/register/company")
            this.goNextPage()
        },
    },
    mounted() {
        if (this.page == 0 && this.setPageNumber) this.setPageNumber(0);
    }
}
</script>
<style scoped>
.r {
    border-radius: 20px;
}
</style>