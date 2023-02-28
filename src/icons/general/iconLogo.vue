<template>
    <svg width="156" height="156" viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M156 123L96 138.588V107.412L156 123Z" :fill="logoColor ?? '#FF7F55'" />
        <circle cx="78" cy="78" r="48" :stroke="logoColor ?? '#FF7F00'" stroke-width="30" />
    </svg>
</template>
<script>
export default {
    props: ["logoColor"]
}
</script>