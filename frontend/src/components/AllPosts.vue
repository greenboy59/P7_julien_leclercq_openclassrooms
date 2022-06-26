<template>
  <div v-if="posts.length > 0" id="posts-container">
    <h2>Posts</h2>
    <div :key="post.id" v-for="post in posts" class="card">
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
    };
  },

  beforeMount() {
    this.getPosts();
  },

  methods: {
    async getPosts() {
      let response = await this.axios.get("/posts");
      this.posts = response.data;
    },
  },
};
</script>

<style scoped>
#posts-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 30px;
}
.card {
  height: 450px;
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
</style>
