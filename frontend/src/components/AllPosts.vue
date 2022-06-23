<template>
  <h1>Bonjour {{ user.firstname }}, Bienvenue sur le réseau social de Groupomania</h1>
</template>

<script>
import UserClass from '@/classes/UserClass'
export default {
    name: "AllPosts",
    data() {
        return {
            user: UserClass.user,
        };
    },
}
</script>

<style>

</style>