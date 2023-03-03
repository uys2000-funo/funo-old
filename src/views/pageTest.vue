<template>
    <div>
        testPage
    </div>
</template>

<script>
import { p, f } from "@/services/debug"
export default {
    mounted() {
        setTimeout(() => {
            console.log("---------")
            f(p, ["result", true]).catch()
        }, 2000)
    }
}
</script>