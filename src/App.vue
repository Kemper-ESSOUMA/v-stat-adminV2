<template>
  <div id="v-stat">
    <!-- Dashboard affiché si l'utilisateur est connecté -->
    <div class="dashboard" v-if="isLoggedIn">
      <AppBar />
      <SideBar />
      <div id="contentys" class="container-fluid">
        <router-view />
      </div>
    </div>

    <!-- Redirige vers les autres vues si l'utilisateur n'est pas connecté -->
    <div v-else>
      <router-view />
    </div>
  </div>

  <ShowToast />
  <DynamicDialog />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "@/layouts/default/AppBar.vue";
import SideBar from "@/layouts/default/SideBar.vue";
import { useAppStore } from "@/store/app";

export default defineComponent({
  name: "App",
  components: { AppBar, SideBar },
  data() {
    return {
      isLoading: false, // Pour afficher un indicateur de chargement si nécessaire
      Notifications_a_lire: {}, // Notifications non lues
    };
  },
  computed: {
    // Utilise une computed property pour vérifier si l'utilisateur est connecté
    isLoggedIn() {
      const appStore = useAppStore();
      return appStore.authenticated; // Vérifie si l'utilisateur est authentifié
    },
  },
  async beforeMount() {
    const appStore = useAppStore();

    // Vérifie les données du localStorage pour initialiser l'état d'authentification
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      const parsedUserData = JSON.parse(userData);
      appStore.setLogged(parsedUserData, token); // Définit les données de l'utilisateur et le token
    } else {
      appStore.logout(); // Déconnecte si aucune donnée n'est trouvée
      this.$router.push("/connexion"); // Redirige vers la page de connexion
    }
  },

  created() {
    const appStore = useAppStore();
    appStore.initializeAuth(); // Initialiser l'authentification lors du démarrage
  },
 mounted() {
   const appStore = useAppStore();
   console.log("logged =", appStore.authenticated);
   },
});
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
