<template>
  <div class="card">
    <h1 class="card__title">Inscription</h1>
    <div class="card__subtitle">
      <h4>Vous avez déjà un compte ?</h4>
      <span class="card__action" @click="onClickCardAction">Se connecter</span>
    </div>
    <div class="form-row">
      <input
        v-model="nom"
        class="form-row__input"
        type="text"
        placeholder="Nom"
      />
    </div>
    <div class="form-row">
      <input
        v-model="prenom"
        class="form-row__input"
        type="text"
        placeholder="Prénom"
      />
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
        @click="signUp()"
      >
        S'inscrire
        <!--TO DO insérer un texte durant le loading-->
        <!-- <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span> -->
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpCard",

  data() {
    return {
      email: '',
      password: '',
      nom: '',
      prenom: ''
    }
  },

  methods: {
    onClickCardAction() {
      this.$emit("action-text-click")
      this.$router.replace('/login')
    },

// fonction asynchrone afin d'envoyer les données au backend et rediriger vers page de login
    async signUp() {
      try {
        await this.axios.post('http://localhost:3000/api/auth/signup', {
          email: this.email,
          password: this.password,
          nom: this.nom,
          prenom: this.prenom
      })
      }
      catch (err) {
        console.log(err)
      }
      await this.$router.replace('/login')
    }
  }
};
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
