<template>
  <div>
    <q-input
      v-model="comment"
      filled
      type="textarea"
      autogrow
      placeholder="..."
    />
    <div class="text-right">
      <q-btn flat label="Yorum Yap" @click="clickEvent" />
    </div>
    <div>
      <span class="text-h6 q-ml-md">Yorumlar</span>
    </div>
    <div class="q-pb-xl">
      <div v-if="!comments.getComments($route.params.id)">
        İlk yorum Yapan Olmak Ister Misin
      </div>
      <comp-comment
        v-for="comment in comments.getComments($route.params.id)"
        :key="comment"
        :comment="comment"
      />
    </div>
  </div>
</template>
<script>
import { addComment, getComment } from "@/services/firebase/comments";
import compComment from "./compComment.vue";
import { comments } from "@/store/comments";
import { user } from "@/store/user";
export default {
  components: { compComment },
  data() {
    return {
      comments: comments(),
      comment: "",
      user: user(),
    };
  },
  methods: {
    clickEvent: function () {
      if (this.comment) {
        const comment = {
          uID: this.user.ID,
          uName: this.user.userName,
          text: this.comment,
        };
        addComment(this.$route.params.id, comment);
        this.comments.addComment(this.$route.params.id, comment);
      }
    },
  },
  mounted() {
    getComment(this.$route.params.id).then((res) => {
      this.comments.setComments(this.$route.params.id, res.data().comments);
    });
  },
};
</script>
