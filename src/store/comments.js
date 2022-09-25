import { defineStore } from "pinia";

export const comments = defineStore("comments", {
  state: () => ({
    comments: {},
  }),
  actions: {
    setComments(id, comments) {
      this.comments[id] = comments;
    },
    addComment(id, comment) {
      if (this.comments[id]) this.comments[id].push(comment);
      else this.comments[id] = [comment];
    },
    remComment(id, comment) {
      this.comments[id] = this.comments[id].filter((val) => val != comment);
    },
    getComments(id) {
      return this.comments[id];
    },
  },
  getters: {},
});