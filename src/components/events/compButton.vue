<template>
  <q-btn no-cap class="q-mx-xs shadow-1" :class="{ 'bg-primary': state, 'text-white': state }" rounded
    @click="updateTags">
    <div class="row no-wrap">
      <q-icon>
        <slot />
      </q-icon>
      <span class="q-ml-sm"> {{ text }} </span>
    </div>
  </q-btn>
</template>
<script>
import { useEvents } from '@/store/event'

export default {
  props: ["text", "value"],
  data() {
    return {
      state: false,
      eventsStore: useEvents(),
    }
  },
  methods: {
    updateTags() {
      if (!this.state) this.eventsStore.tags.push(this.value)
      else this.eventsStore.tags = this.eventsStore.tags.filter(tag => tag != this.value)
      this.state = !this.state
    }
  }
}

</script>