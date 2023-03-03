<template>
    <div class="fit" @click="goBack">
        Help Text
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