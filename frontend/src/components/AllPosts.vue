<template>
<div>
  <h1>Bonjour,<br>
   <strong>{{ user.firstname }} {{ user.lastname }}</strong>
  </h1>
  </div>
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

<style scoped>
h1 {
  position: absolute;
  top: 7%;
  left: 2%;
  color: rgba(255, 255, 255, 0.6);
}
strong {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}
</style>