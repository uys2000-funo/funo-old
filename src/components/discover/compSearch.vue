<template>
    <div class="fit">
        <div class="full-width q-px-md q-pt-sm">
            <q-input rounded outlined v-model="text" placeholder="Ara">
                <template v-slot:append>
                    <q-btn flat dense round icon="search" @click="searchText" />
                </template>
            </q-input>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: "",
            results: [],
        }
    },
    methods: {
        searchUser() {

        },
        searchEvent() {

        },
        searchText() {

        }
    },

}
</script>