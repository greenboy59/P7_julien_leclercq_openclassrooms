<template>
<div>
  <MainNav />
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <h3 class="card__subtitle">{{ user.firstname }}{{ user.lastname }}</h3>
    <img :src="user.image" />
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";
import MainNav from "@/components/MainNav";

 const user = JSON.parse(localStorage.getItem("user"));

export default {
  name: "ProfilePage",
  components: { MainNav },
  data() {
    return {
      user: UserClass.user
    };
  },
  methods: {
    logout() {
        localStorage.clear(user);
    },
  },
}
</script>

<style>
</style>
