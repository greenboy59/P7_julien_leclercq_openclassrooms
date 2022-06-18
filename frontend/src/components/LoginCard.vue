<template>
  <div class="card">
    <h1 class="card__title">Connexion</h1>
    <div class="card__subtitle">
      <h4>Vous n'avez pas encore de compte ?</h4>
      <span class="card__action" @click="onClickCardAction">Créer un compte</span>
    </div>
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        type="text"
        placeholder="Adresse mail"
      />
    </div>
    <div class="form-row">
      <input
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <!-- <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div> -->
    <div class="form-row">
      <button
        class="button"
        @click="login()"
      >
        Se connecter
        <!-- TO DO loading text in button -->
        <!-- <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span> -->
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginCard",

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    onClickCardAction() {
      this.$emit('action-text-click')
      this.$router.replace('/signup')
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
