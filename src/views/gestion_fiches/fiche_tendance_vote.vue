<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket"></v-icon>
          <v-card-title style="color: cadetblue;">
            Fiche de Tendance des votes

          </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
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
          Liste des fiches des tendances de vote
          <v-spacer></v-spacer>
          <v-autocomplete v-model="selectedProvince" label="Provinces"
            :items="['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9']" variant="outlined" outlined></v-autocomplete>
          <div style="width: 30%;"> <v-btn @click="onProvinceChange()" color="primary">
              Filtrer</v-btn><v-btn @click="get_all_burreau()" prepend-icon="mdi-sync" variant="tonal" class="ml-2"
              color="primary">Sync.</v-btn></div><br>
          <v-text-field v-model="search" label="Recherche"  variant="outlined" outlined></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-btn prepend-icon="mdi-eye" @click="sendInfo(item)"></v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
                </v-col>
                <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-download" @click="list = item.columns;" variant="plain"></v-btn>
                </v-col> -->
              </v-row>
            </v-container>
          </template>
        </v-data-table>

      </v-row>
    </v-container>

    <!-- modal d'ajout -->

  </v-container>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";

import * as XLSX from 'xlsx';
import moment from "moment";
// import { useAppStore } from '../../store/app'
// const appStore = useAppStore();


export default {
  components: {
    VDataTable,
  },
  data: () => ({
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

      { key: "siege", title: "siege" },
      { key: "centre", title: "centre" },
      { key: "date", title: "date" },
      { key: "participation", title: "participation" },
      { key: "tendance du centre", title: "tendance du centre" },
      { key: "observation", title: "observation" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    fiche_bureau_vote: {
      date: '',
      opening_time: '',
      electoral_list: true,
      situation_material: true,
      scrutineers_presence: true,
      office_climate: '',
      observation: '',
      siege: '',
      pol_sta_code: 'vide'
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
    this.get_all_burreau()
    // this.interval = setInterval(this.get_all_burreau, 5000); // Appel toutes les 5 secondes
  },
  methods: {

    get_all_burreau() {
      this.$axios
          .get("/polling_station_sheet/all/").then((response) => {
        console.log('ici = ', response.data)
        this.lists = response.data
      })
    },

    setBureauVote() {
        this.$axios
          .post("/polling_station_sheet/add", this.fiche_bureau_vote)
          .then((response) => {
            console.log("climat =", response.data);
            this.get_all_burreau()
            this.add = false
          })
          .catch((error) => {
            console.error("Post climat error:", error);
          });
    },
    onProvinceChange() {
      // Do something with this.selectedProvince
      if (this.selectedProvince == null) {
        this.get_all_burreau();
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
      this.get_all_burreau();

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
