import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue";
import SignUp from "@/views/SignUpPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import PostsPage from "@/views/PostsPage";
import PostPage from "@/views/PostPage.vue";
import store from '@/store'

const routes = [
  {
    path: "/",
    name: "/",
    redirect: ('/login'),
    meta: { auth: false },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { auth: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { auth: false },
  },
  {
    path: "/profile/:id",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { auth: true },
  },
  {
    path: "/all-posts",
    name: "posts",
    component: PostsPage,
    meta: { auth: true },
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostPage,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Routes guard via le token et la meta auth
router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated && !to.meta.auth) {
    next("/all-posts")
  }
  if (to.meta.auth && !store.getters.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
