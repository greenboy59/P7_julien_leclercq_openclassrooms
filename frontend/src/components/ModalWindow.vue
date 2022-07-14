<template id="modal-template">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="card card-appear">
        <slot name="title" />
        <slot name="content" />
        <slot name="actions" />
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
