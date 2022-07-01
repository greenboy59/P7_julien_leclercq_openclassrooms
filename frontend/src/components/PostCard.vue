<template>
  <div class="card">
    <form action="" method="put">
      <div class="post-header">
        <img
          :src="post.userImage"
          :alt="post.userImage"
          class="profile-picture"
        />
        <div class="post-subtitle">
          <h4>{{ post.userName }}</h4>
          <div class="post-date">posté le {{ post.date }}</div>
        </div>
      </div>
      <textarea
        v-model="post.description"
        class="form-row__input"
        name="post-text"
        cols="30"
        rows="10"
        minlength="1"
        maxlength="1500"
      >
      </textarea>
      <div id="post-image-wrapper">
        <img
          v-if="!this.image"
          :src="post.image"
          :alt="post.image"
          class="post-picture"
          @click="deleteImage"
        />
      </div>

      <FilePreview @upload="setImage" />

      <div v-if="user.userId === post.userId" class="posts-options">
        <button class="button" @click="modifyPost(post._id)">
          <i class="fas fa-edit modify"></i>
          valider la modification
        </button>
        <button class="button" @click="deletePost(post._id)">
          <i class="fas fa-trash-alt delete"></i>
          supprimer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";
import FilePreview from "@/components/FilePreview";

export default {
  name: "PostCard",
  components: { FilePreview },

  data() {
    return {
      user: UserClass.user,
      post: "",
      id: this.$route.params.id,
      image: null,
    };
  },

  beforeMount() {
    this.getPost();
  },

  methods: {
    async getPost() {
      const { data } = await this.axios.get(`/posts/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      this.post = data;
    },

    // Récupération de l'image
    setImage(payload) {
      this.image = payload;
    },

    deleteImage() {
      this.$refs.fileInput.value = null;
      document.querySelector(".imagePreviewWrapper").style.display = "none";
    },
  },
};
</script>

<style scoped>
.post-header {
  display: flex;
  align-items: center;
}
.post-date {
  color: #aaa;
}
post-subtitle {
  flex-direction: column;
}
.profile-picture {
  display: inline-block;
  width: 50px;
  height: 50px;
  clip-path: circle(50%);
  margin: 0 15px 15px 0;
  object-fit: cover;
  object-position: top;
}
.post-picture {
  margin: 0 auto;
  width: 100%;
  height: 250px;
  cursor: pointer;
}
#post-image-wrapper {
  position: relative;
  cursor: pointer;
}
#post-image-wrapper::after {
  content: "\f2ed";
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Font Awesome 5 Free";
  font-size: 3em;
  color: rgb(204, 32, 32);
  background: rgba(255, 255, 255, 0.6);
}
#post-image-wrapper:hover::after {
  opacity: 1;
}
.button {
  width: fit-content;
  height: 50px;
  font-size: 12px;
  margin: 5px 5px 0 0;
}
</style>
