<template>
  <div>
    <div>
      <h6>Img</h6>
      <div>
        <q-file
          v-model="filesImages"
          label="Profil Img"
          accept=".jpg, image/*"
        />
      </div>
    </div>
    <div>
      <h6>person</h6>
      <div>
        <q-input v-model="pObj.name" label="Full Name" />
        <q-input v-model="pObj.birth" label="Birth" />
        <q-input v-model="pObj.gender" label="Gender" />
        <q-input v-model="pObj.nick" label="Nick" />
        <q-input v-model="pObj.phone" label="Phone" />
        <q-input v-model="pObj.mail" label="Mail" />
        <q-input v-model="pObj.pass" label="Password" />

        <q-btn style="width: 100%" label="Register Person" />
      </div>
    </div>
    <div>
      <h6>company</h6>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: null,
      pObj: {
        name: "",
        birth: "",
        gender: "",
        nick: "",
        phone: "",
        mail: "",
        pass: "",
      },
    };
  },
};
</script>
