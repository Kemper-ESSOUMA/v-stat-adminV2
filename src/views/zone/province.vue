<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
     <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Provinces</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>

    <v-divider class="my-4"></v-divider>
    <v-container class="mt-8">
      <v-row justify="space-between" class="mb-4">
        <v-file-input v-model="selectedFile" label="Choisir un fichier" accept=".xlsx" @change="handleFileChange"
          variant="outlined" class="file-input"></v-file-input>
      </v-row>

      <v-card class="mt-8">
       <v-spacer></v-spacer>
        <v-card-title>
          Tableau des provinces
          <v-spacer></v-spacer>
         <v-text-field v-model="search" label="Recherche"  class="search-bar" variant="outlined" outlined></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center">
                <v-col cols="6">

                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;">Modifier</v-btn>

                </v-col>
                <v-col cols="6">

                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;">Supprimer</v-btn>

                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-table>

      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useSuperviseurStore } from '@/store/superviseurs';
import * as XLSX from 'xlsx';

const superviseurs_store = useSuperviseurStore(); // Initialisez le store
const superviseur = superviseurs_store.superviseurs
console.log(superviseur);

const appStore = useAppStore();
import { useAppStore } from '../../store/app'

export default {
  components: {
    VDataTable,
  },
  data: () => ({
    searchId: null,
    selectedItem: null,

    attributionDialog: false,
    updateDialog: false,
    dialog: false,
    show1: false,
    password: "root",
    search: "",
    items: [
      {
       
        disabled: true,
      },
      {
        title: "Accueil",
        disabled: false,
        href: "/",
      },
    ],
    headers: [
    { key: "code", title: "Code" },
      { key: "libelle", title: "Libelle" },
      { key: "total_registered", title: "Total des inscrits" },
      { key: "total_offices", title: "Total des burreaux" },

    ],
    lists: [],

    list: {
      code: "",
      libelle: "",
      total_registered: "",
      total_offices: "",

    },



  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.getAllProvinces()
  },
  methods: {




    getAllProvinces() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
        this.$axios
          .get("province/all", {
            headers: headers
          })
          .then((response) => {
            console.log("province =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }

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
        jsonData[0][0] = "firstname"
        jsonData[0][1] = "lastname"
        jsonData[0][2] = "phone"
        jsonData[0][3] = "email"
        jsonData[0][4] = "role"
        jsonData[0][5] = "password"
        jsonData[0][6] = "zone"
        console.log(jsonData[0])
        const json = jsonData.map((element) => {
          const [firstname, lastname, phone, email, role, password, zone] = element;
          return { firstname, lastname, phone, email, role, password, zone };
        });

        json.shift();
        console.log(json)

        this.$axios
          .post("user/add_all", json).then((response) => {

          console.log('json =', response);
          this.getAllSuperviseur();
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


};
</script>
