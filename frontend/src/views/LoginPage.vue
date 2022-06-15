<template>
  <div>
  <img id="logo" alt="Groupomania logo" :src="require('@/assets/logo.png')" />
  <LoginCard
  :title="title"
  :subtitle="subtitle" 
  :action-text= "actionText" 
  @action-text-click="switchMode"
  >
  <button class="button" v-if="mode === 'login'">Login</button>
    <button class="button" v-else>Signup</button>
  </LoginCard>
  </div>
</template>

<script>
import LoginCard from '@/components/LoginCard.vue'

const titles = {
  login: "Connexion",
  signup: "Inscription"
}

const subtitles = {
  login: "Vous n'avez pas encore de compte ?",
  signup: "Vous avez déjà un compte ?"
}

const actionsText = {
  login: "Créer un compte",
  signup: "Se connecter"
}

export default {
  name: "LoginComponent",
  components: { LoginCard },

  data() {
    return {
      mode: "login",
    };
  },

  computed: {
    title() {
      return titles[this.mode]
    },
    subtitle() {
      return subtitles[this.mode]
    },
    actionText() {
      return actionsText[this.mode]
    }
  },

  // Méthode pour être soit en mode login soit en mode create
  methods: {
    switchMode() {
      if (this.mode === 'login') {
        this.mode= 'signup'
      } else {
        this.mode='login'
      }
    }
  },

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
