<template>
  <transition name="modal">
    <ModalWindow v-if="showModal" @close="showModal = false" @logOut="logOut">
    </ModalWindow>
  </transition>

  <div class="nav-container">
    <div class="return-home">
      <a href="http://localhost:8080/all-posts">
        <img
          class="logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo Groupomania"
        />
      </a>
    </div>
    <div class="nav-bar-buttons">
      <button class="profile-button" type="button" @click="goToProfile">
        <i class="fa-solid fa-user"></i>
        Profil
      </button>

      <button class="logout-button" type="button" @click="showModal = true">
        <i class="fa-solid fa-right-from-bracket"></i>
        déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import ModalWindow from './ModalWindow.vue'

export default {
  name: "MainNav",
  components: {ModalWindow},

  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    goToProfile() {
      this.$router.push("/profile");
    },
    onClickLogOut() {
      this.$router.push("/profile");
    },
    // Au clic sur logout, le localstorage est vidé
    logOut() {
      localStorage.clear();
      this.$router.go("/login");
    },
  },
};
</script>

<style scoped>
.nav-container {
  display: flex;
  height: 50px;
}
.nav-bar-buttons {
  font-size: 1.1em;
}
.logout-button:hover,
.profile-button:hover {
  box-shadow: 3px 3px 10px #fd2b0131, -5px -5px 10px #ffd7d7;
  transform: scale(1.03);
  border-radius: 10px;
  background: #fecbc7;
}
.logout-button {
  position: absolute;
  right: 15px;
  top: 10px;
}
.profile-button {
  position: absolute;
  right: 150px;
  top: 10px;
}
.logout-button,
.profile-button {
  color: #4e5166;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease-out;
}
.fa-user,
.fa-right-from-bracket {
  margin-right: 5px;
}
.logo {
  width: 200px;
  height: 50px;
  position: absolute;
  top: 10px;
  left: 15px;
}
</style>
