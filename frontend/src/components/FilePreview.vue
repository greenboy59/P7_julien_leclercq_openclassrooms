<template>
  <div id="preview-file-container">
    <div class="form-row">
      <div class="image-preview-wrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage">
      </div>
      <label v-show="!previewImage" for="input" class="label-file" :style="{ opacity: opacity }"><i class="fa-solid fa-folder-plus"></i>Choisir
        une image</label>
      <input id="input" class="form-row__input" ref="fileInput" name="postPic" type="file"
        accept="image/png, image/jpeg, image/gif" @input="pickFile" />
    </div>
    <button :disabled="isDisabled" class="button delete-image" @click="deleteImage()">
      <i class="fa-solid fa-circle-arrow-left"></i>
            Annuler
    </button>
  </div>
</template>

<script>

export default {
  name: "FilePreview",
    
    data() {
        return {
            previewImage: null,
            isDisabled: true,
        };
    },
    props: {
      opacity: Number,
    },
    methods: {
        selectImage() {
            this.$refs.fileInput.click();
        },
        deleteImage() {
            this.$refs.fileInput.value = null;
            this.previewImage = null;
            document.querySelector(".image-preview-wrapper").style.display = "none";
            this.$emit("reload-image");
            this.isDisabled = true;
        },
        pickFile() {
            this.isDisabled = false;
            let input = this.$refs.fileInput;
            let file = input.files;
            if (file && file[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                    document.querySelector(".image-preview-wrapper").style.display = "block";
                };
                reader.readAsDataURL(file[0]);
                this.$emit("upload", file[0]);
            }
        },
    },
};
</script>

<style scoped>
#preview-file-container {
z-index: 2;
position: relative;
}
.image-preview-wrapper {
  display: none;
  position: relative;
  width: 100%;
  border-radius: 16px;
  height: 210px;
  cursor: pointer;
  text-align: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.image-preview-wrapper:before {
  display: block;
  margin: 0 auto;
  transform: translateY(70%);
  opacity: 0;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 5em;
  color: rgba(253, 45, 1, 0.6);
  content: "\f07b";
}
.image-preview-wrapper:hover:before {
  opacity: 1;
}
.fa-circle-arrow-left {
  font-size: 1.2em;
}
.label-file {
  width: 100%;
  height: 210px;
  color: #fd2d01;
  border-radius: 16px;
  background-color: unset;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s all;
  opacity: 0;
}
.label-file:hover {
  box-shadow: 0.5px 0.5px 5px #fd2d01;
  background: rgba(255, 255, 255, 0.7);
  transition: 0.3s all;
  opacity: 1;
  cursor: pointer;
}
.form-row,
.form-row__input {
  width: 100%;
  cursor: pointer;
}
.form-row__input {
  display: none;
}

.fa-folder-plus {
  font-size: 5em;
}
button:disabled,
button:disabled:hover {
  background-color: unset;
  color: gainsboro;
}
</style>