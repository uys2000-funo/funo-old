<template>
    <q-btn no-caps round :style="style" @click="clickEvent" class="t">
        <div class="text-center">
            {{ text }}
        </div>
    </q-btn>
</template>
<script>
import { event } from '@/store/events';

export default {
    props: ["value", "text", "bg", "color"],
    data() {
        return {
            event: event(),
            state: false
        }
    },
    methods: {
        clickEvent() {
            if (!this.state) this.event.event.tags.main.push(this.value)
            else this.event.event.tags.main = this.event.event.tags.main.filter(i => i != this.value)
            this.state = !this.state;
        }
    },
    mounted() {
        if (this.event.event.tags.main.includes(this.value))
            this.state = true;
    },
    computed: {
        style() {
            const bg = `background-color: ${this.bg};`
            const text = `color: ${this.color};`
            const text2 = `color: ${this.bg};`
            return this.state ? bg + text : text2
        }
    }
}
</script>