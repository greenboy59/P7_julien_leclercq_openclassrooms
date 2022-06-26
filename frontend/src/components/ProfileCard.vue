<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <img :src="user.image" />
    <h3 class="card__subtitle">{{ user.firstname }} {{ user.lastname }}</h3>
    <div class="form-row">
      <button class="button" @click="logout()">Déconnexion</button>
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
      this.$router.go("/login");
    },
  },
};
</script>

<style scoped>
.button {
  -webkit-animation: bounce 0.7s infinite alternate;
  -moz-animation: bounce 0.7s infinite alternate;
  animation: bounce 0.7s infinite alternate;
}
@-webkit-keyframes bounce {
  from {
    -webkit-transform: translateY(-10%);
  }
  to {
    -webkit-transform: translateY(10%);
  }
}
@-moz-keyframes bounce {
  from {
    -moz-transform: translateY(-10%);
  }
  to {
    -moz-transform: translateY(10%);
  }
}
@keyframes bounce {
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(10%);
  }
}
.card__title {
  margin-bottom: 15px;
}
.card__subtitle {
  margin-top: 10px;
}
img {
  border-radius: 16px;
  width: 100%;
  height: 300px;
}
</style>
