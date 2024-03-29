<template>
  <div id="create-post-container">
    <div class="user-title">
      <h1>
        Bonjour,<br />
        <strong>{{ user.firstname }} {{ user.lastname }}</strong>
      </h1>
      <img
        :src="user.image"
        alt="photo_de_profil"
        class="profile-picture"
        @click="goToProfile(user.userId)"
      />
    </div>
    <input
      readonly="readonly"
      class="form-row__input input-appear"
      @focus="showModal = true"
      placeholder="De quoi voulez-vous parler ?"
    />

    <ModalWindow v-show="showModal" @close="showModal = false">
      <template #title>
        <h2>Quelque chose a dire?</h2>
        <b>(max 400 caractères)</b>
      </template>
      <template #content>
        <textarea
          v-model="textarea"
          class="form-row__input"
          name="post-text"
          cols="30"
          rows="10"
          minlength="1"
          maxlength="400"
          placeholder="Ecrivez quelque chose..."
        >
        </textarea>
        <h2 for="postPic">
          Mettez en avant votre post avec une image ou un gif !
        </h2>

        <FilePreview
          :opacity="uploadInputOpacity"
          :background-image="image"
          @upload="setImage"
          @reload-image="reloadImage"
        />
      </template>
      <template #actions>
        <button type="submit" class="button publish-button" @click="publish()">Publier</button>
        <button @click="showModal = false">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import FilePreview from "@/components/FilePreview";
import UserClass from "@/classes/UserClass";
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "CreatePost",
  components: { FilePreview, ModalWindow },

  data() {
    return {
      user: UserClass.user,
      errors: [],
      image: "",
      textarea: "",
      showModal: false,
      uploadInputOpacity: 1,
    };
  },

  methods: {
    // Récupération de l'image
    setImage(payload) {
      this.image = payload;
    },

    reloadImage() {
      this.image = "";
    },

    resetForm() {
      document.querySelector(".delete-image").click();
      this.textarea = "";
      this.showModal = false;
    },

    goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },

    // Publication d'un post
    async publish() {
      const userName = UserClass.user.firstname + " " + UserClass.user.lastname;
      const userId = UserClass.user.userId;
      const userImage = UserClass.user.image;
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("description", this.textarea);
      formData.append("userName", userName);
      formData.append("userId", userId);
      formData.append("userImage", userImage);
      try {
        const { data } = await this.axios.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.user.token}`,
          },
        });
        this.$emit("post-created", data);
        this.resetForm();
      } catch (err) {
        console.log(err);
        document.querySelector('.publish-button').innerHTML = `<span class="error-message">${err.response.data.message}</span>`;
        setTimeout(this.deleteErrorMessage, 3000)
      }
    },

    deleteErrorMessage() {
      document.querySelector('.error-message').remove();
      document.querySelector('.publish-button').textContent = "Publier";
    },
  },
};
</script>

<style scoped>
.fa-circle-xmark {
  position: absolute;
  top: -7px;
  left: -7px;
  font-size: 2.5em;
  color: red;
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

.user-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.profile-picture {
  width: 90px;
  height: 90px;
  clip-path: circle(50%);
  object-fit: cover;
  cursor: pointer;
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
  font-size: 0.8em;
}

h2,
b {
  text-align: left;
  display: block;
  margin: 10px 0;
}

.button {
  width: fit-content;
  display: block;
  position: absolute;
  top: 35px;
  right: 25px;
}

input {
  transform: translateY(-1000%);
  opacity: 0;
  width: 100%;
  height: 35px;
  background: white;
  padding: 6px;
  border: none;
  border-radius: 25px;
  border-left-style: none;
}

span {
  padding: 6px;
}

@media (max-width: 540px) {
  #create-post-container {
    padding: 0 25px;
  }

  .user-title {
    flex-direction: column-reverse;
    align-items: baseline;
    margin-top: 50px;
  }

  #display-create-post {
    padding: 0 25px;
  }

  .fa-circle-xmark {
    left: 25px;
    top: -20px;
    font-size: 3em;
  }
}
</style>