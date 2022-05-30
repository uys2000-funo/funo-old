<template>
  <q-avatar :size="sizeO">
    <q-icon :size="sizeI">
      <img :src="require(`@/assets/images/icons/${src}`)" alt="" />
    </q-icon>
  </q-avatar>
</template>
<script>
export default {
  props: ["src", "sizeO", "sizeI"],
};
</script>
