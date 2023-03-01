<template>
  <q-btn no-cap class="q-mx-xs shadow-1" :class="{ 'bg-primary': state, 'text-white': state }" rounded @click="updateTags">
    <div class="row no-wrap">
      <q-icon>
        <slot />
      </q-icon>
      <span class="q-ml-sm"> {{ text }} </span>
    </div>
  </q-btn>
</template>
<script>
export default {
  props: ["text", "value"],
  inject: ["removeTag", "addTag"],
  data() {
    return {
      state: false
    }
  },
  methods: {
    updateTags() {
      if (this.state) this.removeTag(this.value)
      else this.addTag(this.value)
      this.state = !this.state
    }
  }
}

</script>