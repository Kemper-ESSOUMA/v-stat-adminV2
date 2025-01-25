<template>
  <!-- Le composant column-chart -->
    <v-container class="flex-grow-1">
      <v-card-title>
        Remontées des votes
        <v-spacer></v-spacer>
        <v-row justify="center">
          <v-col>
            <column-chart :data="data" :colors="pieChartColors"></column-chart>
          </v-col>
        </v-row>
      </v-card-title>
    </v-container>

    <v-container class="flex-grow-1">
      <v-card-title>
        Nombre de participation par siège
        <v-spacer></v-spacer>
        <v-row justify="center">
          <v-col>
            <column-chart :data="data1" :colors="pieChartColors"></column-chart>
          </v-col>
        </v-row>
      </v-card-title>
    </v-container>
</template>



<script>
import { useAppStore } from "../../store/app";

const appStore = useAppStore();
export default {
  data: () => ({
    data: [],
    data1: [],
    pieChartColors: ['green', 'red', 'orange', 'orange', 'purple'],
    modalOpen: false,
    search: "",

    items: [
      {
        title: "Resultats Jours-J",
        disabled: true,
        //  href: "/tickets",
      },
      {
        title: "Accueil",
        disabled: false,
        href: "/",
      },
    ],
    headers: [
      { key: "siege", title: "Code siège" },
      { key: "centre_vote", title: "Centre de vote" },
      { key: "date", title: "Date" },
      { key: "participation_taux", title: "Nb. de participation" },
      { key: "trends_pdg", title: "Avis en faveur du PDG" },
      { key: "observation", title: "Observation" },
      // { key: "created_at", title: "Créer le", sortable: false },
      // { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],

    getAllCentre: [],

    fiche_remonte: {
      siege: "",
      centre_vote: "",
      date: "",
      participation_taux: 0,
      trends_pdg: "",
      observation: "",
      // currentUser: appStore.currentUser,
    },

    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    get_siege: [],
  }),

  mounted() {
    this.currentUser = appStore.currentUser;
    this.allSiege();
    this.get_all_donnees();
    this.getCentre();
    this.getStat();
    this.getStatByNbParicipation();
  },

  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async getStatByNbParicipation() {
      this.$axios
        .get("/voting_trends_sheet/get_stat_by_nb_participation")
        .then(async (response) => {
          console.log("stat1 =", response.data);
          this.data1 = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },

    async getStat(){
      this.$axios
        .get("/voting_trends_sheet/get_stat_by_zone")
        .then(async (response) => {
          console.log("stat =", response.data);
          this.data = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },
    async allSiege() {
      this.$axios
        .get("/siege/by_siege")
        .then((response) => {
          console.log("siege =", response.data);
          this.getSiege = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
      this.$axios
        .get("/siege/by_siege")
        .then((data) => {
          // Comptage des occurrences de chaque valeur
          console.log(data);
        })
        .catch((error) => console.error("Erreur :", error));
    },

    get_all_donnees() {
      const accessToken = appStore.token;
      console.log("test", accessToken);
      if (accessToken != null) {
        this.$axios
          .get("/voting_trends_sheet/by_zone")
          .then((response) => {
            console.log("get_all_donnees =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
      }
    },
    PostDonnee() {
      this.$axios
        .post("/voting_trends_sheet/add", this.fiche_remonte)
        .then((response) => {
          console.log("voting_trends_sheet =", response.data);
          this.get_all_donnees();
          this.modalOpen = false;
          this.fiche_remonte = "";
        })
        .catch((error) => {
          console.error("voting_trends_sheet error:", error);
        });
    },

    getCentre() {
      const accessToken = appStore.token;
      console.log("test", accessToken);
      if (accessToken != null) {
        this.$axios
          .get("/voting_centre/by_zone")
          .then((response) => {
            console.log("getCentre =", response.data);
            this.getAllCentre = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
      }
    },
  },
};
</script>
