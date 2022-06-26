<template>
  <div>
    <MainNav />
    <CreatePost />
    <AllPosts />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import AllPosts from "@/components/AllPosts";
import CreatePost from "@/components/CreatePost";

export default {
  name: "AllPostsPage",
  components: { AllPosts, CreatePost, MainNav },
};
</script>
