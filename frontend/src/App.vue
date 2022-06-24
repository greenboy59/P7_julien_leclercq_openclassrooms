<template>
  <router-view></router-view>
</template>

<script>
// On injecte les composants dans la div #app
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
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
#logo {
  position: absolute;
  width: 300px;
  height: 25%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
img {
  object-fit: fill;
  max-width: 100%;
  border-radius: 8px;
}
.errorMessage {
  font-weight: bold;
  text-align: center;
}
ul {
  margin-top: 15px;
 text-align: left;
 color: red;
}
li {
  list-style-type: circle;
}
a {
  text-decoration: none;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form-row__input::placeholder {
  color: #aaaaaa;
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
  color: #4e5166;
  font-weight: 500;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.button {
  background: #fd2d01;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s all ease-in-out;
}
.button:hover {
  cursor: pointer;
  background-color: #fd2d01;
  box-shadow: 1px 1px 5px grey;
  transform: scale(1.01);
  transition: 0.3s all;
}
button:disabled {
  background-color: gainsboro;
}
button:disabled:hover {
  background-color: gainsboro;
  cursor: not-allowed;
}
.card__action {
  color: #fd2d01;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
</style>