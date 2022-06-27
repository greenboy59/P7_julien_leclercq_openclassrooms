<template>
  <div class="nav-container">
    <div
      class="nav-back"
      @mouseover="hovered = true"
      @mouseleave="hovered = false"
    >
      <a href="http://localhost:8080/all-posts">
        <div class="return-arrow" v-if="hovered">
          <i class="fa-solid fa-chevron-left"></i>
          Retour
        </div>

        <img
          :class="{ 'display-none': hovered }"
          class="logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo Groupomania"
        />
      </a>
    </div>
    <button class="logout-button" type="button" @click="onClickLogOut">
      <i class="fa-solid fa-right-from-bracket"></i>
      Se déconnecter
    </button>
  </div>
</template>

<script>
export default {
  name: "MainNav",

  data() {
    return {
      hovered: false,
    };
  },

  methods: {
    onClickLogOut() {
      this.$router.replace("/profile");
    },
  },
};
</script>

<style scoped>
.nav-container {
  display: block;
  height: 50px;
}
.logout-button {
  color: #4e5166;
  border-radius: 10px;
  font-size: 1.1em;
  padding: 15px;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  position: absolute;
  right: 15px;
  top: 10px;
  transition: 0.3s all;
}
.logout-button:hover {
  box-shadow: 3px 3px 10px #fd2b0131, -5px -5px 10px #ffd7d7;
  transform: scale(1.03);
  border-radius: 10px;
  background: #fecbc7;
}
.logo,
.nav-back,
.return-arrow {
  width: 200px;
  height: 50px;
  position: absolute;
  top: 10px;
  left: 15px;
}
.display-none {
  display: none;
}
.return-arrow {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
