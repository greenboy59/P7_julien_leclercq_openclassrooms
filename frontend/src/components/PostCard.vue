<template>
  <div class="card">
    <form action=""
     method="put" 
     enctype="multipart/form-data"
      @submit.prevent="onSubmit"
    >
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
      <div v-if="post.image" id="post-image-wrapper"  @click="modifyImage(post._id)">
        <img
         v-if="!image"
          :src="post.image"
          :alt="post.image"
          class="post-picture"
        />
         <FilePreview @upload="setImage" @reload-image="reloadImage" />
      </div>
      <div v-if="user.userId === post.userId" class="posts-options">
        <button :disabled="!image" class="button modify-button" @click="modifyPost(post._id)">
          <i class="fas fa-edit modify"></i>
          valider les modifications
        </button>
        <button class="button delete-button" @click="deletePost(post._id)">
          <i class="fas fa-trash-alt delete"></i>
          supprimer le post
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
      image: "",
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

     reloadImage() {
      this.image = "";
    },

     async deletePost(id) {
       const axiosConfig = { headers: { Authorization: `Bearer ${this.user.token}` } };
      try {
        await this.axios.delete("/posts/" + id, axiosConfig,);
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },

    async modifyPost(id) {
      const formData = new FormData()
      formData.append("image", this.image)
      formData.append("description", this.post.description)
      try {
        await this.axios.put("/posts/" + id, formData, {
           headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.token}`,
          },
        })
        await this.$router.replace("/all-posts");
      }catch (err) {
        console.log(err);
      }
    },
  }
};
</script>

<style scoped>
.modify-button, .delete-button {
  width: 50%;
  font-size: 12px;
  margin: 0 5px;
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
  margin-right: 15px;
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
  cursor: pointer;
  position: relative;
}
.form-row__input {
  margin-bottom: 15px;
}
</style>
