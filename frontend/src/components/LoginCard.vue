<template>
  <div class="card">
    <h1 class="card__title">Connexion</h1>
    <div class="card__subtitle">
      <h4>Vous n'avez pas encore de compte ?</h4>
      <span class="card__action" @click="onClickCardAction">Créer un compte</span>
    </div>
    <form>
    <div class="form-row">
      <label hidden for="email">email</label>
      <input
        @input="checkForm()"
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
       @input="checkForm()"
        name="password"
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <div class="form-row">
      <button v-if="errors.length" class="button" type="button" hidden>Se connecter</button>
      <button class="button" type="button" v-else @click="checkForm(), login()"> Se connecter</button>
         <!-- TO DO loading text in button -->
        <!-- <span v-if="status == 'loading'">Connexion en cours...</span>
        // <span v-else>Connexion</span> -->
    </div>
    </form>
     <p class= "errorMessage" v-if="errors.length">
    <b>⛔️ Veuillez corriger les erreurs suivantes ⛔️</b>
    <ul>
      <li v-for="error in errors" :key="error.message">{{ error }}</li>
    </ul>
  </p>
  </div>
</template>

<script>
const regExpEmail = new RegExp("^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_-]+[.]{1}[a-z]{2,10}$");
const regExpStrongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export default {
  name: "LoginCard",

  data() {
    return {
      errors:[],
      email: '',
      password: ''
    }
  },

  methods: {
    onClickCardAction() {
      this.$emit('action-text-click')
      this.$router.replace('/signup')
    },

     // Check du formulaire avec la méthode checkForm de Vue
    checkForm: function () {
      this.errors = [];
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
    },

    async login() {
      // Utilisation de axios (appelé dans main.js) afin de communiquer avec l'API 
      try {
        await this.axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        })
        // Récupération du token de connexion afin de le stocker dans le local storage
          .then(r => {
          this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + r.data.token;
          localStorage.setItem( 'token', JSON.stringify(r.data.token) );
        }
        )
      }
      catch (err) {
        console.log(err)
      }
      // Dès que les data ont bien été envoyées a l'API, on envoi l'utilisateur vers la page des posts
       await this.$router.replace('/all-posts')
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
