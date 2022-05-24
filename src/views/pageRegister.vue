<template>
  <div class="column fit no-wrap justify-around items-center content-center">
    <p class="col-4 column no-wrap justify-around items-center content-center">
      Please Choose Your user Type
    </p>
    <div class="col-8">
      <div>
        <q-btn to="/register/p" @click="setPage(-1)">
          <div class="btnText">Bireysel</div>
        </q-btn>
      </div>
      <div>
        <q-btn to="/register/c" @click="setPage(1)">
          <div class="btnText">İşletme</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["setPage"],
};
</script>
<style scoped>
p {
  font-size: 3vh;
}
.q-btn {
  width: 70vw;
  height: 7vh;
  margin: 1vh;
  background: #ff7f00;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.btnText {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  font-size: 2vh;
  line-height: 100%;

  color: #ffffff;
}
</style>
