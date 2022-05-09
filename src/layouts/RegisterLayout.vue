<template>
  <div class="column no-wrap justify-center items-center content-center">
    <div class="col-4">
      <div class="reg">
        <img :src="require('@/assets/images/register.svg')" alt="image" />
      </div>
      <div class="bec">
        <q-btn round flat fab-mini @click="$router.go(-1)">
          <q-icon>
            <img
              :src="require('@/assets/images/icons/backArrow.svg')"
              alt="icon"
            />
          </q-icon>
        </q-btn>
      </div>
    </div>
    <div class="col-8">
      <div style="height:100%;">asd</div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.reg {
  margin: auto;
}
.bec {
  position: fixed;
  left: 2vw;
  top: 1vh;
}
</style>
