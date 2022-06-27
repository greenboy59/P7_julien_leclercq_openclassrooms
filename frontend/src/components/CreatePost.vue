<template>
  <div class="container">
    <div class="user-title">
    <h1>
      Bonjour,<br />
      <strong>{{ user.firstname }} {{ user.lastname }}</strong>
    </h1>
    <img :src="user.image" :alt="user.image" class="profile-picture" />
    </div>
    <div class="card">
      <form
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="onSubmit"
      >
        <div class="form-row">
          <label for="post-text">
            Quelque chose a dire?<br />
            <b>(max 1500 caractères)</b>
          </label>
          <button type="submit" class="button" @click="publish()">
            Publier
            <!--TO DO insérer un texte durant le loading-->
            <!-- <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span> -->
          </button>
        </div>
        <textarea
          v-model="textarea"
          class="form-row__input"
          name="post-text"
          cols="30"
          rows="10"
          minlength="1"
          maxlength="1500"
          placeholder="Ecrivez quelque chose..."
        >
        </textarea>
        <div>
          <h2 for="postPic">
            Mettez en avant votre post avec une image ou un gif ! <br />
            <b>(max 5mo)</b>
          </h2>
          <FilePreview @upload="setImage" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FilePreview from "@/components/FilePreview";
import UserClass from "@/classes/UserClass";

export default {
  name: "CreatePost",
  components: { FilePreview },

  data() {
    return {
      user: UserClass.user,
      errors: [],
      image: "",
      textarea: "",
    };
  },

  methods: {
    // Récupération de l'image
    setImage(payload) {
      const image = payload;
      this.image = image;
    },
    // fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async publish() {
      const userName = UserClass.user.firstname + " " + UserClass.user.lastname;
      const userId = UserClass.user.id;
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("description", this.textarea);
      formData.append("userName", userName);
      formData.append("userId", userId);
      try {
        await this.axios.post("/posts", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await this.$router.go("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.user-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-picture {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}
h1 {
  color: rgba(255, 255, 255, 0.6);
}
strong {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}
h2,
label {
  font-size: 1.2em;
  font-weight: 400;
}
b {
  color: #aaa;
  font-size: 0.6em;
}
.card {
  margin-top: 25px;
}
.button {
  width: fit-content;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
textarea {
  width: 100%;
  max-height: 100px;
  margin-bottom: 15px;
  resize: none;
}
textarea:focus, input:focus {
  outline-color: #ffd7d7;
  box-shadow: 1px 1px 5px #fd2d01;
}
input {
    padding: 6px;
    border: none;
    border-radius: 16px;
    border-left-style: none;
}
span {
    padding: 6px;
}
</style>