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
      <p>{{ post.description }}</p>
      <img :src="post.image" :alt="post.image" class="post-picture" />
      <div v-if="this.user.id === post.userId" class="post-buttons">
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
export default {
  name: "PostCard",

  data() {
    return {
      user: UserClass.user,
      post: "",
      id: this.$route.params.id,
    };
  },

  beforeMount() {
    this.getPost();
    console.log(this.post);
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
  margin-right: 15px;
  object-fit: cover;
  object-position: top;
}
.post-picture {
  margin: 0 auto;
  width: 100%;
  height: 250px;
}
.button {
  width: fit-content;
  height: 50px;
  font-size: 12px;
  margin: 5px 5px 0 0;
}
</style>
