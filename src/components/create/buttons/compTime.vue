<template>
    <q-input outlined :model-value="value" @update:model-value="setValue" mask="##:##">
        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer" color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time :model-value="value" @update:model-value="setValue" format24h>
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>
<script>
export default {
    props: ["value", "setValue"]
}
</script>