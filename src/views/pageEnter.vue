<template>
  <div class="column no-wrap justify-center items-center content-center">
    <div class="col-1 column no-wrap justify-center items-center content-center">
      <p class="text-center">
        Find <b><span class="text-primary">events</span></b> your envirenmont
      </p>
    </div>
    <div class="col-6">
      <img :src="require('@/assets/images/en.svg')" alt="enterImage" />
    </div>
    <div class="col-2 column no-wrap justify-center items-center content-center">
      <p class="text-center">
        It is designed to inform you about events around you and to socialize
        you with users.
      </p>
    </div>
    <div class="col-2">
      <q-btn class="btn bg-primary" label="Contiune" to="login" />
    </div>
  </div>
</template>
<style scoped>
.btn {
  width: 60vw;
  height: 61px;
  border-radius: 45px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 3vh;
  line-height: 100%;

  color: #ffffff;
}

img {
  width: 100%;
  height: 100%;
}

p {
  font-size: 2vh;
  padding: 0 15vw;
}
</style>
