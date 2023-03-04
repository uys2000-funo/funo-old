<template>
    <div class="full-width row justify-around no-wrap text-h6 q-pt-md">
        <div class="w text-center">
            <div class="text-bold">
                {{ userStore.user.userFire.count.point }}
            </div>
            <div>
                Puan
            </div>
        </div>
        <div class="w text-center">
            <div class="text-bold">
                {{ userStore.user.userFire.count.followed }}
            </div>
            <div>
                Takip
            </div>
        </div>
        <div class="w text-center">
            <div class="text-bold">
                {{ userStore.user.userFire.count.follower }}
            </div>
            <div>
                Takipçi
            </div>
        </div>
    </div>
</template>
<script>
import { useUser } from '@/store/user';

export default {
    data() {
        return {
            userStore: useUser(),
        }
    },

}
</script>
<style>
.w {
    width: 33%;
}
</style>