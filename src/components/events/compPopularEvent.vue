<template>
    <q-img class="q-mx-sm shadow-3 popularEventImage" :src="data.photoURL">
        <div class="absolute-bottom text-caption text-center" style="padding: 5px;">
            {{ data.name }}
        </div>
    </q-img>
</template>
<script>
export default {
    props: ["eID", "data"]
}
</script>
<style scoped>
.popularEventImage {
    width: 45vw;
    height: 30vw;
    flex-shrink: 0;
    border-radius: 10px;
}
</style>