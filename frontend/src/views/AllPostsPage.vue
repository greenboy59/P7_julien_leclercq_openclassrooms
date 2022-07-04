<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <AllPostsList @post-deleted="onDeleted" :posts="posts" />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import AllPostsList from "@/components/AllPostsList";
import CreatePost from "@/components/CreatePost";
import UserClass from "@/classes/UserClass";

export default {
  name: "AllPostsPage",
  components: { AllPostsList, CreatePost, MainNav },
  data() {
    return {
      posts: [],
      user: UserClass.user
    }
  },

  async beforeMount() {
      const axiosConfig = { headers: { Authorization: `Bearer ${this.user.token}` }};
      const { data } = await this.axios.get("/posts", axiosConfig,);
      this.posts = data;
  },

  methods: {
    onCreated(post) {
      this.posts.push(post)
    },
    onDeleted(id) {
      const postToDeleteIndex = this.posts.findIndex(post => post._id === id);
      this.posts.splice(postToDeleteIndex, 1);
    }
  }
};
</script>
