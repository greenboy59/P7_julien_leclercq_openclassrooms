<template>
  <div>
    <MainNav />
    <CreatePost @post-created="onCreated" />
    <AllPostsList :posts="posts" @post-deleted="onDeleted" @post-liked="updatePostLikes" /> 
     <ModalWindow v-show="!isAuthenticated" @close="showModal = false">
            <template v-slot:title>Vous avez été déconnecté automatiquement</template>
            <template v-slot:validate><button class="button modal-button-validate" @click= "reconnection()">Se reconnecter</button></template>
            <template v-slot:cancel><button hidden></button></template>
    </ModalWindow> 
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import AllPostsList from "@/components/AllPostsList";
import CreatePost from "@/components/CreatePost";
import UserClass from "@/classes/UserClass";
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "AllPostsPage",
  components: { AllPostsList, CreatePost, MainNav, ModalWindow },
  data() {
    return {
      posts: [],
      user: UserClass.user,
      showModal: false,
      isAuthenticated: null,
    }
  },

  async beforeMount() {
    const axiosConfig = { headers: { Authorization: `Bearer ${this.user.token}` } };
    const { data } = await this.axios.get("/posts", axiosConfig,);
    this.posts = data;
    this.isAuthenticated = { Authorization: `Bearer ${this.user.token}` };
  },

  methods: {
    onCreated(post) {
      // Méthode unshift utilisée afin d'ajouter le post en début de tableau pour l'afficher en haut sur le mur des posts
      this.posts.unshift(post)
    },

    onDeleted(id) {
      const postToDeleteIndex = this.posts.findIndex(post => post._id === id);
      this.posts.splice(postToDeleteIndex, 1);
    },

    updatePostLikes(updatedPost) {
    const postToUpdate = this.posts.find(post => post._id === updatedPost._id)
      postToUpdate.usersLiked = updatedPost.usersLiked
      postToUpdate.usersDisliked = updatedPost.usersDisliked
    },

    reconnection () {
      localStorage.removeItem('user');
      this.showModal = false;
      this.$router.go();
    },
  }
};
</script>

<style scoped>
.modal-button-validate, .modal-button-cancel {
  width: fit-content;
  margin: 5px;
}

</style>