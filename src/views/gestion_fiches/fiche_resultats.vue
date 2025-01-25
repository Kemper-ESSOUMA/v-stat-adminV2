<template>
  <v-container>
          <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Fiche des remontées des votes</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <br /><br />
    <div style="display: flex">
      <div style="width: 30%">
        <v-file-input v-model="selectedFile" label="Choisir un fichier" accept=".xlsx"
          @change="handleFileChange"></v-file-input>
      </div>
      <v-btn @click="openModal" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn>

      <!-- <v-btn @click="add = true" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn> -->
    </div>
    <br /><br />
    <v-card-title style="width: 20%">
      <v-text-field v-model="search" label="Recherche"  variant="outlined"
        outlined></v-text-field>
      Liste fiches des remontées
    </v-card-title>
    <v-data-table :headers="headers" :items="lists" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-container>
          <v-row justify="center" align="center">
            <v-col>
              <!-- <v-btn prepend-icon="mdi-eye" @click="test()"></v-btn> -->
            </v-col>
            <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
                </v-col> -->
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </v-container>
  <!-- Le composant column-chart -->
  <v-row justify="center">
    <v-dialog v-model="modalOpen" persistent max-width="1024px">
      <v-card>
        <v-card-title>Ajouter une remontées de votes</v-card-title>
        <v-card>
          <v-form ref="form">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="fiche_remonte.date" clearable variant="outlined" outlined label="Date*"
                      hint="Veuillez entrer un type" type="date" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="fiche_remonte.siege" clearable label="Siege *" :rules="rules.siege"
                      :items="getSiege" item-title="libelle" item-value="libelle" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer le siege" variant="outlined" outlined></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="fiche_remonte.centre_vote" clearable label="Centre vote *"
                      :rules="rules.centre_vote" :items="getAllCentre" item-title="libelle" item-value="libelle"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez choisir" variant="outlined"
                      outlined></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="fiche_remonte.participation_taux" clearable variant="outlined" outlined
                      label="Estimation du nombre de votants*" hint="Veuillez entrer en " type="number"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="fiche_remonte.trends_pdg" clearable label="Tendance en faveur du PDG *"
                      :rules="rules.trends_pdg" :items="['Favorable', 'Indécis', 'Défavorable']"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez choisir" variant="outlined"
                      outlined></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-textarea v-model="fiche_remonte.observation" clearable label="Observations/Suggestions"
                      prepend-icon="mdi-text-box-edit" variant="outlined" outlined></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small class="text-danger">*Champs obligatoires</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="PostDonnee()">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useAppStore } from "../../store/app";

const appStore = useAppStore();
export default {
  components: {
    VDataTable,
  },

  data: () => ({
    data: [],
    pieChartColors: ["green", "red", "orange", "orange", "purple"],
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
      { key: "siege", title: "Siège" },
      // { key: "centre_vote", title: "Libelle " },
      { key: "centre_vote", title: "Libelle" },
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
  },

  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },

    async getStat() {
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
          .get("/voting_trends_sheet/all")
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
          console.log('remonte', this.fiche_remonte)
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
