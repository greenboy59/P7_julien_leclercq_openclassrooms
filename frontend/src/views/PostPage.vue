<template>
    <MainNav />
    <PostCard />
</template>

<script>
import MainNav from "@/components/MainNav";
import PostCard from "@/components/PostCard";

export default {
  name: "PostPage",
  components: { PostCard, MainNav },
};
</script>
