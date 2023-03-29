<template>
    <slot v-if="!error" />
</template>
<script>
export default {
    name: 'ErrorBoundary',
    data: () => ({
        error: false
    }),
    errorCaptured() {
        this.error = true
    }
}
</script>