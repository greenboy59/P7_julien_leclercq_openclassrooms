<template>
  <div>
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
.logout-button {
  color: #4e5166;
  border-radius: 10px;
  font-size: 1.1em;
  padding: 10px;
  cursor: pointer;
  border: none;
  background: none;
  position: absolute;
  top: 15px;
  right: 20px;
  transition: 0.3s all;
}
.logout-button:hover {
  border: rgba(255, 255, 255, 0.2) solid 1px;
  box-shadow: 1px 1px 5px #fd2d01;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transform: scale(1.02);
}
.nav-back {
  position: absolute;
  left: 20px;
  top: 20px;
}
.logo, .nav-back {
  width: 200px;
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
