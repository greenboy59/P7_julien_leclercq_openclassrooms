<template>
  <div>
    <MainNav />
    <AllPosts />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import AllPosts from "@/components/AllPosts.vue";

export default {
  name: "AllPostsPage",
  components: { AllPosts, MainNav },
};
</script>

<style></style>
