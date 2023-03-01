<template>
    <div class="flex full-height overflow-auto" ref="parent" @scroll="onscroll">
        <slot />
    </div>
</template>
<script>
export default {
    props: ["target"],
    data() {
        return {
            height: 0
        }
    },
    methods: {
        getHeight() {
            const parent = this.$refs.parent
            for (let index = 0; index < this.target; index++) {
                if (parent.childNodes[index].clientHeight)
                    this.height += parent.childNodes[index].clientHeight
            }
        },
        setStickFilter() {
            const target = this.$refs.parent.childNodes[this.target]
            const inner = this.$refs.parent.childNodes[this.target].childNodes[0]
            target.style.setProperty("height", `${inner.clientHeight}px`)
            target.style.setProperty("z-index", 100)
        },
        onscroll(value) {
            const parent = value.srcElement
            const scrollTop = parent.scrollTop;
            const target = parent.childNodes[this.target].childNodes[0]
            if (scrollTop > this.height) target.classList.add('sticky');
            else target.classList.remove('sticky');
            target.style.setProperty("top", `${value.srcElement.offsetTop}px`)

        }
    },
    mounted() {
        this.getHeight()
        this.setStickFilter();
    },
}
</script>