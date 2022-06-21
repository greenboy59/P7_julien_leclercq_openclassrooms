<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <h3 class="card__subtitle">{{ user.firstname }}{{ user.lastname }}</h3>
    <img :src="user.photo" />
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: UserClass.user
    }
  },

  methods: {
    logout() {
      let user = localStorage.getItem("user");
      if (!user) {
        user = {
          userId: -1,
          token: "",
        };
      } else {
        try {
          user = JSON.parse(user);
          this.axios.defaults.headers.common["Authorization"] = user.token;
        } catch (ex) {
          user = {
            userId: -1,
            token: "",
          };
        }
      }
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>
