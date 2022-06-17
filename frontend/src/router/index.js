import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue";
import Profil from "@/views/Profil.vue";
import AllPosts from "@/views/AllPosts.vue";

const routes = [
  { 
    path: '/', 
    name: 'login',
    component: Login,
    meta: { auth: false }
  },
  { 
    path: '/profil',
    name: 'profil', 
    component: Profil,
    meta: { auth: true }
  },
  {
    path: '/all-posts',
    name: 'posts',
    component: AllPosts,
    meta: { auth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Protection des routes front via le token et la meta auth
router.beforeEach((to, from, next) => {
  let token = JSON.parse( localStorage.getItem('token') );
   
  if (
    'auth' in to.meta &&
    to.meta.auth &&
    !token) {
    next('/');
  }
  else if (
    'auth' in to.meta &&
    !to.meta.auth
    && token) {
    next('/all-posts');
  }
  else {
    next();
  }
});

export default router;