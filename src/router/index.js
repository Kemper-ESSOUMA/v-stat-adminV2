// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from './../store'
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
        component: () =>
            import ("@/views/Home.vue"),
        // children: [{
        //         path: "bureaux_votes",
        //         name: "bureaux_votes",
        //         component: () =>
        //             import ("@/views/gestion_bureaux_vote/Bureaux_voteView.vue"),
        //     },
        //     {
        //         path: "/superviseurs",
        //         name: "superviseurs",
        //         component: () =>
        //             import ("@/views/gestion_des_superviseurs/SuperviseursView.vue"),
        //     },
        //     {
        //         path: "/calendriers",
        //         name: "calendriers",
        //         component: () =>
        //             import ("@/views/gestion_calendriers/CalendriersView.vue"),
        //     },
        //     {
        //         path: "/anlyse_donnees",
        //         name: "anlyse_donnees",
        //         component: () =>
        //             import ("@/views/gestion_analyse_données/Analyse_donneesView.vue"),
        //     },
        //     {
        //         path: "/map",
        //         name: "map",
        //         component: () =>
        //             import ("@/views/map_localisation/Carte.vue"),
        //     },
        //     {
        //         path: "/fiche_mobilisation",
        //         name: "fiche_mobilisation",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_mobilisation.vue"),
        //     },
        //     {
        //         path: "/fiche_climat",
        //         name: "fiche_climat",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_climat.vue"),
        //     },
        //     {
        //         path: "/fiche_goodies",
        //         name: "fiche_goodies",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_goodies.vue"),
        //     },
        //     {
        //         path: "/fiche_remonte_incident",
        //         name: "fiche_remonte_incident",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_remonte_incident.vue"),
        //     },
        //     {
        //         path: "/fiche_bureaux_vote",
        //         name: "fiche_bureaux_vote",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_bureaux_vote.vue"),
        //     },
        //     {
        //         path: "/fiche_rapport_quotidient",
        //         name: "fiche_rapport_quotidient",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_rapport_quotidient.vue"),
        //     },
        //     {
        //         path: "/siege",
        //         name: "siege",
        //         component: () =>
        //             import ("@/views/siege/siege.vue"),
        //     },
        //     {
        //         path: "/province",
        //         name: "province",
        //         component: () =>
        //             import ("@/views/zone/province.vue"),
        //     },
        //     {
        //         path: "/departement_commune",
        //         name: "departement_commune",
        //         component: () =>
        //             import ("@/views/zone/departement_commune.vue"),
        //     },
        //     {
        //         path: "/arrondissement_canton",
        //         name: "arrondissement_canton",
        //         component: () =>
        //             import ("@/views/zone/arrondissement_canton.vue"),
        //     },
        //     {
        //         path: "/centres_votes",
        //         name: "centres_votes",
        //         component: () =>
        //             import ("@/views/zone/centres_votes.vue"),
        //     },
        //     {
        //         path: "/national",
        //         name: "national",
        //         component: () =>
        //             import ("@/views/resultats_vote/National.vue"),
        //     },
        //     {
        //         path: "/international",
        //         name: "international",
        //         component: () =>
        //             import ("@/views/resultats_vote/International.vue"),
        //     },
        //     {
        //         path: "/estuaire",
        //         name: "estuaire",
        //         component: () =>
        //             import ("@/views/resultats_vote/Estuaire.vue"),
        //     },
        //     {
        //         path: "/haut_ogooue",
        //         name: "haut_ogooue",
        //         component: () =>
        //             import ("@/views/resultats_vote/haut_ogooue.vue"),
        //     },
        //     {
        //         path: "/moyen_ogooue",
        //         name: "moyen_ogooue",
        //         component: () =>
        //             import ("@/views/resultats_vote/moyen_ogooue.vue"),
        //     },
        //     {
        //         path: "/ngounie",
        //         name: "ngounie",
        //         component: () =>
        //             import ("@/views/resultats_vote/ngounie.vue"),
        //     },
        //     {
        //         path: "/nyanga",
        //         name: "nyanga",
        //         component: () =>
        //             import ("@/views/resultats_vote/nyanga.vue"),
        //     },
        //     {
        //         path: "/ogooue_ivindo",
        //         name: "ogooue_ivindo",
        //         component: () =>
        //             import ("@/views/resultats_vote/ogooue_ivindo.vue"),
        //     },
        //     {
        //         path: "/ogooue_lolo",
        //         name: "ogooue_lolo",
        //         component: () =>
        //             import ("@/views/resultats_vote/ogooue_lolo.vue"),
        //     },
        //     {
        //         path: "/ogooue_maritime",
        //         name: "ogooue_maritime",
        //         component: () =>
        //             import ("@/views/resultats_vote/ogooue_maritime.vue"),
        //     },
        //     {
        //         path: "/woleu_ntem",
        //         name: "woleu_ntem",
        //         component: () =>
        //             import ("@/views/resultats_vote/woleu_ntem.vue"),
        //     },
        //     {
        //         path: "/saisir_tendance_vote",
        //         name: "saisir_tendance_vote",
        //         component: () =>
        //             import ("@/views/gestion_fiches/fiche_resultats.vue"),
        //     },
        //     {
        //         path: "/tendance_de_vote",
        //         name: "tendance_de_vote",
        //         component: () =>
        //             import ("@/views/gestion_fiches/graphe_tendance.vue"),
        //     },
        // ],
    },
    {
        path: "/connexion",
        name: "Login",
        component: () =>
            import ("@/views/LoginView.vue"),
    },
    //routes v2
    {
        path: "/",
        name: "home",
        component: () =>
            import ("@/views/v2/Home.vue"),
    },
    {
        path: "/mobilization",
        name: "mobilization",
        component: () =>
            import ("@/views/v2/mobilizations/IndexMobilization.vue"),
    },
    {
        path: "/climat",
        name: "climat",
        component: () =>
            import ("@/views/v2/climats/IndexClimat.vue"),
    },
    {
        path: "/incident",
        name: "incident",
        component: () =>
            import ("@/views/v2/alerte-indident/IndexIncident.vue"),
    },
    {
        path: "/goodies",
        name: "goodies",
        component: () =>
            import ("@/views/v2/goodies/IndexGoodie.vue"),
    },
    {
        path: "/bureaux",
        name: "bureaux",
        component: () =>
            import ("@/views/v2/bureau-vote/IndexBureau.vue"),
    },
    {
        path: "/votes",
        name: "votes",
        component: () =>
            import ("@/views/v2/votes/IndexVote.vue"),
    },
    {
        path: "/users",
        name: "users",
        component: () =>
            import ("@/views/v2/users/IndexUsers.vue"),
    },
    {
        path: "/map",
        name: "map",
        component: () =>
            import ("@/views/v2/map/carte.vue"),
    },
    {
        path: "/graphe",
        name: "graphe",
        component: () =>
            import ("@/views/v2/graphe/IndexvGraphe.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && localStorage.getItem("token") === '') next({ name: 'Login' })
    else next()
})

export default router