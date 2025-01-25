<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Fiche d'alerte et d'incident</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>


    <v-divider></v-divider>

    <v-container class="mt-8">
      <div style="display: flex;">
        <div style="width: 30%;"> <v-btn @click="generateExcel" color="primary" prepend-icon="mdi-file-excel">Générer le
            fichier
            Excel</v-btn></div>
        <!-- <div style="width: 30%;"> <v-file-input v-model="selectedFile" label="Choisir un fichier"
            accept=".xlsx" ></v-file-input></div> -->
        <v-btn @click="add = true" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn>
      </div>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>

          <v-spacer></v-spacer>
          <!-- <v-autocomplete v-model="selectedProvince" label="Provinces"
            :items="['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9']" variant="outlined" outlined></v-autocomplete> -->
          <div style="width: 30%;">
            <!-- <v-btn @click="onProvinceChange()" color="primary">
              Filtrer</v-btn> -->
            <v-btn @click="get_all_incident()" prepend-icon="mdi-sync" variant="tonal" class="ml-2"
              color="primary">Sync.</v-btn>
          </div><br>
          <v-text-field v-model="search" label="Recherche" variant="outlined" outlined></v-text-field>
          Liste des fiches d'alertes et d'incidents
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <!-- <v-btn prepend-icon="mdi-download" @click="list = item.columns;" variant="plain"></v-btn> -->
                  <v-col cols="6">
                    <v-btn prepend-icon="mdi-eye" @click="openModal(item)"></v-btn>
                  </v-col>
                  <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
                </v-col> -->
                </v-col>
              </v-row>
            </v-container>

            <template>
              <v-app>
                <v-dialog v-model="modalOpen" max-width="900">
                  <v-card id="facture">
                    <v-card-text>
                      <div class="container-fluid">

                        <div>
                          <div>
                            <div class="row d-flex align-items-center mb-4">
                              <div class="col-3">
                                <img src="../../assets/1005.png" style="width: 200px">
                              </div>

                              <div class="col-3">
                                <img src="../../assets/1005.png"
                                  style="width: 200px; margin-left: 280px; margin-bottom: 30px;">
                              </div>
                            </div>
                            <hr>
                          </div>

                          <h1 class="text-center py-3">FICHE INCIDENT</h1>

                          <div class="row d-flex justify-content-between mb-4">
                            <div class="col-6 ">
                              <div class="">
                                <div class="row border border-dark mb-4">
                                  <div class="col-md-6 border-right  border-secondary">
                                    <h2 class="m-2 ">Date: {{ incidents.date }}</h2>
                                  </div>

                                </div>
                                <div class="card-body p-2">
                                  <strong> Type: </strong> {{ incidents.type }}<br /><br />
                                  <strong> Evenement : </strong>{{ incidents.event }} <br /><br />
                                  <strong> Situation: </strong> {{ incidents.criticality_situation }}<br />
                                  <strong> Recommendation: </strong> {{ incidents.recommendation }}<br /><br />
                                  <strong> Description: </strong> {{ incidents.description }}<br /><br />
                                </div>
                              </div>
                            </div>
                          </div><br><br><br><br><br>



                          <div class="mx-5 d-flex justify-content-between mt-3 ">
                            <div class="">
                              <h4>Signature</h4>
                              <img id="signatureImage" :src="signatureImage" alt="Signature graphique">
                            </div>

                          </div>

                        </div>
                      </div>
                    </v-card-text>

                  </v-card>
                  <v-card-actions class="bg-white" style="border-radius: 5px;">
                    <v-btn color="primary" @click="download">Télécharger le PDF</v-btn>
                    <v-btn color="primary" text @click="modalOpen = false">Fermer</v-btn>
                  </v-card-actions>
                </v-dialog>
              </v-app>
            </template>
          </template>
        </v-data-table>

      </v-row>
    </v-container>

    <!-- modal d'ajout -->
    <v-row justify="center">
      <v-dialog v-model="add" persistent width="1024">
        <v-card>
          <v-form ref="form">
            <v-card-title>
              <span class="text-h5">Ajouter une fiche de suivi des incidents</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="fiche_incident.siege" clearable label="siege *" :rules="rules.siege"
                      :items="getSiege" item-title="libelle" item-value="code" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer le siege" variant="outlined" outlined></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field v-model="fiche_incident.type" clearable variant="outlined" outlined label="Type*"
                      hint="Veuillez entrer un type" type="text" required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field v-model="fiche_incident.date" clearable variant="outlined" outlined label="Date*"
                      hint="Veuillez entrer une Date" type="date" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">

                    <v-autocomplete v-model="fiche_incident.event" clearable label="Evenement *" :rules="rules.role"
                      :items="['Campagne', 'Jour du vote',]" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez choisissez l'evenement" variant="outlined" outlined></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">

                    <v-autocomplete v-model="fiche_incident.criticality_situation" clearable
                      label="Criticité de la situation *" :rules="rules.role" :items="['Critique', 'Grave', 'Majeur',]"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez choisissez la criticité de la situation"
                      variant="outlined" outlined></v-autocomplete>
                  </v-col>
                  <!-- <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_incident.event" clearable variant="outlined" outlined label="Evenement*"
                      hint="Veuillez entrer un évenement" type="text" required></v-text-field>
                  </v-col> -->

                  <!-- <v-col cols="12" sm="6">
                    <v-autocomplete v-model="fiche_incident.zone_code" clearable label="zone *" :rules="rules.zone_code"
                      :items="users" item-title="firstname" item-value="zone" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer une zone" variant="outlined" outlined></v-autocomplete>
                  </v-col> -->
                  <!-- <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_incident.zone_code" clearable variant="outlined" outlined label="Code Zone*"
                      hint="Veuillez entrer un code zone" type="text" required></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="12">

                    <v-textarea v-model="fiche_incident.description" clearable label="description"
                      prepend-icon="mdi-text-box-edit" variant="outlined" outlined></v-textarea>
                  </v-col>

                  <v-col cols="12" sm="12">

                    <v-textarea v-model="fiche_incident.recommendation" clearable label="Recommendation"
                      prepend-icon="mdi-text-box-edit" variant="outlined" outlined></v-textarea>
                  </v-col>


                </v-row>
              </v-container>
              <small class="text-danger">*Champs obligatoires</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="
                add = false;
              ">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="setIncident()">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";

import * as XLSX from 'xlsx';
import moment from "moment";
import { useAppStore } from '../../store/app'
const appStore = useAppStore();
import html2pdf from "html2pdf.js";

export default {
  components: {
    VDataTable,
  },
  data: () => ({
    modalOpen: false,
    incident: {},
    incidents: {},
    attributionDialog: false,
    updateDialog: false,
    dialog: false,
    search: "",
    items: [
      {
        title: "Fiche d'alerte et d'incident",
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
      { key: "id", title: "#" },
      { key: "type", title: "Type" },
      { key: "date", title: "Date" },
      { key: "event", title: "Evenemment" },
      { key: "zone_code", title: "siege" },
      { key: "recommendation", title: "Recommendation" },
      { key: "criticality_situation", title: "Criticité de la situation" },
      { key: "created_at", title: "Créer le", sortable: false },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    fiche_incident: {
      type: '',
      event: '',
      criticality_situation: '',
      description: '',
      recommendation: '',
      // currentUser: appStore.currentUser,
      siege: '',
      zone_code: ''
    },
    zone_code: [],
    list: {
      type: "",
      date: "",
      event: "",
      criticality_situation: "",
      zone_code: "",
      recommendation: "",

    },
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    add: false

  }),

  mounted() {
    this.get_all_incident();
    this.get_siege();
    // this.get_zone_code();
    // this.interval = setInterval(this.get_all_incident, 5000); // Appel toutes les 5 secondes
  },
  methods: {
    openModal(data) {
      this.modalOpen = true;
      console.log('data.columns = ', data.columns);
      this.incident = data.columns;

      const incidentIdToFind = this.incident.id;

      const foundItem = this.lists.find(item => item.id === incidentIdToFind);

      if (foundItem) {
        console.log('incident found:', foundItem);
        this.incidents = foundItem
        this.signatureImage = "data:image/png;base64," + foundItem.signature
      } else {
        console.log('incident not found in the list.');
      }

    },
    async get_siege() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        this.$axios
          .get("/siege/by_siege")
          .then((response) => {
            console.log("siege =", response.data);
            this.getSiege = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }

    },

    download() {
      this.see = true
      html2pdf().set({
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        margin: [0.5, 0.5],
        filename: "fiche-incident",
        html2canvas: { scale: 2 },
        image: { type: 'jpeg', quality: 0.98 },
      }).from(document.getElementById("facture"))
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          var totalPages = pdf.internal.getNumberOfPages();
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          for (var i = 1; i <= totalPages; i++) {
            pdf.setPage(i);

          }
        })
        .save();
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },


    async get_zone_code() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        this.$axios
          .get("/user/all")
          .then((response) => {
            console.log("siege_user =", response.data);
            this.zone_code = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }
      // axios.get("/user/all").then((response) => {
      //   this.users = response.data;
      //   console.log('siege_user =', response.data);
      // });
    },


    get_all_incident() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        this.$axios
          .get("/incident/by_zone")
          .then((response) => {
            console.log("incident =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }

    },

    // get_all_incident() {
    //   axios.get("/incident/all").then((response) => {
    //     console.log('incident = ', response.data)
    //     this.lists = response.data
    //   })
    // },

    setIncident() {
      const accessToken = appStore.token;

      if (accessToken !== null) {
        this.$axios
          .post("/incident/add", this.fiche_incident)
          .then((response) => {
            console.log("incident =", response.data);
            this.get_all_incident()
            this.add = false
            this.fiche_incident = '';
          })
          .catch((error) => {
            console.error("Post incident error:", error);
          });
      }
    },
    onProvinceChange() {
      // Do something with this.selectedProvince
      if (this.selectedProvince == null) {
        this.get_all_incident();
      } else {
        this.$axios
          .get("/incident/by_siege/" + this.selectedProvince).then((response) => {
            console.log('Filtre = ', response.data)
            this.lists = response.data

          })
      }
      console.log("Selected Province:", this.selectedProvince);
    },


    generateExcel() {
      // Appeler la méthode pour récupérer les données depuis l'API
      this.get_all_incident();

      // Attendre la fin de la requête API avant de générer le fichier Excel
      this.$nextTick(() => {
        const data = [
          // En-têtes
          ['type', 'event', 'criticality_situation', 'description', 'recommendation', 'siege', 'zone_code'],
          // Données depuis this.lists
          ...this.lists.map(item => [item.type, item.event, item.criticality_situation, item.description, item.recommendation, item.siege, item.zone_code])
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');

        XLSX.writeFile(wb, 'Données alerte.xlsx');
      });
    }


  },

  computed: {
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    }
  },
};
</script>
