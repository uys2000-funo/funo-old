<template>
  <div v-if="userPhotoURLs?.length == 0">
    İlk Olabilirsin :)
  </div>
  <template v-for="(item, index) in userPhotoURLs" :key="index">
    <q-avatar v-if="index < 3 || index > 7" size="md" style="margin-left: -10px;" class="shadow-7">
      <img :src="item" />
    </q-avatar>
  </template>
</template>
<script>
export default {
  props: { userPhotoURLs: Array },
  data() {
    return {};
  },
};
</script>

<style scoped>
div {
  display: inline;
}
</style>
