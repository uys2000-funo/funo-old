<template>
    <div>
        <q-carousel :model-value="page" transition-prev="scale" transition-next="scale" swipeable animated
            control-color="white" navigation padding arrows height="300px" class="bg-secondary"
            style="border-radius: 50px;">
            <q-carousel-slide name="notifications" class="column no-wrap flex-center">
                <q-infinite-scroll @load="onLoad" :offset="250">
                    <div v-for="(item, index) in items" :key="index" class="caption">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                            eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut,
                            natus minima, porro labore.</p>
                    </div>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-carousel-slide>
            <q-carousel-slide name="announcement" class="column no-wrap flex-center">
                <div class="q-mt-md text-center">
                    asd
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="notification" class="column no-wrap flex-center">
                <div class="q-mt-md text-center">
                    ads
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>
<script>
export default {
    props: ["page"],
    data() {
        return {
            notifications: []
        }
    },
    methods: {
        onload() {

        }
    }
}
</script>