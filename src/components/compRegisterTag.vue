<template>
  <p>Kategorileri sıralayınız</p>
  <div class="sh">
    <img
      v-for="img in imgs"
      :src="require(`@/assets/images/register/${img}.svg`)"
      :key="img"
      @click="clickEvent"
      :alt="img"
    />
  </div>
</template>

<script>
export default {
  inject: ["updateImgs"],
  data() {
    return {
      imgs: ["part", "artt", "spor", "musi", "meet", "educ"],
    };
  },
  methods: {
    clickEvent: function (target) {
      this.updateImgs(target.target.alt);
    },
  },
};
</script>

<style scoped>
.sh {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10vw 0vh;
}
.sh img {
  width: 30%;
}
</style>
