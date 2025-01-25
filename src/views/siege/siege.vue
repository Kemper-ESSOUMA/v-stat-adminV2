<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
              <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary"> sièges</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>


    <v-divider></v-divider>

    <v-container class="mt-8">
      <div style="display: flex;">

        <div style="width: 30%;"> <v-file-input v-model="selectedFile" label="Choisir un fichier" accept=".xlsx"
            @change="handleFileChange"></v-file-input></div>
      </div>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>
          Listes des sièges
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">

              </v-row>
            </v-container>
          </template>
        </v-data-table>

      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";

import * as XLSX from 'xlsx';
import moment from "moment";

const appStore = useAppStore();
import { useAppStore } from '../../store/app'

export default {
  components: {
    VDataTable,
  },
  data: () => ({

    dialog: false,
    search: "",
    items: [
      {
        title: "sièges",
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

      { key: "libelle", title: "Libelle" },
      { key: "candidate", title: "Candidat" },
      { key: "nb_office", title: "Nbre de bureaux" },
      { key: "nb_registered", title: "Nbre d'enregistrements" },
    ],
    lists: [],

    list: {
      libelle: "",
      candidate: "",
      nb_office: "",
      nb_registered: "",
      zone: "",
      currentUser: appStore.currentUser,

    },

  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.get_all_siege();
    // this.interval = setInterval(this.get_all_siege, 5000); // Appel toutes les 5 secondes
  },
  methods: {

    // get_all_siege() {
    //   axios.get("/siege/all").then((response) => {
    //     console.log('siege = ', response.data)
    //     this.lists = response.data
    //   })
    // },

    async get_all_siege() {



        this.$axios
          .get("/siege/by_siege")
          .then((response) => {
            console.log("siege =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })


    },


    async add_siege() {
      console.log(this.list)
      this.$axios
          .post("/siege/add", this.list).then((response) => {
        this.list = {};
        console.log('Add siege =', response);
        this.add_siege();
        this.get_all_siege();

      })
        .catch((error) => {
          console.log(error.response.data.detail);
        });
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.readFile(file);
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Faites quelque chose avec jsonData, par exemple, le stocker dans le state Vue ou l'afficher dans la console
        jsonData[0][0] = "libelle"
        jsonData[0][1] = "candidate"
        jsonData[0][2] = "nb_office"
        jsonData[0][3] = "nb_registered"
        jsonData[0][4] = "zone"
        jsonData[0][5] = "province"
        jsonData[0][6] = "code"

        console.log(jsonData[0])
        const json = jsonData.map((element) => {
          const [libelle, candidate, nb_office, nb_registered, zone, province,code] = element;
          return { libelle, candidate, nb_office, nb_registered,zone, province,code };
        });

        json.shift();
        console.log(json)

        this.$axios
          .post("/siege/add_all", json).then((response) => {

          console.log('json =', response);
          this.get_all_siege();
        })
          .catch((error) => {
            console.log(error.response.data.detail);
          });
      };
      reader.readAsArrayBuffer(file);
    },
    extractData() {
      this.$refs.fileInput.click();
    },
  },

  computed: {
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    }
  },
};
</script>
