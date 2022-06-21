<template>
  <div class="card">
    <h1 class="card__title">Connexion</h1>
    <div class="card__subtitle">
      <h4>Vous n'avez pas encore de compte ?</h4>
      <span class="card__action" @click="onClickCardAction">
        Créer un compte
      </span>
    </div>
    <form>
      <div class="form-row">
        <label hidden for="email">email</label>
        <input
          name="email"
          v-model="email"
          class="form-row__input"
          type="email"
          placeholder="Adresse mail"
          @input="checkForm()"
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
          @input="checkForm()"
        />
      </div>
      <div class="form-row">
        <button
          :disabled="errors.length || !email || !password"
          class="button"
          type="button"
          @click="login()">
          Se connecter
        </button>
        <!-- TO DO loading text in button -->
        <!-- <span v-if="status == 'loading'">Connexion en cours...</span>
        // <span v-else>Connexion</span> -->
      </div>
    </form>
    <div class="errorMessage" v-if="errors.length">
      <b>⚠️ Veuillez corriger les erreurs suivantes ⚠️</b>
      <ul>
        <li v-for="error in errors" :key="error.message">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { regExpEmail } from "@/helpers/regex.js";
import { regExpStrongPassword } from "@/helpers/regex.js";
import UserClass from "@/classes/UserClass";

export default {
  name: "LoginCard",

  data() {
    return {
      errors: [],
      email: '',
      password: ''
    }
  },

  methods: {
    onClickCardAction() {
      this.$emit("action-text-click")
      this.$router.replace("/signup")
    },

    // Check du formulaire avec la méthode checkForm de Vue
    checkForm () {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Une adresse Email est requise.");
      } else if (!regExpEmail.test(this.email)) {
        this.errors.push(
          "Votre adresse Email comporte une ou plusieurs erreurs."
        );
      }
      if (!this.password) {
        this.errors.push("Un mot de passe est requis.");
      } else if (!regExpStrongPassword.test(this.password)) {
        this.errors.push(
          "Votre mot de passe est invalid (minimum 8 caractères dont: 1 caractère spécial, 1 chiffre, 1 majuscule et 1 minuscule)."
        );
      }
    },

    async login() {
      // Utilisation de axios (appelé dans main.js) afin de communiquer avec l'API
      try {
        const { data } = await this.axios.post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password
        })
        // Récupération des infos du user afin de les envoyer dans le local storage
        this.axios.defaults.headers.common["Authorization"] = "Bearer" + data.token
        UserClass.setUser(data)
        // Dès que les data ont bien été envoyées a l'API, on envoi l'utilisateur vers la page des posts
        await this.$router.replace("/all-posts")
      } catch (err) {
        console.log(err)
      }
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
