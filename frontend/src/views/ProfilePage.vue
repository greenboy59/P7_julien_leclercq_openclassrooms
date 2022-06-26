<template>
  <div>
    <MainNav />
    <ProfileCard />
  </div>
</template>

<script>
import MainNav from "@/components/MainNav";
import ProfileCard from "@/components/ProfileCard";

export default {
  name: "ProfilePage",
  components: { MainNav, ProfileCard },
};
</script>