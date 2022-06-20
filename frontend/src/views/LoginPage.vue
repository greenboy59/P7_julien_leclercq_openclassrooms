<template>
  <div>
    <img id="logo" alt="Groupomania logo" src="../assets/logo.png" />
    <LoginCard v-if="mode === 'login'" @action-text-click="switchMode" />
    <SignUpCard v-else @action-text-click="switchMode" />
  </div>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue";
import SignUpCard from "@/components/SignUpCard.vue";

export default {
  name: "LoginPage",
  components: { SignUpCard, LoginCard },
  data() {
    return {
      mode: "login",
    };
  },

  methods: {
    switchMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style scoped>
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
</style>
