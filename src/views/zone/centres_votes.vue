<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary"> Saisie résultats</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>

    <v-divider></v-divider>

    <v-container class="mt-8">
      <v-row>

        <div style="width: 30%;">

          <v-file-input v-model="selectedFile" label="Choisir un fichier" accept=".xlsx"
            @change="handleFileChange"></v-file-input>

          <!-- <v-btn @click="openModal" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn> -->

          <v-btn @click="Modal" color="primary" prepend-icon="mdi-update" class="ml-2">Mettre à jour</v-btn>

        </div>

      </v-row>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>
          liste des centres de votes
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="outlined"
            outlined></v-text-field>
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

  <!-- AJOUTER -->
  <v-row justify="center">
    <v-dialog v-model="modalOpen" persistent max-width="1024">
      <v-card>
        <v-card-title>Ajouter une remontées de votes</v-card-title>
        <v-card>
          <v-form ref="form">
            <v-card-text>
              <v-container>
                <v-row>

                  <v-col cols="12" sm="5">
                    <v-text-field v-model="centre_vote.code" clearable variant="outlined" outlined label="code*"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez entrer un code" type="number"
                      required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="5">
                    <v-text-field v-model="centre_vote.libelle" clearable variant="outlined" outlined
                      prepend-icon="mdi-text-box-edit" label="libelle *" hint="Veuillez entrer  le libelle" type="text"
                      required></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-autocomplete v-model="centre_vote.zone" clearable label="zone *" :rules="rules.zone"
                      :items="getSiege" item-title="libelle" item-value="code" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer le zone" variant="outlined" outlined></v-autocomplete>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.total_scrutin" clearable label="total_scrutin"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.total_registered" clearable label="total_registered"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.nb_bulletin_blanc" clearable label="nb_bulletin_blanc"
                      prepend-icon="mdi-text-box-edit" type="number" @input="NbScrutinValide" variant="outlined"
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.nb_abstention" clearable label="nb_abstention"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.nb_scrutin_valide" clearable label="nb_scrutin_valide"
                      prepend-icon="mdi-text-box-edit" type="number" :readonly="true" variant="outlined"
                      outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_1" clearable label="PDG"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_2" clearable label="UN"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_3" clearable label="DONG SIMA"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_4" clearable label="ONDO OSSA"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_5" clearable label="RPM"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="centre_vote.candidate_6" clearable label="AUTRES"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <!-- <small class="text-danger">*Champs obligatoires</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeModal">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="PostCentres()">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- METTRE A JOURS -->
  <v-row justify="center">
    <v-dialog v-model="modalOpen_update" persistent max-width="1024">
      <v-card>
        <v-card-title>Mettre à jour les résultats de votes</v-card-title>
        <v-card>
          <v-form ref="form">
            <v-card-text>
              <v-container>
                <v-row>

                  <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Outlined" placeholder="Placeholder" outlined
                      @change="updateCategory($event, category)"
                      @blur="updateCategory($event.target.value, category)"></v-text-field>
                  </v-col> -->

                  <v-col cols="12" sm="8">
                    <v-autocomplete v-model="update_centre_vote.code" clearable label="Centre *" :rules="code"
                      :items="lists" item-title="libelle" item-value="code" item-code="total_registred"
                      prepend-icon="mdi-text-box-edit" hint="Veuillez selectionner le centre" variant="outlined"
                      outlined @change="updateCategory($event, category)"
                      @blur="updateCategory($event.target.value, category)"></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.burreau_code" clearable label="Bureau" :rules="code"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined
                      hint="Veuillez entrer le bureau"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.total_registered" clearable label="Total inscrit"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined
                      hint="Veuillez entrer le total inscrit"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.total_scrutin" @input="nb_abstention" clearable
                      label="Votants" prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined
                      hint="Veuillez entrer le nombre votant"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.nb_abstention" clearable label="Nb. Abstention"
                      prepend-icon="mdi-text-box-edit" type="number" :readonly="true" variant="outlined"
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.nb_bulletin_blanc" clearable label="Nb. Bulletin blanc"
                      prepend-icon="mdi-text-box-edit" type="number" @input="updateNbScrutinValide" variant="outlined"
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.nb_scrutin_valide" clearable label="Suffrage exprimé"
                      prepend-icon="mdi-text-box-edit" type="number" :readonly="true" variant="outlined"
                      outlined></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.candidate_1" clearable label="Candidat 1"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.candidate_2" clearable label="Candidat 2"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field v-model="update_centre_vote.candidate_3" clearable label="Candidat 3"
                      prepend-icon="mdi-text-box-edit" type="number" variant="outlined" outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <!-- <small class="text-danger">*Champs obligatoires</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="Ferme">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="Update_centre()">
                Mise à jour
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
import { useSuperviseurStore } from '@/store/superviseurs';
import * as XLSX from 'xlsx';

const superviseurs_store = useSuperviseurStore(); // Initialisez le store
const superviseur = superviseurs_store.superviseurs
console.log(superviseur);

const appStore = useAppStore();
import { useAppStore } from '../../store/app'

export default {


  props: {
    selectedUser: Object, // Utilisateur sélectionné depuis UserList.vue
  },
  computed: {
    userAge() {
      return this.selectedUser ? this.selectedUser.total_registered : '';
    },
  },
  components: {
    VDataTable,
  },
  data: () => ({
    category: [],
    modalOpen: false,
    modalOpen_update: false,
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
        title: "Saisie résultats",
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
      // { key: "zone", title: " Code zone" },
      // { key: "burreau_code", title: " Bureaux" },
      { key: "total_registered", title: "Total Enregistré" },
      { key: "total_scrutin", title: "Votants" },
      { key: "nb_bulletin_blanc", title: "Total Bulletin blanc" },
      { key: "nb_abstention", title: "NB. Abstention" },
      { key: "nb_scrutin_valide", title: "Surfrage exprimé" },
      { key: "candidate_1", title: "Candidat 1" },
      { key: "candidate_2", title: "Candidat 2" },
      { key: "candidate_3", title: "Candidat 3" },
      // { key: "candidate_4", title: "Candidat 4" },
      // { key: "candidate_5", title: "Candidat 5" },
      // { key: "candidate_6", title: "Candidat 6" },

    ],
    lists: [],
    centreVote: [],

    centre_vote: {
      code: "",
      libelle: "",
      zone: "",
      total_registered: 0,
      total_scrutin: 0,
      nb_bulletin_blanc: 0,
      nb_abstention: 0,
      nb_scrutin_valide: 0,
      candidate_1: 0,
      candidate_2: 0,
      candidate_3: 0,
      candidate_4: 0,
      candidate_5: 0,
      candidate_6: 0,

    },

    update_centre_vote: {
      code: "",
      burreau_code: "",
      zone: "",
      total_registered: null,
      total_scrutin: null,
      nb_bulletin_blanc: null,
      nb_abstention: null,
      nb_scrutin_valide: null,
      candidate_1: null,
      candidate_2: null,
      candidate_3: null,
      candidate_4: null,
      candidate_5: null,
      candidate_6: null,

    },
    code: [
      (value) => !!value || "Veuillez entrer un code utilisateur",
    ],



  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.getAllCentres();
    this.allSiege();
  },
  methods: {



    updateCategory(event, category) {
      category = 'ok'
      console.log(event, category);
    },


    Modal() {
      // this.modalOpen = true;
      this.modalOpen_update = true;
    },
    Ferme() {
      this.modalOpen_update = false;
    },

    openModal() {
      this.modalOpen = true;
      //  this.modalOpen_update = true;
    },

    closeModal() {
      this.modalOpen = false;
    },
    updateNbScrutinValide() {
      const totalScrutin = this.update_centre_vote.total_scrutin || 0;
      const nbBulletinBlanc = this.update_centre_vote.nb_bulletin_blanc || 0;
      this.update_centre_vote.nb_scrutin_valide = totalScrutin - nbBulletinBlanc;
    },


    // NbScrutinValide() {
    //   const totalScrutin = this.centre_vote.total_scrutin || 0;
    //   const nbBulletinBlanc = this.centre_vote.nb_bulletin_blanc || 0;
    //   this.centre_vote.nb_scrutin_valide = totalScrutin - nbBulletinBlanc;
    // },

    //   autres() {
    //   const VOTANT = parseInt(this.update_centre_vote.total_scrutin) || 0;
    //   const ONDO = parseInt(this.update_centre_vote.candidate_2) || 0;
    //   const PDG = parseInt(this.update_centre_vote.candidate_1) || 0;
    //   const NULL = parseInt(this.update_centre_vote.nb_bulletin_blanc) || 0;

    //   this.update_centre_vote.candidate_3 = VOTANT - NULL - PDG - ONDO;
    // },




    nb_abstention() {
      const inscrit = this.update_centre_vote.total_registered || 0;
      const votant = this.update_centre_vote.total_scrutin || 0;
      this.update_centre_vote.nb_abstention = inscrit - votant;
    },

    allSiege() {

      this.$axios
        .get("/siege/by_siege")
        .then((response) => {
          console.log("siege =", response.data);
          this.getSiege = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        })
    },

    PostCentres() {
      this.$axios
        .post("/voting_centre/add", this.centre_vote)
        .then((response) => {
          console.log("voting_centre =", response.data);
          this.getAllCentres();
          this.modalOpen = false;
          this.centre_vote = '';


        })
        .catch((error) => {
          console.error("voting_centre error:", error);
        });

    },


    Update_centre() {

      this.$axios
        .post("/voting_centre/update", this.update_centre_vote)
        .then((response) => {
          console.log("voting_centre =", response.data);

          this.getAllCentres();
          this.modalOpen_update = false;
          // this.update_centre_vote.code ='';
          // this.update_centre_vote.burreau_code ='';
          // this.update_centre_vote.burreau_code ='';
          // this.update_centre_vote.burreau_code ='';
          this.update_centre_vote = {
            code: "",
            burreau_code: "",
            zone: "",
            total_registered: null,
            total_scrutin: null,
            nb_bulletin_blanc: null,
            nb_abstention: null,
            nb_scrutin_valide: null,
            candidate_1: null,
            candidate_2: null,
            candidate_3: null,
            candidate_4: null,
            candidate_5: null,
            candidate_6: null,

          }


        })
        .catch((error) => {
          console.error("voting_centre error:", error);
        });

    },


    getAllCentres() {
      this.$axios
        .get("/voting_centre/by_zone")
        .then((response) => {
          console.log("voting_centre =", response.data);
          this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        })
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
        jsonData[0][1] = "zone"
        jsonData[0][2] = "total_registered"
        jsonData[0][3] = "total_scrutin"
        jsonData[0][4] = "nb_bulletin_blanc"
        jsonData[0][5] = "nb_abstention"
        jsonData[0][6] = "nb_scrutin_valide"
        jsonData[0][7] = "candidate_1"
        jsonData[0][8] = "candidate_2"
        jsonData[0][9] = "candidate_3"
        jsonData[0][10] = "candidate_4"
        jsonData[0][11] = "candidate_5"
        jsonData[0][12] = "candidate_6"
        jsonData[0][12] = "siege_code"
        console.log(jsonData[0])
        const json = jsonData.map((element) => {
          const [libelle, zone, total_registered, total_scrutin, nb_bulletin_blanc, nb_abstention, nb_scrutin_valide, candidate_1, candidate_2, candidate_3, candidate_4, candidate_5, candidate_6, siege_code] = element;
          return { libelle, zone, total_registered, total_scrutin, nb_bulletin_blanc, nb_abstention, nb_scrutin_valide, candidate_1, candidate_2, candidate_3, candidate_4, candidate_5, candidate_6, siege_code };
        });

        json.shift();
        console.log(json)

        this.$axios
          .post("/voting_centre/add_all", json).then((response) => {

            console.log('json =', response);
            this.getAllCentres();
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
