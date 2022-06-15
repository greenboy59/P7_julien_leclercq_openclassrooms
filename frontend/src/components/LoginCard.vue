<template>
  <div>
    <div class="card">
      <h1 class="card__title">{{ title }}</h1>
      <div class="card__subtitle">
      <h4>{{ subtitle }}</h4>
        <span class="card__action" @click="onClickActionText">{{ actionText }}</span>
        </div>
        <slot/>
        <!-- <button
          v-if="mode === 'login'"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          @click="login()"
        >
          <span v-if="status === 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button
          v-else
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          @click="createAccount()"
        >
          <span v-if="status === 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button> -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'LoginCard',
  props: {
    title: {
      type: String,
    required: true
    },
  subtitle: {
      type: String,
    required: true
    },
  actionText: {
      type: String,
    required: true
    },
  },
methods: {
      onClickActionText() {
    this.$emit('action-text-click')
    }
  }
}

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