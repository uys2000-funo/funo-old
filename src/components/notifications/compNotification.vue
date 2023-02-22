<template>
    <div class="row no-wrap justify-between">
        <div>
            <img :src="src" alt="Notification Image">
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
export default {
    props: ["src", "type", "text"],
    data() {
        return {

        }
    }
}
</script>