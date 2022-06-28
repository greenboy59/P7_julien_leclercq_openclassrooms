<template>
    <div class="card">
      <div class="post-header">
    </div>
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
    };
  },

 beforeRouteEnter () {
   this.getPost()
  },

  methods: {
     getPost() {
      this.post = this.$route.params.id
     console.log(this.post)
    }
  },
};
</script>
