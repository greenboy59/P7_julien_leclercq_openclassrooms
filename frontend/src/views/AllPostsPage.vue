<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <!-- //TODO ajouter un refresh selon les like avec  @post-liked="onLiked" -->
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
    },
    // onLiked(userLiked) {
    //   const postToLikedIndex = this.posts.findIndex(post => post._id === userLiked.postId)
    //   const userId = userLiked.userId
    //   // On ajoute le user id dans le usersLiked correspondant au post liké
    //   this.posts[postToLikedIndex].usersLiked.push(userId)
    // }
  }
};
</script>
