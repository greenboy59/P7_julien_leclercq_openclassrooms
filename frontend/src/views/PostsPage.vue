<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <PostsList :posts="posts" @post-deleted="onDeleted" @post-liked="updatePostLikes" />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import PostsList from "@/components/PostsList";
import CreatePost from "@/components/CreatePost";
import UserClass from "@/classes/UserClass";

export default {
  name: "PostsPage",
  components: { PostsList, CreatePost, MainNav },
  data() {
    return {
      posts: [],
      user: UserClass.user,
      showModal: false,
    };
  },

  async beforeMount() {
    const axiosConfig = { headers: { Authorization: `Bearer ${this.user.token}` } };
    const { data } = await this.axios.get("/posts", axiosConfig);
    this.posts = data;
  },

  methods: {
    onCreated(post) {
      // Méthode unshift utilisée afin d'ajouter le post en début de tableau pour l'afficher en haut sur le mur des posts
      this.posts.unshift(post);
    },

    onDeleted(id) {
      const postToDeleteIndex = this.posts.findIndex((post) => post._id === id);
      this.posts.splice(postToDeleteIndex, 1);
    },

    updatePostLikes(updatedPost) {
      const postToUpdate = this.posts.find(
        (post) => post._id === updatedPost._id,
      );
      postToUpdate.usersWhoLiked = updatedPost.usersWhoLiked;
      postToUpdate.usersWhoDisliked = updatedPost.usersWhoDisliked;
    },
  },
};
</script>

<style scoped>
.modal-button-validate,
.modal-button-cancel {
  width: fit-content;
  margin: 5px;
}
</style>
