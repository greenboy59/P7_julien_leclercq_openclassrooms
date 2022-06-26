import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginPage.vue";
import SignUp from "@/views/SignUpPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import AllPostsPage from "@/views/AllPostsPage.vue";
import UserClass from "@/classes/UserClass";

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
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { auth: true },
  },
  {
    path: "/all-posts",
    name: "posts",
    component: AllPostsPage,
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Routes guard via le token et la meta auth
router.beforeEach((to, from, next) => {
  if (UserClass.isAuthenticated && !to.meta.auth) {
    next("/all-posts")
  }
  if (to.meta.auth && !UserClass.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;