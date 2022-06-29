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
      <img :src="post.image" :alt="post.image" class="post-picture" />
      <div class="posts-options">
        <div class="like-dislike-buttons">
          <button class="button like">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="button dislike">
            <i class="fa-regular fa-thumbs-down"></i>
          </button>
        </div>
        <div v-if="this.user.id === post.userId" class="modify-delete-buttons">
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
    };
  },

  beforeMount() {
    this.getPosts();
  },

  methods: {
    // Récupération des posts via l'API
    async getPosts() {
      const { data } = await this.axios.get("/posts", {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      this.posts = data;
    },

    async deletePost(id) {
      try {
        await this.axios.delete("/posts/" + id, {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        await this.$router.go("/");
      } catch (err) {
        console.log(err);
      }
    },

    async modifyPost(id) {
      this.$router.push(`/post/${id}`);
    },
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
};
</script>

<style scoped>
#posts-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
}
.card {
  padding: 25px;
}
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
  margin-right: 15px;
  object-fit: cover;
  object-position: top;
}
.post-picture {
  margin: 0 auto;
  width: 100%;
  height: 250px;
}
.card p {
  margin: 20px 0;
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
.search-bar {
  transform: translateY(10px);
  display: inline-block;
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
.modify-button, .delete-button {
  width: fit-content;
}
.posts-options {
  margin-top: 15px;
  display: flex;
}
.like,
.dislike {
  color: white;
  width: 46%;
}

@media (max-width: 540px) {
  .card {
    border-radius: 0;
    width: 100%;
  }
  .profile-picture {
    clip-path: circle(40%);
    width: 70px;
    height: 70px;
  }
   h2 {
    padding: 0 25px;
  }
  .search-bar {
    padding: 25px;
    width: 100%;
  }
  .modify-button > b, .delete-button > b {
    display: none;
  }
  .modify-button, .delete-button {
    width: 46%;
  }
}
</style>
