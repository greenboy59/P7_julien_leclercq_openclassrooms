<template>
  <div>
    <nav id="nav-bar-container">
      <a href="http://localhost:8080/all-posts">
        <img
          class="logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo Groupomania"
        />
      </a>

      <div class="nav-bar-buttons">
        <button
          class="profile-button"
          type="button"
          @click="goToProfile(user.userId)"
        >
          <i class="fa-solid fa-user"></i>
          Profil
        </button>

        <button class="logout-button" type="button" @click="showModal = true">
          <i class="fa-solid fa-right-from-bracket"></i>
          déconnexion
        </button>
      </div>
    </nav>
    <ModalWindow v-show="showModal" @close="showModal = false">
      <template #title>
        <h3>Souhaitez-vous vraiment vous déconnecter ?</h3>
      </template>
      <template #actions>
        <div class="modal-actions-buttons">
          <button class="button modal-button-validate" @click="logout">
            Valider
          </button>
          <button class="button modal-button-cancel" @click="showModal = false">
            Annuler
          </button>
        </div>
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from "./ModalWindow.vue";
import UserClass from "@/classes/UserClass";

export default {
  name: "MainNav",
  components: { ModalWindow },

  data() {
    return {
      user: UserClass.user,
      showModal: false,
    };
  },

  methods: {
    async goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    // Au clic sur logout, le localstorage est vidé
    logout() {
      localStorage.removeItem("user");
      this.$router.go();
    },
  },
};
</script>

<style scoped>
#nav-bar-container {
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
}

.nav-bar-buttons {
  height: 100%;
}

.logout-button:hover,
.profile-button:hover {
  box-shadow: 5px 5px 10px #fd2b0131, -5px -5px 10px #ffd7d7;
  transform: scale(1.03);
  background: #fecbc7;
}

.logout-button,
.profile-button {
  position: absolute;
  color: #4e5166;
  padding: 15px;
  border-radius: 10px;
  font-size: 1em;
  transition: all 0.3s ease-out;
}

.logout-button {
  right: 15px;
  top: 10px;
}

.profile-button {
  right: 175px;
  top: 10px;
}

.fa-user,
.fa-right-from-bracket {
  margin-right: 5px;
}

.logo {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 15em;
}

.modal-actions-buttons {
  display: flex;
}

.modal-button-cancel,
.modal-button-validate {
  margin: 30px 15px 0 15px;
  width: 50%;
}

@media (max-width: 540px) {
  .logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .nav-bar-buttons {
    height: 60px;
    z-index: 2;
    width: 100%;
    padding: unset;
    bottom: 0;
    position: fixed;
    background: white;
    box-shadow: 2px 2px 8px #fd2d01;
  }

  .profile-button,
  .logout-button {
    width: 50%;
    height: 100%;
    position: unset;
  }

  .profile-button:hover,
  .logout-button:hover {
    box-shadow: none;
    background: none;
  }
}
</style>