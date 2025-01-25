<template>
  <v-container>
      <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary"> Fiche de climat Electoral
          </v-card-title>
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
            Excel</v-btn>

          <v-btn @click="add = true" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn>

        </div>

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
            <v-btn @click="get_all_climat()" prepend-icon="mdi-sync" variant="tonal" class="ml-2"
              color="primary">Sync.</v-btn>
          </div><br>
          <v-text-field v-model="search" label="Recherche"  variant="outlined" outlined></v-text-field>
          Liste des fiches de climat Electoral
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-col cols="6">
                    <v-btn prepend-icon="mdi-eye" @click="openModal(item)"></v-btn>
                  </v-col>
                  <!-- <v-col cols="6">
                    <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
                  </v-col> -->
                  <!-- <v-btn prepend-icon="mdi-download" @click="list = item.columns;" variant="plain"></v-btn
                  > -->
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>
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

            <h1 class="text-center py-3">FICHE CLIMAT</h1>

                    <div class="row d-flex justify-content-between mb-4">
                        <div class="col-6 ">
                            <div class="">
                              <div class="row border border-dark mb-4">
                        <div class="col-md-6 border-right  border-secondary" >
                            <h2 class="m-2 ">Date: {{ climats.date }}</h2>
                        </div>

                    </div>
                        <div class="card-body p-2">

                          <strong> Circonscription électorale : </strong>{{ climats.electoral_seat }} <br /><br />
                          <strong> Intention : </strong>{{ climats.intention }} <br /><br />
                          <strong> Recommendation: </strong>{{ climats.recommendation }} <br /><br />
                          <strong> Justification: </strong> {{ climats.justification }}<br />
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

    <!-- modal d'ajout -->
    <v-row justify="center">
      <v-dialog v-model="add" persistent width="1024">
        <v-card>
          <v-form ref="form">
            <v-card-title>
              <span class="text-h5">Ajouter une fiche de suivi de climat</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_climat.electoral_seat" clearable variant="outlined" outlined
                      label="Siège électoral*" hint="Veuillez entrer un siège électoral" type="text"
                      required></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6">
                  <v-autocomplete v-model="fiche_climat.electoral_seat" clearable label="siege *" :rules="rules.electoral_seat"
                    :items="getSiege" item-title="libelle" item-value="code" prepend-icon="mdi-text-box-edit"
                    hint="Veuillez entrer le siege" variant="outlined" outlined></v-autocomplete>
                </v-col>
                  <v-col cols="12" sm="3">
                    <v-autocomplete v-model="fiche_climat.zone_code" clearable label="Superviseur *" :rules="rules.zone_code"
                      :items="users" item-title="firstname" item-value="zone" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer un superviseur" variant="outlined" outlined></v-autocomplete>
                    <!-- <v-text-field v-model="fiche_climat.zone_code" clearable variant="outlined" outlined label="Code Zone*"
                      hint="Veuillez entrer le code de zone" type="number" required></v-text-field> -->
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="fiche_climat.date" clearable variant="outlined" outlined label="Date*"
                      hint="Veuillez entrer la date" type="date" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-autocomplete v-model="fiche_climat.intention" clearable
                      label="Intention de vote PDG *" :rules="rules.intention"
                      :items="['Favorable', 'Plutôt Favorable','Indécis', 'Plutôt défavorable', 'Défavorable']"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez choisir" variant="outlined" outlined></v-autocomplete>
                    <!-- <v-text-field v-model="fiche_climat.intention" clearable variant="outlined" outlined label="Intention*"
                      hint="Veuillez entrer une intention" type="text" required></v-text-field> -->
                  </v-col>
                  <v-col cols="12" sm="12">

                    <v-textarea v-model="fiche_climat.justification" clearable label="Justification"
                      prepend-icon="mdi-text-box-edit" variant="outlined" outlined></v-textarea>
                  </v-col>

                  <v-col cols="12" sm="12">

                    <v-textarea v-model="fiche_climat.recommendation" clearable label="Recommandation"
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
              <v-btn color="blue-darken-1" variant="text" @click="setClimat()">
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
    attributionDialog: false,
    updateDialog: false,
    dialog: false,
    see: false,
    search: "",
    items: [
      {
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
      { key: "electoral_seat", title: "Siege électoral" },
      { key: "date", title: "Date" },
      { key: "intention", title: "Intention" },
       { key: "zone_code", title: "Siege" },
      { key: "justification", title: "Justification" },
      { key: "created_at", title: "Créer le", sortable: false },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],

    list: {
      electoral_seat: "",
      date: "",
      intention: "",
      justification: "",
      //  currentUser: appStore.currentUser,
      zone_code: "",

    },
    getSiege: [],
    fiche_climat: {
      electoral_seat: "",
      date: "",
      intention: "",
      justification: "",
      recommendation: "",
      zone_code: "",
      signature: null,
      // currentUser: appStore.currentUser,
    },
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    add: false,
    climat: {},
    climats: {}

  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.get_all_climat();
     this.get_zone_code();
     this.get_siege();
    // this.interval = setInterval(this.get_all_climat, 5000); // Appel toutes les 5 secondes
  },
  methods: {

    async get_siege() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
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

    openModal(data) {
      this.modalOpen = true;
      console.log('data = ', data.columns)
      this.climat = data.columns

      const climatIdToFind = this.climat.id;

      const foundItem = this.lists.find(item => item.id === climatIdToFind);

      if (foundItem) {
        console.log('climat found:', foundItem);
        this.climats = foundItem
        this.signatureImage = "data:image/png;base64," + foundItem.signature
      } else {
        console.log('climat not found in the list.');
      }
    },

    async downloadPDF() {
      const pdfData = this.lists; // Utilisez les données pour générer le contenu du PDF
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'fiche climat.pdf';
      link.click();

      URL.revokeObjectURL(url);
    },

    download() {
            this.see = true
            html2pdf().set({
                pagebreak: { mode: 'avoid-all' },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                margin: [0.5, 0.5],
                filename: "fiche-climat",
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
      this.$axios
          .get("/user/all").then((response) => {
        this.users = response.data;
        console.log('siege_user =', response.data);
      });
    },

    get_all_climat() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
        this.$axios
          .get("/electoral_climate_sheet/by_zone")
          .then((response) => {
            console.log("Climat =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }

    },

    // get_all_climat() {
    //   axios.get("/electoral_climate_sheet/all").then((response) => {
    //     console.log('Climat = ', response.data)
    //     this.lists = response.data
    //   })
    // },

    onProvinceChange() {
      // Do something with this.selectedProvince
      if (this.selectedProvince == null) {
        this.get_all_climat();
      } else {
        this.$axios
          .get("/electoral_climate_sheet/by_siege/" + this.selectedProvince).then((response) => {
          console.log('Filtre = ', response.data)
          this.lists = response.data

        })
      }
      console.log("Selected Province:", this.selectedProvince);
    },

    setClimat() {
      const accessToken = appStore.token;

      if (accessToken !== null) {
        

        this.$axios
          .post("/electoral_climate_sheet/add", this.fiche_climat)
          .then((response) => {
            console.log("climat =", response.data);
            this.get_all_climat()
            this.add = false
            this.fiche_climat = ''
          })
          .catch((error) => {
            console.error("Post climat error:", error);
          });
      }
    },
    generateExcel() {
      // Appeler la méthode pour récupérer les données depuis l'API
      this.get_all_climat();

      // Attendre la fin de la requête API avant de générer le fichier Excel
      this.$nextTick(() => {
        const data = [
          // En-têtes
          ['electoral_seat', 'date', 'intention', 'justification', 'recommendation'],
          // Données depuis this.lists
          ...this.lists.map(item => [item.electoral_seat, item.date, item.intention, item.justification, item.recommendation])
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');

        XLSX.writeFile(wb, 'Données climat electoral.xlsx');
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
