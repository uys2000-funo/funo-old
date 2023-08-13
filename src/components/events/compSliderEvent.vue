<template>
    <div class="relative-position" style="width: 224px; border: 1px solid #E8E8E8; border-radius: 8px;">
        <div>
            <q-img class="q-mb-xs popularEventImage" :src="data.photoURL" style="width:224px; height:120px">
                <div class="absolute-top-left text-center" style="padding: 5px; background: none; line-height: 15px;">
                    Kategori
                </div>
                <q-btn flat dense class="absolute-top-right row items-center justify-center"
                    style="padding: 5px; background: white; border-radius: 50%;">
                    <q-icon size="24px">
                        <icon-like />
                    </q-icon>
                </q-btn>
            </q-img>
        </div>
        <div>
            <div style="margin: 0px 8px; margin-top: 8px;">
                <q-icon size="18px">
                    <icon-person />
                </q-icon>
                <span style="font-size: 10px; font-weight: 600; color: #5A5A5A; line-height: 12px;">
                    Sarıyer Belediyesi
                </span>
                <q-icon size="18px">
                    <icon-success />
                </q-icon>
            </div>
            <div style="margin: 0px 8px; margin-top: 8px;">
                <div>
                    <span style="font-size: 12px; font-weight: 600; color: #AF0909; line-height: 15px;">
                        15 Haziran, Cuma, 17:30 - 19:00
                    </span>
                </div>
                <div>
                    <span style="font-size: 14px; font-weight: 600; color: #000; line-height: 17px;">
                        Yedi Cüceler Tiyatrosu
                    </span>
                </div>
            </div>
            <div style="margin: 8px; margin-bottom: 16px;">
                <q-icon size="20px">
                    <icon-location style="fill:#5A5A5A" />
                </q-icon>
                <span style=" font-size: 10px; font-weight: 600; color: #5A5A5A; line-height: 12px;">
                    Sarıyer Kültür Tiyatrosu
                </span>
            </div>
        </div>
        <div class="absolute-bottom-right" style="margin-right: 10px; margin-bottom: 10px;">
            <span class="text-primary" style="font-size: 13px; font-weight: 600; line-height: 16px;">
                ₺ 150
            </span>
        </div>
    </div>
</template>
<script>
import iconPerson from '@/icons/general/iconPerson.vue';
import iconSuccess from '@/icons/events/iconSuccess.vue';
import iconLike from '@/icons/events/iconLike.vue';
import iconLocation from '@/icons/create/iconLocation.vue';

export default {
    props: ["eID", "data"],
    components: { iconLike, iconPerson, iconSuccess, iconLocation }
}
</script>
<style scoped>
.popularEventImage {
    width: 45vw;
    height: 30vw;
    flex-shrink: 0;
    border-radius: 10px;
}
</style>