<template>
  <v-container>
              <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Fiche de rapport quotidient</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>


    <v-divider></v-divider>

    <v-container class="mt-8">
      <div style="display: flex;">
        <div style="width: 30%;"> <v-btn @click="generateExcel" color="primary" prepend-icon="mdi-file-excel">Générer le fichier
            Excel</v-btn></div>
        <!-- <div style="width: 30%;"> <v-file-input v-model="selectedFile" label="Choisir un fichier"
            accept=".xlsx"></v-file-input></div> -->
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
              <v-btn @click="get_all_mobilisation()" prepend-icon="mdi-sync" variant="tonal" class="ml-2"
              color="primary">Sync.</v-btn></div><br>
          <v-text-field v-model="search" label="Recherche"  variant="outlined" outlined></v-text-field>
          Liste des fiches des rapports quotidiennes
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-btn prepend-icon="mdi-eye" @click="openModal(item)"></v-btn>
                </v-col>
                <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
                </v-col> -->
                <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-download" @click="list = item.columns;" variant="plain"></v-btn>
                </v-col> -->
              </v-row>
            </v-container>


            <template>
      <v-app>
        <v-dialog v-model="modalOpen" max-width="900">
          <v-card id="facture">
            <v-card-text>
            <div class="container-fluid">

                <div>
                  <div >
                    <div class="row d-flex align-items-center mb-4">
                        <div class="col-3">
                            <img src="../../assets/1005.png" style="width: 200px">
                        </div>

                        <div class="col-3">
                            <img src="../../assets/1005.png"  style="width: 200px; margin-left: 280px; margin-bottom: 30px;">
                        </div>
                    </div>
                    <hr>
                </div>

            <h1 class="text-center py-3">FICHE RAPPORT QUOTIDIENT</h1><br>

                    <div class="row d-flex justify-content-between mb-4">
                        <div class="col-6 ">
                            <div class="">
                              <div class="row border border-dark mb-4">
                        <div class="col-md-6 border-right  border-secondary" >
                            <h2 class="m-2 ">Date: {{ quotidients.date }}</h2>
                        </div>

                    </div>
                        <div class="card-body p-2">

                          <strong> Zone : </strong>{{ quotidients.zone }} <br /><br />
                          <strong> Superviseur : </strong>{{ quotidients.supervisor }} <br /><br />
                          <strong> Nombre de mobilisation: </strong>{{ quotidients.nb_mobilization_sheet }} <br /><br />
                          <strong> Nombre d'incident: </strong>{{ quotidients.nb_incident_sheet }} <br /><br />
                          <strong> Nombre de fiche climat: </strong>{{ quotidients.nb_electoral_climate_sheet }} <br /><br />
                          <strong> Nombre de fiche de goodie: </strong>{{ quotidients.nb_goodies_sheet }} <br /><br />
                          <strong> Nombre de fiche de bureau de vote: </strong>{{ quotidients.nb_polling_station_sheet }} <br /><br />
                          <strong> Observation: </strong> {{ quotidients.observation }}<br />
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
              <span class="text-h5">Ajouter une fiche de rapport quotidient</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-autocomplete v-model="fiche_quotidien.zone" clearable label="zone superviseur *" :rules="rules.zone"
                      :items="users" item-title="lastname" item-value="zone" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer une zone" variant="outlined" outlined></v-autocomplete>
                  </v-col>
                  <!-- <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.zone" clearable variant="outlined" outlined label="Zone*"
                      hint="Veuillez entrer une zone" type="text" required></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.date" clearable variant="outlined" outlined label="Date*"
                      hint="Veuillez entrer une date" type="date" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-autocomplete v-model="fiche_quotidien.supervisor" clearable label="Nom superviseur *"
                      :rules="rules.supervisor" :items="users" item-title="lastname" item-value="lastname"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez entrer une zone"
                      variant="outlined" outlined></v-autocomplete>
                  </v-col>
                  <!-- <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.supervisor" clearable variant="outlined" outlined label="Nom superviseur*"
                      hint="Veuillez entrer le nom du supervisuer" type="text" required></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.nb_mobilization_sheet" clearable variant="outlined" outlined
                      label="Nombre de mobilisation*" hint="Veuillez entrer un nombre" type="number"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.nb_incident_sheet" clearable variant="outlined" outlined
                      label="Nombre d'incident*" hint="Veuillez entrer un nombre" type="number" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.nb_electoral_climate_sheet" clearable variant="outlined" outlined
                      label="Nombre de fiche climat*" hint="Veuillez entrer un nombre" type="number"
                      required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.nb_goodies_sheet" clearable variant="outlined" outlined
                      label="Nombr de fiche de goodie*" hint="Veuillez entrer un nombre" type="number"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_quotidien.nb_polling_station_sheet" clearable variant="outlined" outlined
                      label="Nombre de fiche bureau*" hint="Veuillez entrer un nombre" type="number"
                      required></v-text-field>
                  </v-col>*
                  <v-col cols="12" sm="12">
                    <v-textarea clearable label="Observation" v-model="fiche_quotidien.observation"
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
              <v-btn color="blue-darken-1" variant="text" @click="setRapport()">
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
    quotidient: {},
    quotidients: {},
    attributionDialog: false,
    updateDialog: false,
    dialog: false,
    search: "",
    items: [
      {
        title: "Fiche de bureau de vote",
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
      { key: "date", title: "date" },
      // { key: "zone", title: "zone" },
      { key: "supervisor", title: "Supervieur" },
      { key: "nb_mobilization_sheet", title: "Nbre de fiche de mobilisation" },
      { key: "nb_incident_sheet", title: "Nbre de fiche d'incident" },
      { key: "nb_electoral_climate_sheet", title: "Nbre de fiche de climat électoral" },
      { key: "nb_goodies_sheet", title: "Nbre de fiche de goodies" },
      { key: "nb_polling_station_sheet", title: "Nbre de fiche de bureau de vote" },
      { key: "observation", title: "Observation" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    fiche_quotidien: {
      date: "",
      zone: "",
      supervisor: "",
      nb_mobilization_sheet: 0,
      nb_incident_sheet: 0,
      nb_electoral_climate_sheet: 0,
      nb_goodies_sheet: 0,
      nb_polling_station_sheet: 0,
      observation: "",
      // signature: appStore.token,
      // zone_code: "",
    },
    list: {
      date: "",
      opening_time: "",
      office_climate: "",
      observation: "",
      arr_can_code: "",
      siege: "",
    },
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    add: false

  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.get_all_rapport()
    this.get_zone_code()
    // this.interval = setInterval(this.get_all_rapport, 5000); // Appel toutes les 5 secondes
  },
  methods: {
    openModal(data) {
      this.modalOpen = true;
      console.log('data.columns = ', data.columns);
      this.quotidient = data.columns;

      const quotidientIdToFind = this.quotidient.id;

      const foundItem = this.lists.find(item => item.id === quotidientIdToFind);

      if (foundItem) {
        console.log('quotidient found:', foundItem);
        this.quotidients = foundItem
        this.signatureImage = "data:image/png;base64," + foundItem.signature
      } else {
        console.log('quotidient not found in the list.');
      }

    },


    async get_zone_code() {
      this.$axios
          .get("/user/all").then((response) => {
        this.users = response.data;
        console.log('siege_user =', response.data);
      });
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

    get_all_rapport() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {


        this.$axios
          .get("/daily_report_sheet/by_zone")
          .then((response) => {
            console.log("rapport quotidien =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
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
                filename: "fiche-rapport-quotidient",
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

    setRapport() {
      const accessToken = appStore.token;

      if (accessToken !== null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,

        };

        this.$axios
          .post("/daily_report_sheet/add", this.fiche_quotidien)
          .then((response) => {
            console.log("fiche =", response.data);
            this.get_all_rapport()
            this.add = false
            this.fiche_quotidien = ''
          })
          .catch((error) => {
            console.error("Post fiche error:", error);
          });
      }
      // const accessToken = appStore.currentUser;

      // if (accessToken !== null) {
      //   const headers = {
      //     Authorization: `Bearer ${accessToken}`,

      //   };

      //   axios
      //     .post("/daily_report_sheet/add", this.fiche_quotidien, {
      //       headers: headers
      //     })
      //     .then((response) => {
      //       console.log("fiche =", response.data);

      //       this.get_all_rapport()
      //       this.add = false
      //     })
      //     .catch((error) => {
      //       console.error("Post climat error:", error);
      //     });
      // }
    },
    onProvinceChange() {
      // Do something with this.selectedProvince
      if (this.selectedProvince == null) {
        this.get_all_rapport();
      } else {
        this.$axios
          .get("/polling_station_sheet/by_siege/" + this.selectedProvince).then((response) => {
          console.log('Filtre = ', response.data)
          this.lists = response.data

        })
      }
      console.log("Selected Province:", this.selectedProvince);
    },


    generateExcel() {
      // Appeler la méthode pour récupérer les données depuis l'API
      this.get_all_rapport();

      // Attendre la fin de la requête API avant de générer le fichier Excel
      this.$nextTick(() => {
        const data = [
          // En-têtes
          ['date', 'opening_time', 'electoral_list', 'situation_material', 'scrutineers_presence', 'office_climate', 'observation', 'siege', 'pol_sta_code'],
          // Données depuis this.lists
          ...this.lists.map(item => [item.date, item.opening_time, item.electoral_list, item.situation_material, item.scrutineers_presence, item.office_climate, item.observation, item.siege, item.pol_sta_code])
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');

        XLSX.writeFile(wb, 'Données fiche burreau vote.xlsx');
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
