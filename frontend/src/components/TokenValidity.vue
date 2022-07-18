<template>
  <ModalWindow v-show="showModal">
    <template #title>
      <h3>Vous avez été déconnecté automatiquement</h3>
    </template>
    <template #actions>
      <button class="button modal-button-validate" @click="redirectToLogin()">
        Se reconnecter
      </button>
    </template>
  </ModalWindow>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import { checkTokenValidity } from "@/helpers/utils";
import UserClass from "@/classes/UserClass";

export default {
  name: "TokenValidity",
  components: { ModalWindow },

  async beforeMount() {
    if (UserClass.isAuthenticated) {
      const isTokenValid = checkTokenValidity();
      if (!isTokenValid) {
        return this.logoutAndShowModal();
      }
    }
  },

  data() {
    return {
      showModal: false,
    };
  },

  methods: {
    logoutAndShowModal() {
      localStorage.removeItem("user");
      this.showModal = true;
    },

    redirectToLogin() {
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.modal-button-validate {
  width: fit-content;
  margin: 5px;
}
</style>
