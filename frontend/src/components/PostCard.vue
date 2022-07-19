<template>
  <div class="card">
    <form
      action=""
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
      <span>
        <br />
        Cliquez sur l'image pour la modifier</span
      >
      <div v-if="post.image" id="post-image-wrapper">
        <img
          v-if="!image"
          :src="post.image"
          :alt="post.image"
          class="post-picture"
        />

        <FilePreview @upload="setImage" @reload-image="reloadImage" />
      </div>
      <div v-if="user.userId === post.userId || isAdmin" class="post-options">
        <button class="button modify-button" @click="modifyPost(post._id)">
          <i class="fas fa-edit modify"></i>
          valider
        </button>
        <button
          class="button delete-button"
          @click="showModalDeletePost(post._id)"
        >
          <i class="fas fa-trash-alt delete"></i>
          supprimer le post
        </button>

        <ModalWindow v-show="showModal" @close="showModal = false">
          <template #title>
            <h3>Voulez-vous vraiment supprimer ce post ?</h3>
          </template>
          <template #actions>
            <div class="modal-actions-buttons">
              <button
                class="button modal-button-validate"
                @click="deletePost(post._id)"
              >
                Valider
              </button>
              <button
                class="button modal-button-cancel"
                @click="showModal = false"
              >
                Annuler
              </button>
            </div>
          </template>
        </ModalWindow>
      </div>
    </form>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";
import FilePreview from "@/components/FilePreview";
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "PostCard",
  components: { FilePreview, ModalWindow },

  data() {
    return {
      user: UserClass.user,
      isAdmin: UserClass.isAdmin,
      post: "",
      id: this.$route.params.id,
      image: "",
      showModal: false,
      postToDelete: null,
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

    showModalDeletePost(postId) {
      (this.postToDelete = postId), (this.showModal = true);
    },

    async deletePost() {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      try {
        await this.axios.delete("/posts/" + this.postToDelete, axiosConfig);
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },

    async modifyPost(id) {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("description", this.post.description);
      try {
        await this.axios.put("/posts/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
span {
  text-align: center;
  display: block;
  color: #fd2d01;
}

.post-options {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
}

.modify-button,
.delete-button {
  width: 50%;
  font-size: 12px;
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
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 210px;
  cursor: pointer;
}

#post-image-wrapper {
  cursor: pointer;
  position: relative;
}

.form-row__input {
  margin-bottom: 15px;
}

.modal-actions-buttons {
  display: flex;
}

.modal-button-cancel,
.modal-button-validate {
  margin: 30px 15px 0 15px;
  width: 50%;
}

@media (max-width: 540px) {
  .card {
    margin-top: 10%;
    margin-bottom: 60px;
  }
}
</style>
