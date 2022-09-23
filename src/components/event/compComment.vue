<template>
  <div>@{{ comment.uName }} : {{ comment.text }}</div>
</template>
<script>
export default {
  props: ["comment"],
};
</script>
<style scoped>
div {
  background: rgba(245, 247, 251, 0.01);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 20px;
}
</style>
