<template>
  <div v-if="posts.length > 0" id="posts-container">
    <h2>Posts</h2>
    <span class="search-bar">
      <i class="fas fa-search"></i>
      <input
        type="text"
        placeholder="Rechercher par nom"
        v-model="inputFilter"
      />
    </span>
    <div class="error-message" v-if="inputFilter && !filteredPosts.length">
      <p>Aucun résultat trouvé !</p>
    </div>
    <div :key="post._id" v-for="post in filteredPosts" class="card">
      <div class="post-header">
        <img
          :src="post.userImage"
          alt="photo_de_profil"
          class="profile-picture"
        />
        <div class="post-subtitle">
          <h4>{{ post.userName }}</h4>
          <div class="post-date">le {{ post.date }}</div>
          <span class="total-likes-dislikes">
            <i class="fa-regular fa-thumbs-up"
              >&nbsp;<span>{{ post.usersWhoLiked.length }}</span></i
            >
            <i class="fa-regular fa-thumbs-down"
              >&nbsp;<span>{{ post.usersWhoDisliked.length }}</span></i
            >
          </span>
        </div>
      </div>
      <p>{{ post.description }}</p>
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.image"
        class="post-picture"
      />
      <div class="posts-options">
        <div class="like-dislike-buttons">
          <button
            :class="[
              'button',
              'like',
              post.usersWhoLiked.includes(user.userId) ? 'liked' : '',
            ]"
            @click="onClickLike(post._id)"
          >
            <i class="fa-regular fa-thumbs-up"></i>
            <template v-if="post.usersWhoLiked.includes(user.userId)"
              ><b>Liké !</b></template
            >
          </button>

          <button
            :class="[
              'button',
              'dislike',
              post.usersWhoDisliked.includes(user.userId) ? 'disliked' : '',
            ]"
            @click="onClickDislike(post._id)"
          >
            <i class="fa-regular fa-thumbs-down"></i>
            <template v-if="post.usersWhoDisliked.includes(user.userId)"
              ><b>Disliké !</b>
            </template>
          </button>
        </div>
        <div
          v-if="user.userId === post.userId || isAdmin"
          class="modify-delete-buttons"
        >
          <button class="button modify-button" @click="modifyPost(post._id)">
            <i class="fas fa-edit modify"></i>
            <b>modifier</b>
          </button>

          <button
            class="button delete-button"
            @click="showModalDeletePost(post._id)"
          >
            <i class="fas fa-trash-alt delete"></i>
            <b>Supprimer</b>
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
      </div>
    </div>
  </div>
  <h3 v-else>Soyez le premier à poster !</h3>
</template>

<script>
import UserClass from "@/classes/UserClass";
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "PostsList",
  components: { ModalWindow },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      user: UserClass.user,
      inputFilter: "",
      data: null,
      message: "",
      showModal: false,
      postToDelete: null,
      isAdmin: UserClass.isAdmin,
    };
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return post.userName
          .toLowerCase()
          .match(this.inputFilter.toLowerCase());
      });
    },
  },

  methods: {
    async modifyPost(id) {
      this.$router.push(`/post/${id}`);
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
        this.$emit("post-deleted", this.postToDelete);
        this.showModal = false;
      } catch (err) {
        console.log(err);
      }
    },

    async onClickLike(id) {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      this.data = { userId: this.user.userId };

      try {
        const { data } = await this.axios.post(
          `/posts/${id}/like`,
          this.data,
          axiosConfig
        );
        this.$emit("post-liked", data);
      } catch (err) {
        console.log(err);
      }
    },

    async onClickDislike(id) {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      this.data = { userId: this.user.userId };

      try {
        const { data } = await this.axios.post(
          `/posts/${id}/dislike`,
          this.data,
          axiosConfig
        );
        this.$emit("post-liked", data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
#posts-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
}

.post-header {
  display: flex;
  align-items: center;
}

.post-date {
  color: #aaa;
}

.total-likes-dislikes {
  display: flex;
  font-size: 0.9em;
  padding: 3px 0 0 2px;
  gap: 10px;
}

.total-likes-dislikes > .fa-thumbs-up {
  color: #22780f;
}

.total-likes-dislikes > .fa-thumbs-down {
  color: firebrick;
}

.post-subtitle {
  padding-left: 15px;
}

.profile-picture {
  width: 60px;
  height: 60px;
  clip-path: circle(50%);
  object-fit: cover;
  object-position: top;
}

.post-picture {
  margin: 0 auto;
  width: 100%;
  height: 250px;
}

h2 {
  margin-top: 20px;
  color: white;
  font-size: 2.4em;
  transform: translateY(25px);
}

h4 {
  color: #4e5166;
}

h3 {
  margin-top: 15px;
}

b {
  margin-left: 5px;
}

.search-bar {
  transform: translateY(10px);
  width: 540px;
}

.fa-search {
  color: white;
  margin-right: 5px;
}

input:focus {
  outline: #ffd7d7 solid 4px;
  box-shadow: 1px 1px 5px #fd2d01;
}

input {
  padding: 6px;
  border: none;
  border-radius: 16px;
  border-left-style: none;
}

.modify-delete-buttons,
.like-dislike-buttons {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.modify-button,
.delete-button {
  width: fit-content;
}

.modify-button > b,
.delete-button > b {
  margin-left: 5px;
}

.like,
.dislike {
  width: 46%;
}

.like,
.dislike,
.modify-button,
.delete-button {
  background: none;
  border: 1px solid #fd2d01;
  color: #fd2d01;
}

.liked,
.disliked {
  background: #fd2d01;
  color: white;
}

.like:hover,
.dislike:hover,
.modify-button:hover,
.delete-button:hover {
  color: white;
  -webkit-box-shadow: inset -150px 0px 0px 0px #fd2d01;
  box-shadow: inset -150px 0px 0px 0px #fd2d01;
  transform: none;
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
  .profile-picture {
    width: 65px;
    height: 65px;
  }

  h2 {
    padding: 0 25px;
  }

  .search-bar {
    padding: 25px;
    width: 100%;
  }

  .modify-button > b,
  .delete-button > b {
    display: none;
  }

  .liked > b,
  .disliked > b {
    display: none;
  }

  .modify-button,
  .delete-button {
    width: 46%;
  }
}
</style>
