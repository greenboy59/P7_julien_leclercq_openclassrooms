<template>
  <div v-if="posts.length > 0" id="posts-container">
    <h2>Posts</h2>
    <ul>
      <span class="search-bar"
        ><i class="fas fa-search"></i>
        <input type="text" placeholder="Rechercher" v-model="inputFilter" />
      </span>
    </ul>
    <div class="error-message" v-if="inputFilter && !filteredPosts.length">
      <p>Aucun résultat trouvé !</p>
    </div>
    <div :key="post.id" v-for="post in filteredPosts" class="card">
      <div class="post-header">
        <img :src="user.image" :alt="user.image" class="profile-picture" />
        <div class="post-subtitle">
          <h4>{{ post.userName }}</h4>
          <div class="post-date">posté le {{}}</div>
        </div>
      </div>
      <p>{{ post.description }}</p>
      <img :src="post.image" :alt="post.image" class="post-picture" />
    </div>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";

export default {
  name: "AllPosts",

  data() {
    return {
      user: UserClass.user,
      posts: "",
      inputFilter: "",
    };
  },

  beforeMount() {
    this.getPosts();
  },

  methods: {
    // Récupération des posts via l'API
    async getPosts() {
      let response = await this.axios.get("/posts");
      this.posts = response.data;
    },
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return post.userName
          .toLowerCase()
          .match(this.inputFilter.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
#posts-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card {
  height: 450px;
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  object-position: top;
}
.post-picture {
  max-width: 100%;
  width: 500px;
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
</style>
