import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue";
import Profil from "@/views/Profil.vue";
import AllPosts from "@/views/AllPosts.vue";

// import PostsComponent from "@/views/AllPosts.vue";// EN ATTENTE DE CREATION DE LA PAGE POSTS

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profil',
    path: '/profil', 
    component: Profil, 
    props:true 
  },
  {
    name: 'posts',
    path: '/all-posts',
    component: AllPosts,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;