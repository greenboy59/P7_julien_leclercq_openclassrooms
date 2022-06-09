import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
// import Profile from "@/views/Profil.vue";

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  // { 
  //   name: 'profil',
  //   path: '/profil', 
  //   component: Profil, 
  //   props:true 
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;