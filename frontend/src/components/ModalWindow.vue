<template id="modal-template">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="card">
              <div class="modal-text">
                Souhaitez-vous vraiment vous déconnecter ?
              </div>
              <footer>
                <button class="button" @click="$emit('logOut')">Se déconnecter</button>
                <button class="button" @click="$emit('close')">Annuler</button>
              </footer>
            </div>
          </div>
        </div>
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
.button{
  margin-top: 10px;
} 
.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-text {
  margin-bottom: 20px;
}
.card {
  text-align: center;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-enter-active {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
</style>
