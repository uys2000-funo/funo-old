<template>
    <div class="q-px-xs">
        <div class="row no-wrap justify-between">
            <q-btn flat dense no-caps class="row no-wrap items-center">
                <q-avatar size="md" class="shadow-2 q-mr-sm">
                    <img :src="event.owner?.photoURL" alt="">
                </q-avatar>
                <span>
                    {{ event.owner?.nickName }}
                </span>
            </q-btn>
            <div flat dense no-caps class="row no-wrap items-center justify-end">
                <span>
                    {{ event.general?.name }}
                </span>
                <q-btn flat dense no-caps round class="q-ml-sm" @click="openSettings">
                    <q-avatar size="md">
                        <q-icon round :name="icon"></q-icon>
                    </q-avatar>
                </q-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["event", "openSettings", "icon"]
}
</script>