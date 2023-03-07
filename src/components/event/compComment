<template>
  <div>
    @{{ comment.uName }} : {{ comment.text }}
    <span
      class="float-right text-rex"
      v-if="user.ID == comment.uID"
      @click="remComment"
    >
      X
    </span>
  </div>
</template>
<script>
import { user } from "@/store/user";
import { comments } from "@/store/comments";
import { remComment } from "@/services/firebase/comments";
export default {
  props: ["comment"],
  data() {
    return {
      user: user(),
      comments: comments(),
    };
  },
  methods: {
    remComment: function () {
      remComment(this.$route.params.id, this.comment).then(() =>
        this.comments.remComment(this.$route.params.id, this.comment)
      );
    },
  },
};
</script>
<style scoped>
div {
  background: rgba(245, 247, 251, 0.01);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 20px;
}
</style>
