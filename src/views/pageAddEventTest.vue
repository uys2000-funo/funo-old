<template>
  <div class="f">
    <q-input v-model="eObj.name" label="Etkinlik Adı" />
    <q-input v-model="eObj.desc" label="Etkinlik Açıklama" />
    <div>
      <h6>Etiketler</h6>
      <div>
        <q-checkbox
          v-model="eObj.tags.spor"
          :label="eObj.tags.spor + ' Spor'"
          color="teal"
        />
        <q-checkbox
          v-model="eObj.tags.artt"
          :label="eObj.tags.artt + ' Sanat'"
          color="teal"
        />
        <q-checkbox
          v-model="eObj.tags.educ"
          :label="eObj.tags.educ + ' Eğitim'"
          color="teal"
        />
        <q-checkbox
          v-model="eObj.tags.musi"
          :label="eObj.tags.musi + ' Müzik'"
          color="teal"
        />
        <q-checkbox
          v-model="eObj.tags.meet"
          :label="eObj.tags.meet + ' Buluşma'"
          color="teal"
        />
        <q-checkbox
          v-model="eObj.tags.part"
          :label="eObj.tags.part + ' Parti'"
          color="teal"
        />
      </div>
    </div>
    <div>
      <h6>Başlangıç Zamanı</h6>
      <h6>{{ this.eObj.startDate.date }} - {{ this.eObj.startDate.time }}</h6>
      <div>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="startDate">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="startDate" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div>
      <h6>Bitiş</h6>
      <h6>{{ this.eObj.endDate.date }} - {{ this.eObj.endDate.time }}</h6>
      <div>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="endDate">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="endDate" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div>
      <h6>Fiyat</h6>
      <div>
        <q-input v-model="eObj.price" label="Fiyat" />
      </div>
    </div>
    <div>
      <h6>Katılımcı Limiti</h6>
      <div>
        <q-toggle
          v-model="limit"
          color="green"
          label="Katılmcı limiti"
          left-label
        />
        <q-input v-model="iLimit" :disable="!limit" label="Limit" />
      </div>
    </div>
    <div>
      <h6>ÖnOnay</h6>
      <div>
        <q-toggle v-model="eObj.apro" color="green" label="ÖnOnay" left-label />
      </div>
    </div>
    <div>
      <h6>Etkinlik Türü</h6>
      <div>
        <q-toggle
          v-model="eObj.type"
          color="green"
          label="Etkinlik Türü"
          left-label
        />
      </div>
      <div>
        <q-input v-model="eObj.app" label="Konum / Platfom" />
        <q-input v-model="eObj.url" label="Tarif / Url" />
      </div>
    </div>
    <div>
      <h6>Etkinlik Fotoğrafı</h6>
      <div>
        <q-file v-model="imgs" accept="image/*" multiple label="Standard" />
      </div>
    </div>
    <q-btn label="Etkinliği ekle" @click="addEventFunction" />
  </div>
</template>

<script>
import { addEventFunction } from "../services/firebase/main";
import { user } from "@/storages/user";
export default {
  data() {
    return {
      user: user(),
      imgs: [],
      limit: false,
      eObj: {
        name: "",
        desc: "",
        tags: {
          spor: false,
          artt: false,
          educ: false,
          musi: false,
          meet: false,
          part: false,
        },
        startDate: {
          date: "",
          time: "",
        },
        endDate: {
          date: "",
          time: "",
        },
        limit: 0,
        apro: false,
        type: false,
        app: "",
        url: "",
        price: 0,
      },
    };
  },
  methods: {
    addEventFunction: function () {
      const uID = this.user.ID;
      const uName = this.user.name;
      if (!this.limit) this.eObj.limit = 0;
      addEventFunction(uID, this.eObj, this.imgs, uName);
    },
  },
  computed: {
    startDate: {
      get() {
        return this.eObj.startDate.date + " " + this.eObj.startDate.time;
      },
      set(newValue) {
        [this.eObj.startDate.date, this.eObj.startDate.time] =
          newValue.split(" ");
      },
    },
    endDate: {
      get() {
        return this.eObj.endDate.date + " " + this.eObj.endDate.time;
      },
      set(newValue) {
        [this.eObj.endDate.date, this.eObj.endDate.time] = newValue.split(" ");
      },
    },
    iLimit: {
      get() {
        return this.limit ? this.eObj.limit : 0;
      },
      set(newValue) {
        this.eObj.limit = newValue;
      },
    },
  },
};
</script>

<style scoped>
.f {
  height: 100vh;
  overflow: auto;
}
</style>
