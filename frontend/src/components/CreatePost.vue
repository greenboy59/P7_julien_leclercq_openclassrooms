<template>
  <div class="card">
    <form 
    class="text-editor"
    action="">
    <label for="post-text">Quelque chose a dire? </label>
    <textarea 
    class="form-row__input"
    name="post-text" 
    cols="30" rows="8"
    minlength="5"
    maxlength="2000"
    placeholder="Ecrivez quelque chose..."></textarea>
    </form>

  </div>
</template>

<script>
export default {
  name:"CreatePost"

}
</script>

<style scoped>
textarea {
  width: 100%;
  margin-top: 15px;
  resize : none;
}
</style>