<template>
  <div>
    <span v-if="userIDs != undefined">
      <span v-if="userIDs.length == 0"> Kimse Yok </span>
      <span v-else-if="userIDs.length > 99"> 99+ Katılımcı </span>
      <span v-else> {{ userIDs.length }} Katılımcı </span>
    </span>
    <span v-else>İlk Ol</span>
  </div>
</template>
<script>
export default {
  props: { userIDs: Array },
  data() {
    return {};
  },
};
</script>

<style scoped>
div{
  display: inline;
}
</style>
