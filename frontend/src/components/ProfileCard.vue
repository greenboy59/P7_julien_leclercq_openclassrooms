<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <h3 class="card__subtitle">
      {{ user.firstname }}
      {{ user.lastname }}
      <span>
        <br />
        Cliquez sur l'image pour la modifier</span
      >
    </h3>
    <div v-if="!image" id="image-wrapper">
      <img :src="user.image" alt="photo de profil" class="profile-picture" />
    </div>
    <FilePreview
      class="file-preview"
      @upload="setImage"
      @reload-image="reloadImage"
    />
    <button
      :disabled="!image"
      class="button validate-button"
      @click="modifyUser(user.userId)"
    >
      <i class="fas fa-edit modify"></i>
      Valider la modification
    </button>
  </div>
</template>

<script>
import UserClass from "@/classes/UserClass";
import FilePreview from "@/components/FilePreview";

export default {
  name: "ProfileCard",
  components: { FilePreview },

  data() {
    return {
      user: UserClass.user,
      id: this.$route.params.id,
      image: "",
    };
  },
  methods: {
    // Récupération de l'image
    setImage(payload) {
      this.image = payload;
    },

    reloadImage() {
      this.image = "";
    },

    async modifyUser(id) {
      const formData = new FormData();
      formData.append("image", this.image);

      try {
        const axiosConfig = {
          headers: { Authorization: `Bearer ${this.user.token}` },
        };
        const { data } = await this.axios.put(
          "/auth/" + id,
          formData,
          axiosConfig
        );
        this.user.image = data.image;
        UserClass.setUser(this.user);
        await this.$router.replace("/all-posts");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
}
.card__title {
  margin-bottom: 15px;
}
.card__subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
}
span {
  color: #fd2d01;
}
.profile-picture {
  position: absolute;
  height: 210px;
  left: 0;
  z-index: 1;
  margin-top: 1px;
}
h3 {
  margin-bottom: 15px;
}
#input {
  height: 500px;
}
img {
  width: 100%;
}
.validate-button {
  margin-top: 10px;
}
</style>
