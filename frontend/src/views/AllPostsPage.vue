<template>
  <div>
    <MainNav />
    <CreatePost />
    <AllPostsList />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import AllPostsList from "@/components/AllPostsList";
import CreatePost from "@/components/CreatePost";

export default {
  name: "AllPostsPage",
  components: { AllPostsList, CreatePost, MainNav },
};
</script>
