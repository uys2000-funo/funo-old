<template>
    <comp-inner-sticky :target="2">
        <comp-popular />
        <div class="full-width">
            <comp-filter />
        </div>
        <comp-flow />
    </comp-inner-sticky>
</template>
<script>
import compInnerSticky from '@/components/general/compInnerSticky.vue';
import compPopular from '@/components/events/compPopular.vue';
import compFilter from '@/components/events/compFilter.vue';
import compFlow from '@/components/events/compFlow.vue';
export default {
    components: { compInnerSticky, compPopular, compFilter, compFlow }
}

</script>