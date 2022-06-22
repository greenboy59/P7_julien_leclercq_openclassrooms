<template>
  <div>
    <img id="logo" alt="Groupomania logo" src="../assets/logo.png" />
    <div class="card">
      <h1 class="card__title">Inscription</h1>
      <div class="card__subtitle">
        <h4>Vous avez déjà un compte ?</h4>
        <span class="card__action" @click="onClickCardAction">
          Se connecter
        </span>
      </div>
      <form>
         <div class="form-row">
          <label for="profilePic">Insérez ici, votre photo de profil:</label>
          <input 
          type="file"
          accept="image/*"
          name="profilePic"
          class="form-row__input"
          ref="profilePic"
          @change ="onSelect()"
          />
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
          <button type="button" class="button" @click="checkForm()">
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

export default {
  name: "SignUpCard",

  data() {
    return {
      errors: [],
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      image:"",
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

    // Récupération de l'image

    onSelect() {
      const image = this.$refs.profilePic.files[0];
      this.image = image;
    },

    // fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async signUp() {
      const formData = new FormData();
      formData.append('image', this.image);
      try {
        await this.axios.post("http://localhost:3000/api/auth/signup", formData, {
          email: this.email,
          password: this.password,
          lastname: this.lastname,
          firstname: this.firstname,
        });
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped> 
label {
  width: 100%;
  font: 18px;
  margin-bottom: -10px;
}
</style>