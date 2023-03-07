<template>
    <div class="full-width rounded shadow-3 row no-wrap q-pt-sm q-pb-sm q-px-sm">
        <q-avatar size="lg" class="q-mr-sm shadow-10">
            <img v-if="comment.data.photoURL" :src="comment.data.photoURL" />
            <q-icon v-else name="person" />
        </q-avatar>
        <div class="column justify-center overflow-hidden" style="flex-grow: 1;">
            <div class="full-width overflow-hidden" style="overflow-wrap: break-word;">
                {{ comment.data.comment }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["comment"]
}
</script>
<style scoped>
.rounded {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>