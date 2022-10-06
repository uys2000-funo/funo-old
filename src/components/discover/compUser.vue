<template>
  <div class="userComp" :style="`background-image: url('${require('@/assets/images/loading.gif')}'); ${userImage}`">
    <div>
      {{user.userName}}
    </div>
  </div>
</template>
<script>
import { getImgStorage } from '@/services/firebase/event';
export default {
  props: ["user"],
  data() {
    return {
      userImageUrl: "",

    }
  },
  computed: {
    userImage: function () {
      return `background-image: url("${this.userImageUrl}"); `;
    },
  },
  mounted() {
    getImgStorage(`U/${this.user.uID}/imgs/uImg`).then((res) => {
      this.userImageUrl = res;
    });
  },
}
</script>
<style scoped>
.userComp {
  position: relative;
  display: flex;
  width: 30vw;
  height: 30vw;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: auto;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.userComp>div {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 5vw;
  line-height: 100%;
  
  align-items: center;
  text-align: center;
  color: #FFFFFF;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(9, 43, 110, 0.295);
  margin: 0px;
  margin-top: auto;
  
  width: 100%;
  max-width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>