<template>
  <nav id="navbarys" class="navbar navbar-expand-lg #navbar-light bg-light #fixed-top">
    <a class="navbar-brand" href="#">
      <img src="@/assets/LOGO V-STATS.png" alt="logo" class="" style="width: 100px;">

    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">


        </li>
        <li class="nav-item dropdown">

        </li>
        <li class="nav-item dropdown">
          <a class="btn rounded-pill btn-outline-secondary  mr-2" data-toggle="dropdown" href="#">
            <i class="fa-solid fa-chevron-down"></i>
             <img class="rounded-circle" width="25"
              height="20">
              {{ currentUser.firstname }} / {{ currentUser.lastname }}
          </a>

          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#mon-profil" class="dropdown-item" @click.prevent="openShowModal()">
              <i class="fas fa-user"></i> Mon profil
            </a>
            <a href="#se-deconnecter" class="dropdown-item text-danger" @click.prevent="logout">
              <i class="fas fa-arrow-right"></i> Se déconnecter
            </a>
          </div>
        </li>
        <li class="nav-item">
          <button class="btn btn-light mx-1" @click="openFullscreen()">
            <i class="fa-solid fa-display"></i>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAppStore } from "@/store/app";
import $ from "jquery";
// import MyProfile from '@/auth/MyProfile'



export default {
  name: 'NavBar',
  date() {
    return {
      nom: '',
      prenom: '',
      user: {}
    }
  },
  computed: {
    currentUser() {
      const appStore = useAppStore();
      return appStore.currentUser; // Accéder à l'utilisateur connecté
    },
    isLogged() {
      const appStore = useAppStore();
      return appStore.isLogged; // Vérifier si l'utilisateur est connecté
    },
  },

  mounted() {
    const appStore = localStorage.getItem("user");
    if (appStore) {
      try {
        this.user = JSON.parse(appStore);
      } catch (error) {
        console.error("Erreur lors de l'analyse JSON de user :", error);
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans localStorage");
    }

  },
  methods: {
    async logout() {
      const appStore = useAppStore(); // Assurez-vous d'utiliser le store ici
      // Déconnexion du store
      appStore.logout();
      // Redirection vers la page de connexion
      this.$router.push("/connexion");
      window.location.reload();
    },

    openProfile() {
      $('#btnmon-profil').click()
    },
    refreshGlobalKey() {
      this.$store.commit('setIsLoading', true)
      this.$store.commit('setGlobalKey')
      this.logout()
      setTimeout(() => {
        this.$store.commit('setIsLoading', false)
        window.cache.delete()
        window.location.reload()
      }, 10000)
    },

    openFullscreen() {
      var elem = document.getElementById("v-stat");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }

  }
}
</script>

<style scoped>
.bg-semi-light {
  background-color: rgba(255, 255, 255, 0.9)
}
</style>
