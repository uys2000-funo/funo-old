<template>
    <q-input :model-value="value" @update:model-value="setValue" outlined mask="##.##.####">
        <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date :model-value="value" @update:model-value="setValue" mask="DD.MM.YYYY">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
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