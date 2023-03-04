<template>
    <q-btn no-caps round :style="style" @click="clickEvent" class="t shadow-3">
        <div class="text-center">
            {{ text }}
        </div>
    </q-btn>
</template>
<script>
import { useEvent } from '@/store/event.js';

export default {
    props: ["value", "text", "bg", "color"],
    data() {
        return {
            eventStore: useEvent(),
            state: false
        }
    },
    methods: {
        clickEvent() {
            if (!this.state) this.eventStore.event.tags.main.push(this.value)
            else this.eventStore.event.tags.main = this.eventStore.event.tags.main.filter(i => i != this.value)
            this.state = !this.state;
        },
        checkTag() {
            if (this.eventStore.event.tags.main.includes(this.value))
                this.state = true;
        }
    },
    mounted() {
        this.checkTag()
    },
    computed: {
        style() {
            const bg = `background-color: ${this.bg};`
            const text = `color: ${this.color};`
            const text2 = `color: ${this.bg};`
            return this.state ? bg + text : text2
        },
    },
    watch: {
        event() {
            console.log("--------------------")
        }
    }
}
</script>