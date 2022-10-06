import { defineStore } from "pinia";

export const users = defineStore("users", {
  state: () => ({
    userDict: {},
    userList: [],
  }),
  actions: {
    addUsersWithList(users) {
        users.map((user) => {
          this.userDict[user.uID] = user;
          this.userList.push(user.uID);
        });
      },
  },
  getters: {},
});
