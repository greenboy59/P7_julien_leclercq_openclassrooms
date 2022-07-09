<template id="modal-template">
  <div class="modal-mask">
    <div class="modal-wrapper">
        <div class="card card-appear">
          <form
            id="Form"
            value="Reset form"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="onSubmit"
          >
            <div class="modal-text">
              <label for="post-text">
                <slot name="title">
                  <span>Souhaitez-vous vraiment vous déconnecter ?</span>
                </slot>
                <slot name="subtitle"></slot>
              </label>
              <slot name="text-area"></slot>
              <slot name="secondary-title"></slot>
              <slot name="secondary-subtitle"></slot>
              <slot name="upload-input"></slot>
            </div>
            <footer>
              <slot name="validate">
                <button
                  class="button modal-button-validate"
                  @click="$emit('logout')"
                >
                  Valider
                </button>
              </slot>
              <slot name="cancel">
                <button
                  class="button modal-button-cancel"
                  @click="$emit('close')"
                >
                  Annuler
                </button>
              </slot>
            </footer>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ModalWindow",
};
</script>

<style scoped>
span {
  font-size: 1.1em;
  font-weight: 400;
}
.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: table;
}
@-moz-document url-prefix() {
  .modal-mask {
    background-color: rgba(255, 215, 215, 0.5);
  }
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-text {
  margin-bottom: 20px;
}
.card {
  position: relative;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.card-appear {
  animation: card-appear 0.8s ease;
}
@keyframes card-appear {
  0% {
    transform: translateY(500%);
  }
  100% {
    transform: translateY(0%);
  }
}
footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.button {
  width: 50%;
  margin-top: 10px;
  font-size: 0.9em;
}
</style>
