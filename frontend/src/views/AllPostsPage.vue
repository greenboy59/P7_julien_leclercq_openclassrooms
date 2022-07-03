<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <AllPostsList :posts="posts" />
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
    }
  }
};
</script>
