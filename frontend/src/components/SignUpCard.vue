<template>
  <div>
    <img
      id="logo"
      alt="Groupomania logo"
      src="../assets/icon-left-font-monochrome-black.svg"
    />
    <div class="card">
      <h1 class="card__title">Inscription</h1>
      <div class="card__subtitle">
        <h4>Vous avez déjà un compte ?</h4>
        <span class="card__action" @click="onClickCardAction">
          Se connecter
        </span>
      </div>
      <form
        @submit.prevent="onSubmit"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="file-preview">
          <h2 for="postPic">
            Affichez vous ! insérer votre photo de profil ci-dessous <br />
            <b>(max 5mo)</b>
          </h2>
          <FilePreview @upload="setImage" />
        </div>
        <div class="form-row">
          <label hidden for="lastname">Nom</label>
          <input
            v-model="lastname"
            id="lastname"
            name="lastname"
            class="form-row__input"
            type="text"
            placeholder="Nom"
          />
        </div>
        <div class="form-row">
          <label hidden for="firstname">Prénom</label>
          <input
            v-model="firstname"
            id="firstname"
            name="firstname"
            class="form-row__input"
            type="text"
            placeholder="Prénom"
          />
        </div>
        <div class="form-row">
          <label hidden for="email">email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            class="form-row__input"
            type="email"
            placeholder="Adresse mail"
          />
        </div>
        <div class="form-row">
          <label hidden for="password">mot de passe</label>
          <input
            v-model="password"
            id="password"
            name="password"
            class="form-row__input"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="form-row">
          <button type="submit" class="button" @click="checkForm()">
            S'inscrire
            <!--TO DO insérer un texte durant le loading-->
            <!-- <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span> -->
          </button>
        </div>
      </form>
      <div class="errorMessage" v-if="errors.length">
        <b>⚠️ Veuillez corriger les erreurs suivantes ⚠️</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { regExpEmail } from "@/helpers/regex.js";
import { regExpStrongPassword } from "@/helpers/regex.js";
import { regName } from "@/helpers/regex.js";
import UserClass from "@/classes/UserClass";
import FilePreview from "./FilePreview.vue";

export default {
  name: "SignUpCard",
  components: { FilePreview },
  data() {
    return {
      errors: [],
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      image: "",
    };
  },
  methods: {
    onClickCardAction() {
      this.$emit("action-text-click");
      this.$router.replace("/login");
    },
    // Check du formulaire avec la méthode checkForm de Vue
    checkForm() {
      this.errors = [];
      if (!this.lastname) {
        this.errors.push("Votre Nom est requis.");
      } else if (!regName.test(this.lastname)) {
        this.errors.push(
          "Votre Nom comporte une ou plusieurs erreurs (chiffres et caractères spéciaux non autorisés).",
        );
      }
      if (!this.firstname) {
        this.errors.push("Votre Prénom est requis.");
      } else if (!regName.test(this.firstname)) {
        this.errors.push(
          "Votre Prénom comporte une ou plusieurs erreurs (chiffres et caractères spéciaux non autorisés).",
        );
      }
      if (!this.email) {
        this.errors.push("Une adresse Email est requise.");
      } else if (!regExpEmail.test(this.email)) {
        this.errors.push(
          "Votre adresse Email comporte une ou plusieurs erreurs.",
        );
      }
      if (!this.password) {
        this.errors.push("Un mot de passe est requis.");
      } else if (!regExpStrongPassword.test(this.password)) {
        this.errors.push(
          "Votre mot de passe est invalid (minimum 8 caractères dont: 1 caractère spécial, 1 chiffre, 1 majuscule et 1 minuscule).",
        );
      }
      if (!this.errors.length) {
        this.signUp();
      }
    },

    setImage(payload) {
      const image = payload;
      this.image = image;
    },

    // fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async signUp() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("lastname", this.lastname);
      formData.append("firstname", this.firstname);
      formData.append("email", this.email);
      formData.append("password", this.password);
      try {
        await this.axios.post("/auth/signup", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const { data } = await this.axios.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        // Récupération des infos du user afin de les envoyer dans le local storage
        this.axios.defaults.headers.common["Authorization"] =
          "Bearer" + data.token;
        UserClass.setUser(data);
        // Dès que les data ont bien été envoyées a l'API, on envoi l'utilisateur vers la page des posts
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.file-preview {
  margin-top: 15px;
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
.message {
  width: 100%;
  color: green;
  font-size: 18px;
  margin-top: -15px;
}
label {
  width: 100%;
  font: 18px;
  margin-bottom: -10px;
}
</style>
