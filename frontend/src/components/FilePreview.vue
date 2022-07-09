<template>
  <div class="form-row">
     <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    >
    </div>
    <input
      id="input"
      class="form-row__input"
      ref="fileInput"
      name="postPic"
      type="file"
      @input="pickFile"
    />
     <button class="delete-image" @click="deleteImage()">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "FilePreview",

  data() {
    return {
      previewImage: null,
    };
  },

  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },

    deleteImage() {
      this.$refs.fileInput.value = null;
      document.querySelector(".imagePreviewWrapper").style.display = "none";
    },

    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
          document.querySelector(".imagePreviewWrapper").style.display = "block";
        };
        reader.readAsDataURL(file[0]);
        this.$emit("upload", file[0]);
      }
    },
  },
};
</script>

<style scoped>
.imagePreviewWrapper {
  display: none;
  position: relative;
  width: 100%;
  border-radius: 16px;
  height: 200px;
  cursor: pointer;
  margin: 0 auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.imagePreviewWrapper:before {
  display: block;
  margin: 0 auto;
  transform: translateY(70%);
  opacity: 0;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 5em;
  color: rgba(255, 255, 255, 0.6);
  content: "\f07b";
}
.imagePreviewWrapper:hover:before {
  opacity: 1;
}
.delete-image {
  cursor: pointer;
  font-size: 1.4em;
  border: none;
  outline: none;
  background: none;
  color: red;
}
.form-row,
.form-row__input {
  position: relative;
  width: 100%;
}
</style>
