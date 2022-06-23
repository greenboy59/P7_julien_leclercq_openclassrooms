<template>
<div>
<a href="http://localhost:8080/all-posts"><img class="logo" src="../assets/icon-left-font-monochrome-white.svg" alt="logo Groupomania"/></a>
  <button 
  class="logout-button" 
  type="button"
  @click="onClickLogOut">
  <i class="fa-solid fa-right-from-bracket"></i>
  Se déconnecter
  </button>
  </div>
</template>

<script>
export default {
  name: "MainNav",

  methods: {
    onClickLogOut() {
      this.$router.replace("/profile");
    }
  }
}
</script>

<style scoped>
.logout-button {
  color: #4e5166;
   border-radius: 10px;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background: none;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: 0.3s all;
}
.logout-button:hover {
  border: white solid 1px;
  box-shadow: 1px 1px 5px #fd2d01;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transform: scale(1.02);
}
.logo {
  width: 200px;
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>