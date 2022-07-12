<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <div v-if="user.image || image" id="post-image-wrapper"  @click="deleteImage(user.userId)">
        <img
         v-if="!image"
          :src="user.image"
          :alt="user.image"
          class="profile-picture"
        />
      </div>
    <h3 class="card__subtitle">{{ user.firstname }} {{ user.lastname }}</h3>
     <FilePreview @upload="setImage" />
      <button class="button" @click="modifyUser(user.userId)">
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

    async modifyUser(id) {
      const formData = new FormData();
      formData.append("image", this.image);

      try {
        const axiosConfig = {headers: { Authorization: `Bearer ${this.user.token}` }}
        const { data } = await this.axios.put("/auth/" + id, formData, axiosConfig)
        await this.$router.replace("/all-posts");
        this.user.image = data.image
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
#post-image-wrapper {
  position: relative;
  cursor: pointer;
}
.card__title {
  margin-bottom: 15px;
}
.card__subtitle {
  margin-top: 10px;
}
img {
  border-radius: 16px;
  width: 100%;
  height: 300px;
}
</style>
