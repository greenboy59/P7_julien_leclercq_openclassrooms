<template>
  <div class="card">
    <h1 class="card__title">Inscription</h1>
    <div class="card__subtitle">
      <h4>Vous avez déjà un compte ?</h4>
      <span class="card__action" @click="onClickCardAction">Se connecter</span>
    </div>
    <form>
      <div class="form-row">
        <label hidden for="name">Nom</label>
        <input
          name="name"
          v-model="nom"
          class="form-row__input"
          type="text"
          placeholder="Nom"
        />
      </div>
      <div class="form-row">
        <label hidden for="firstname">Prénom</label>
        <input
          name="firstname"
          v-model="prenom"
          class="form-row__input"
          type="text"
          placeholder="Prénom"
        />
      </div>
      <div class="form-row">
        <label hidden for="email">email</label>
        <input
          name="email"
          v-model="email"
          class="form-row__input"
          type="email"
          placeholder="Adresse mail"
        />
      </div>
      <div class="form-row">
        <label hidden for="password">mot de passe</label>
        <input
          name="password"
          v-model="password"
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
     <p class= "errorMessage" v-if="errors.length">
    <b>⚠️ Veuillez corriger les erreurs suivantes ⚠️</b>
    <ul>
      <li v-for="error in errors" :key="error.message">{{ error }}</li>
    </ul>
  </p>
  </div>
</template>

<script>
import { regExpEmail } from '@/helpers/regex.js';
import { regExpStrongPassword } from '@/helpers/regex.js';
import { regName } from '@/helpers/regex.js';

export default {
  name: "SignUpCard",

  data() {
    return {
      errors:[],
      email: "",
      password: "",
      nom: "",
      prenom: "",
    };
  },

  methods: {
    onClickCardAction() {
      this.$emit("action-text-click");
      this.$router.replace("/login");
    },

    // Check du formulaire avec la méthode checkForm de Vue
    checkForm: function () {
      this.errors = [];
        if (!this.nom) {
          this.errors.push("Votre Nom est requis.");
        } else if (!regName.test(this.nom)) {
          this.errors.push("Votre Nom comporte une ou plusieurs erreurs (chiffres et caractères spéciaux non autorisés).");
        }
        if (!this.prenom) {
          this.errors.push("Votre Prénom est requis.");
        } else if (!regName.test(this.prenom)) {
          this.errors.push("Votre Prénom comporte une ou plusieurs erreurs (chiffres et caractères spéciaux non autorisés).");
        }
        if (!this.email) {
          this.errors.push("Une adresse Email est requise.");
        } else if (!regExpEmail.test(this.email)) {
          this.errors.push("Votre adresse Email comporte une ou plusieurs erreurs.");
        }
        if (!this.password) {
          this.errors.push("Un mot de passe est requis.");
        } else if (!regExpStrongPassword.test(this.password)) {
          this.errors.push("Votre mot de passe est invalid (minimum 8 caractères dont: 1 caractère spécial, 1 chiffre, 1 majuscule et 1 minuscule).");
        }
      if (!this.errors.length) {
          this.signUp()
        }
    },

    // fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async signUp() {
        try {
          await this.axios.post("http://localhost:3000/api/auth/signup", {
            email: this.email,
            password: this.password,
            nom: this.nom,
            prenom: this.prenom,
          });
        } catch (err) {
          console.log(err);
        }
        await this.$router.replace("/login");
      }
    }
}
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>
