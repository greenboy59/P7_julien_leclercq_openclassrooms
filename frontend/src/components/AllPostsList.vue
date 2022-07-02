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
    <div :key="post.id" v-for="post in filteredPosts.reverse()" class="card">
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
      <p>{{ post.description }}</p>
      <img v-if="post.image" :src="post.image" :alt="post.image" class="post-picture" />
      <div class="posts-options">
        <div class="like-dislike-buttons">
            <button
              @click="addLike(post._id, post.usersLiked)" 
              class="button like"
            >
              <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <button
              @click="addDislike(post._id, post.usersDisliked)"
              class="button dislike"
            >
              <i class="fa-regular fa-thumbs-down"></i>
            </button>
        </div>
        <div v-if="user.userId === post.userId" class="modify-delete-buttons">
          <button class="button modify-button" @click="modifyPost(post._id)">
            <i class="fas fa-edit modify"></i>
            <b>modifier</b>
          </button>
          <button class="button delete-button" @click="deletePost(post._id)">
            <i class="fas fa-trash-alt delete"></i>
            <b>supprimer</b>
          </button>
        </div>
      </div>
    </div>
  </div>
  <h3 v-else>Soyez le premier à poster !</h3>
</template>

<script>
import UserClass from "@/classes/UserClass";

export default {
  name: "AllPostsList",

  data() {
    return {
      user: UserClass.user,
      posts: [],
      inputFilter: "",
      postId: "",
      data: null,
      message: "",
    };
  },

  beforeMount() {
    this.getPosts();
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
    // Récupération des posts via l'API
    async getPosts() {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      const { data } = await this.axios.get("/posts", axiosConfig, {});
      this.posts = data;
    },

    async deletePost(id) {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      try {
        await this.axios.delete("/posts/" + id, axiosConfig,);
        await this.$router.go("/");
      } catch (err) {
        console.log(err);
      }
    },

    async modifyPost(id) {
      this.$router.push(`/post/${id}`);
    },

    async addLike(id, usersLiked) {
      const axiosConfig = {headers: { Authorization: `Bearer ${this.user.token}` },};
      this.data = { userId: this.user.userId, like: 1 };
      console.log(usersLiked);

      try {
        await this.axios
          .post(`/posts/${id}/like`, this.data, axiosConfig, {})
          .then((response) => {
            this.message = response.data.message;
          });
      } catch (err) {
        console.log(err);
      }
    },

    async addDislike(id, usersDisliked) {
      console.log(usersDisliked);
      const axiosConfig = {
        headers: { Authorization: `Bearer ${this.user.token}` },
      };
      const data = { userId: this.user.userId, like: -1 };
      try {
        await this.axios
          .post(`/posts/${id}/like`, data, axiosConfig, {})
          .then((response) => {
            this.message = response.data.message;
            console.log(this.message);
          });
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
.post-subtitle {
  padding-left: 15px;
  width: 80%;
}
.profile-picture {
  width: 50px;
  height: 50px;
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
.search-bar {
  transform: translateY(10px);
  width: 540px;
}
.fa-search {
  color: white;
  margin-right: 5px;
}
input:focus {
  outline-color: #ffd7d7;
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
  height: 50px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.modify-button,
.delete-button {
  width: fit-content;
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
  position: relative;
  border: 1px solid #fd2d01;
  color: #fd2d01;
}
.like:hover,
.dislike:hover,
.modify-button:hover,
.delete-button:hover {
  color: white;
  -webkit-box-shadow: inset -150px 0px 0px 0px #fd2d01;
  box-shadow: inset -150px 0px 0px 0px #fd2d01;
}
.fa-trash-alt,
.fa-edit {
  margin-right: 5px;
}
@media (max-width: 540px) {
  .profile-picture {
    -webkit-clip-path: circle(50%);
    clip-path: circle(45%);
    width: 20%;
    height: 100%;
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
  .modify-button,
  .delete-button {
    width: 46%;
  }
}
</style>
