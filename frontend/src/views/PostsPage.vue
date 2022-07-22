<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <PostsList
      :posts="posts"
      @post-deleted="onDeleted"
      @post-liked="updatePostLikes"
    />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import PostsList from "@/components/PostsList";
import CreatePost from "@/components/CreatePost";

export default {
  name: "PostsPage",
  components: { PostsList, CreatePost, MainNav },
  data() {
    return {
      posts: [],
      showModal: false,
    };
  },

  async beforeMount() {
    const { data } = await this.axios.get("/posts");
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
        (post) => post._id === updatedPost._id
      );
      postToUpdate.usersWhoLiked = updatedPost.usersWhoLiked;
      postToUpdate.usersWhoDisliked = updatedPost.usersWhoDisliked;
    },
  },
};
</script>
