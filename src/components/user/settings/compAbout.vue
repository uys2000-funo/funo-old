<template>
    <div class="fit" @click="goBack">
        About Text
    </div>
</template>
<script>
export default {
    props: ["setPage"],
    methods: {
        goBack() {
            this.setPage("list")
        }
    }
}
</script>