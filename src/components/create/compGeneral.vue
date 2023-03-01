<template>
    <div class="q-pb-md">
        <div class="full-width">
            <span class="text-h6">Etkinlik Adı</span>
            <div>
                <q-input v-model="event.event.general.name" outlined placeholder="Etkinlik Adı" />
            </div>
        </div>
        <div class="full-width">
            <span class="text-h6">Açıklama</span>
            <div>
                <q-input v-model="event.event.general.description" outlined type="textarea"
                    placeholder="Etkinlik hakkında detaylı bilgi girin" />
            </div>
        </div>
        <div class="full-width">
            <span class="text-h6">Etkinlik Kategorilerini</span>
            <div>
                <div class="row justify-around">
                    <comp-button class="btn" bg="#e44" color="#222" value="art" text="Sanat" />
                    <comp-button class="btn" bg="#4ee" color="#fff" value="education" text="Eğitim" />
                    <comp-button class="btn" bg="#e4e" color="#222" value="meeting" text="Buluşma" />
                    <comp-button class="btn" bg="#44e" color="#fff" value="music" text="Müzik" />
                    <comp-button class="btn" bg="#4e4" color="#222" value="party" text="Parti" />
                    <comp-button class="btn" bg="#444" color="#fff" value="sport" text="Spor" />
                </div>
            </div>
        </div>
        <div v-if="false">
            Kendi Kategorin :)
        </div>
    </div>
</template>
<script>
import { event } from "@/store/events";
import compButton from "@/components/create/buttons/compTag.vue";
export default {
    components: { compButton },
    props: ["pageNumber", "setPage"],
    data() {
        return {
            event: event(),
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
  