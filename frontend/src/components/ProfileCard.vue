<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <img :src="user.image" />
    <h3 class="card__subtitle">{{ user.firstname }}{{ user.lastname }}</h3>
    <div class="form-row">
      <button 
      class="button"
      @click="logout()"> 
      Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";

const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "ProfileCard",

  data() {
    return {
      user: UserClass.user,
    };
  },
  methods: {
    // Au clic sur logout, le localstorage est vidé
    logout() {
      localStorage.clear(user);
      this.$router.go('/login');
    }
  }
};
</script>

<style scoped>
.card__title {
  margin-bottom: 15px;
}
.card__subtitle {
  margin-top: 10px;
}
img {
  border-radius: 16px;
}
</style>