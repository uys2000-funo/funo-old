<template>
  <div class="relative fit column no-wrap ">
    <div class="full-width">
      <comp-header class="shadow-box"/>
    </div>
    <router-view />
  </div>
</template>
<script>
import compHeader from '@/components/events/compHeader.vue';
export default {
  components: { compHeader },
  data() {
    return {
      tags: []
    }
  },
  provide() {
    return {
      removeTag: (tag) => this.tags = this.tags.filter(t => t !== tag),
      addTag: (tag) => this.tags.push(tag),
    }
  }
}
</script>
<style>
.sticky {
  width: 100%;
  position: absolute;
  left: 0;
}
</style>