<template>
  <div id="comments-container">
    <button class="comments" @click="showModalComments()">
      <i class="fa-regular fa-message"></i>
      Commentaires
    </button>
    <ModalWindow v-show="showModal" @close="showModal = false">
      <template #title>
        <h2>Quelque chose a dire?</h2>
        <b>(max 400 caractères)</b>
      </template>
      <template #content>
        <!-- <textarea
          v-model="textarea"
          class="form-row__input"
          name="post-text"
          cols="30"
          rows="10"
          minlength="1"
          maxlength="400"
          placeholder="Ecrivez quelque chose..."
        >
        </textarea> -->
        <span>{{post.image}}</span>
        <h2>
          Mettez en avant votre post avec une image ou un gif !
        </h2>
      </template>
      <template #actions>
        <button type="submit" class="button publish-button" @click="publish()">Publier le commentaire</button>
        <button @click="showModal = false">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import UserClass from "@/classes/UserClass";

export default {

  name: "CommentsCard",
  components: { ModalWindow },

  data() {
    return {
      showModal: false,
      posts: [],
      user: UserClass.user,
    }
  },

  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return post
      });
    },
  },

  async beforeMount() {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${this.user.token}` },
    };
    const { data } = await this.axios.get("/posts", axiosConfig);
    this.posts = data;
  },

  methods: {

    showModalComments() {
      this.showModal = true;
    },

  }

}
</script>

<style scoped>
#comments-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  border:#fd2d01 1px solid;
  border-radius: 8px;
  height: 50px;
  transition: 0.3s all;
}

.comments {
  color: #fd2d01;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.comments:hover {
  color: white;
}

.fa-message {
  font-size: 1.5em;
}

#comments-container:hover {
  width: 100%;
  -webkit-box-shadow: inset -540px 0px 0px 0px #fd2d01;
  box-shadow: inset -540px 0px 0px 0px #fd2d01;
  border-radius: 8px;
  color: white;
}
.fa-circle-xmark {
  position: absolute;
  top: -7px;
  left: -7px;
  font-size: 2.5em;
  color: red;
}
</style>