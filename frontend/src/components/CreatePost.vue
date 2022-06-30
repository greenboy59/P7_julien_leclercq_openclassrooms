<template>
  <div>
    <div class="user-title">
      <h1>
        Bonjour,<br />
        <strong>{{ user.firstname }} {{ user.lastname }}</strong>
      </h1>
      <img :src="user.image" :alt="user.image" class="profile-picture" />
    </div>
    <div id="display-create-post">
      <input
        readonly="readonly"
        class="form-row__input input-appear"
        @focus="displayCreatePost"
        placeholder="De quoi voulez-vous parler ?"
      />
    </div>
    <div id="container">
      <div class="card card-appear">
        <button @click="hideCreatePost">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
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
      containerElement: null,
    };
  },

  methods: {
    displayCreatePost() {
      this.containerElement = document.getElementById("container");
      this.containerElement.style.transform = "translateY(0%)";
      this.containerElement.style.display = "flex";
    },
    hideCreatePost() {
      this.containerElement.style.transform = "translateY(100%)";
      this.containerElement.style.transition = "all .8s ease";
    },

    // Récupération de l'image
    setImage(payload) {
      this.image = payload;
    },

    // fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async publish() {
      const userName = UserClass.user.firstname + " " + UserClass.user.lastname;
      const userId = UserClass.user.id;
      const userImage = UserClass.user.image;
      const date = new Date();
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("description", this.textarea);
      formData.append("userName", userName);
      formData.append("userId", userId);
      formData.append("userImage", userImage);
      formData.append(
        "date",
        date.toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      );
      try {
        await this.axios.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.token}`,
          },
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
#display-create-post {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px 16px 0 0;
}
#display-create-post > input {
  transform: translateY(-1000%);
  opacity: 0;
  width: 100%;
  height: 80px;
  background: white;
}
.input-appear {
  animation: input-appear 1s 0.5s ease forwards;
}
@keyframes input-appear {
  from {
    transform: translateY(-1000%);
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
#container {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
@-moz-document url-prefix() {
  #container {
    background-color: rgba(255, 215, 215, 0.8);
    height: 100%;
    width: 100%;
  }
}
.fa-circle-xmark {
  position: absolute;
  top: -7px;
  right: -7px;
  font-size: 2.5em;
  color: red;
}
.card-appear {
  animation: card-appear 0.8s ease;
}
@keyframes card-appear {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
.user-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.profile-picture {
  width: 70px;
  height: 70px;
  clip-path: circle(50%);
  object-fit: cover;
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
  position: relative;
  box-shadow: 1px 1px 5px #aaa;
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
textarea:focus,
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
span {
  padding: 6px;
}
@media (max-width: 540px) {
  .user-title {
    flex-direction: column-reverse;
    align-items: baseline;
    padding: 0 25px;
    margin-top: 70px;
  }
  .card {
    width: 100%;
    border-radius: 0;
  }
  #display-create-post {
    padding: 0 25px;
  }
  .fa-circle-xmark {
    top: -7px;
    right: 30px;
  }
}
</style>
