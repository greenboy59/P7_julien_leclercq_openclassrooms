<template>
  <div class="card">
    <p>{{id}}</p>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";

export default {
  name: "PostCard",

  data() {
    return {
      user: UserClass.user,
      post: null,
      id: this.$route.params.id,
    };
  },

  beforeRouteEnter() {
    this.getPost();
  },

  methods: {
   async getPost() {
    },
  },
};
</script>
