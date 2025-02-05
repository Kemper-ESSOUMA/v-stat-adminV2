// Composables
import { createRouter, createWebHistory } from "vue-router";
// import store from './../store'
const routes = [
  // {

  // path: '/',
  // component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //   },
  // children: [
  //   {
  //     path: '',
  //     name: 'Home',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  //   },
  // ],

  // },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/connexion",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  //routes v2
  {
    path: "/",
    name: "home",
    component: () => import("@/views/v2/Home.vue"),
  },
  {
    path: "/mobilization",
    name: "mobilization",
    component: () => import("@/views/v2/mobilizations/IndexMobilization.vue"),
  },
  {
    path: "/climat",
    name: "climat",
    component: () => import("@/views/v2/climats/IndexClimat.vue"),
  },
  {
    path: "/incident",
    name: "incident",
    component: () => import("@/views/v2/alerte-indident/IndexIncident.vue"),
  },
  {
    path: "/goodies",
    name: "goodies",
    component: () => import("@/views/v2/goodies/IndexGoodie.vue"),
  },
  {
    path: "/bureaux",
    name: "bureaux",
    component: () => import("@/views/v2/bureau-vote/IndexBureau.vue"),
  },
  {
    path: "/votes",
    name: "votes",
    component: () => import("@/views/v2/votes/IndexVote.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/v2/users/IndexUsers.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/v2/map/carte.vue"),
  },
  {
    path: "/graphe",
    name: "graphe",
    component: () => import("@/views/v2/graphe/IndexvGraphe.vue"),
  },
  {
    path: "/controles",
    name: "controles",
    component: () => import("@/views/v2/controlers/IndexControlers.vue"),
  },

  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/connexion",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  //routes v2
  {
    path: "/",
    name: "home",
    component: () => import("@/views/v2/Home.vue"),
  },
  {
    path: "/mobilization",
    name: "mobilization",
    component: () => import("@/views/v2/mobilizations/IndexMobilization.vue"),
  },
  {
    path: "/climat",
    name: "climat",
    component: () => import("@/views/v2/climats/IndexClimat.vue"),
  },
  {
    path: "/incident",
    name: "incident",
    component: () => import("@/views/v2/alerte-indident/IndexIncident.vue"),
  },
  {
    path: "/goodies",
    name: "goodies",
    component: () => import("@/views/v2/goodies/IndexGoodie.vue"),
  },
  {
    path: "/bureaux",
    name: "bureaux",
    component: () => import("@/views/v2/bureau-vote/IndexBureau.vue"),
  },
  {
    path: "/votes",
    name: "votes",
    component: () => import("@/views/v2/votes/IndexVote.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/v2/users/IndexUsers.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/v2/map/carte.vue"),
  },
  {
    path: "/graphe",
    name: "graphe",
    component: () => import("@/views/v2/graphe/IndexvGraphe.vue"),
  },
  {
    path: "/national",
    name: "national",
    component: () => import("@/views/v2/map/VueNationale.vue"),
  },
  {
    path: "/international",
    name: "international",
    component: () => import("@/views/v2/map/VueInternationale.vue"),
  },
  {
    path: "/tendance",
    name: "tendance",
    component: () => import("@/views/v2/tendances/IndexTendance.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && localStorage.getItem("token") === "")
    next({ name: "Login" });
  else next();
});

export default router;
