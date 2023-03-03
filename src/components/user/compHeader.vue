<template>
    <div class="full-width row justify-around no-wrap text-h6 q-pt-md">
        <div class="w text-center">
            <div class="text-bold">
                {{ user.user.userFire.counters.point }}
            </div>
            <div>
                Puan
            </div>
        </div>
        <div class="w text-center">
            <div class="text-bold">
                {{ user.user.userFire.counters.followedUser }}
            </div>
            <div>
                Takip
            </div>
        </div>
        <div class="w text-center">
            <div class="text-bold">
                {{ user.user.userFire.counters.followerUser }}
            </div>
            <div>
                Takipçi
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['user']
}
</script>
<style>
.w {
    width: 33%;
}
</style>