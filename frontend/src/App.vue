<!-- <template>
  <img id="logo" alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Bienvenue sur le réseau social de Groupomania"/>
</template> -->

<template>
  <img id="logo" alt="Vue logo" src="./assets/logo.png" />
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
* {
  font-family: "Lato", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(62deg, #fd2d01 0%, #ffd7d7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
#logo {
  position: absolute;
  width: 300px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #4e5166;
  font-weight: 500;
}
.button {
  background: rgba(253, 45, 1, 0.5);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #fd2d01;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #fd2d01;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
