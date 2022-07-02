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
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");
* {
  font-family: "Lato", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
  margin-top: 5%;
}
body {
  background-image: linear-gradient(62deg, #fd2d01 0%, #ffd7d7 100%);
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 32px;
}
#logo {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
}
img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
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
  height: fit-content;
  background: white;
  border-radius: 16px;
  padding: 25px;
}
.card p {
  margin: 20px 0;
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
.posts-options {
  margin-top: 15px;
  display: flex;
}
.button {
  background: #fd2d01;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  width: 100%;
  padding: 16px;
  transition: 0.4s all ease-in-out;
}
button {
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
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
textarea {
  width: 100%;
  max-height: 100px;
  resize: none;
}
textarea:focus,
input:focus {
  outline-color: #ffd7d7;
  box-shadow: 1px 1px 5px #fd2d01;
}
.error-message {
  font-weight: bold;
}
.message {
  bottom: 5px;
  color: green;
  font-size: 0.8em;
}
@media (max-width: 540px) {
  body {
    padding: 0;
    justify-content: unset;
  }
   .card {
    border-radius: 0;
  }
}
</style>