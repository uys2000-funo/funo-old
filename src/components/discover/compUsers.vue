<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll @load="() => ''" :offset="0" v-if="userList.length != 0">
      <div class="row justify-around">
        <template v-for="uID in userList" :key="uID">
          <router-link :to="{
            path:uID == user.ID
                ? `/app/user/share`
                : `/app/profile/${uID}/share`,
          }">
            <comp-user v-if="userDict[uID]" :user="userDict[uID]" />
          </router-link>
        </template>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>
<script>
import { user } from "@/store/user";
import { users } from "@/store/users";
import compUser from "./compUser.vue";
import { getNewUsersNotHidden } from '@/services/core/user';
export default {
  components: { compUser },
  data() {
    return {
      user: user(),
      users: users(),
      userDict: users().userDict,
      userList: users().userList,
    };
  },
  methods: {
    getNewUsersNotHidden: getNewUsersNotHidden,
    addUsersWithList: users().addUsersWithList,
  },
  mounted() {
    if (this.userList.length == 0)
      this.getNewUsersNotHidden().then((res) =>
        this.addUsersWithList(res)
      );
  },
};
</script>
