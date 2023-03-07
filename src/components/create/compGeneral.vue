<template>
    <div class="q-pb-md">
        <div class="full-width">
            <span class="text-h6">Etkinlik Adı</span>
            <div>
                <q-input v-model="eventStore.event.data.general.name" outlined placeholder="Etkinlik Adı" />
            </div>
        </div>
        <div class="full-width">
            <span class="text-h6">Açıklama</span>
            <div>
                <q-input v-model="eventStore.event.data.general.description" outlined type="textarea"
                    placeholder="Etkinlik hakkında detaylı bilgi girin" />
            </div>
        </div>
        <div class="full-width">
            <span class="text-h6">Etkinlik Kategorilerini</span>
            <div>
                <div class="row justify-around">
                    <comp-tag class="btn" bg="#e44" color="#222" value="art" text="Sanat" />
                    <comp-tag class="btn" bg="#4ee" color="#fff" value="education" text="Eğitim" />
                    <comp-tag class="btn" bg="#e4e" color="#222" value="meeting" text="Buluşma" />
                    <comp-tag class="btn" bg="#44e" color="#fff" value="music" text="Müzik" />
                    <comp-tag class="btn" bg="#4e4" color="#222" value="party" text="Parti" />
                    <comp-tag class="btn" bg="#444" color="#fff" value="sport" text="Spor" />
                </div>
            </div>
        </div>
        <div v-if="false">
            <span class="text-h6">Daha Fazla Kategori :)</span>
            <div class="row no-wrap">
                <div style="width: 50%">
                    <q-input v-model="tag" dense outlined prefix="#" placeholder="Kategori">
                        <template v-slot:append>
                            <q-btn flat>Ekle</q-btn>
                        </template>
                    </q-input>
                </div>
                <div style="width: 50%">

                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { useEvent } from "@/store/event.js";
import compTag from "@/components/create/buttons/compTag.vue";
export default {
    components: { compTag },
    props: ["pageNumber", "setPage"],
    data() {
        return {
            eventStore: useEvent(),
            tag: "",
        };
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(0);
    }
};
</script>
<style>
.btn {
    width: 14vw;
    height: 14vw;
}
</style>
  