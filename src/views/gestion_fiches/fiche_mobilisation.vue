<template>
  <v-container>
      <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Fiche des mobilisations</v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>

    <v-divider></v-divider>

    <v-container class="mt-8">
      <div style="display: flex">
        <div style="width: 30%">
          <v-btn @click="generateExcel" color="primary" prepend-icon="mdi-file-excel">Générer le fichier Excel</v-btn>

          <v-btn @click="add = true" color="primary" prepend-icon="mdi-plus" class="ml-2">Ajouter</v-btn>
        </div>

      </div>

      <v-row class="mt-8">

        <br /><br />
        <v-card-title>

          <v-spacer></v-spacer>
          <!-- <v-autocomplete v-model="selectedProvince" label="Provinces"
            :items="['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9']" variant="outlined" outlined></v-autocomplete> -->
          <div style="width: 30%">
            <!-- <v-btn @click="onProvinceChange()" color="primary"> Filtrer</v-btn> -->
            <v-btn @click="get_all_mobilisation()" prepend-icon="mdi-sync" variant="tonal" class="ml-2"
              color="primary">Sync.</v-btn>
          </div><br>
          <v-text-field v-model="search" label="Recherche"  variant="outlined" outlined></v-text-field>
          Listes des fiches de Mobilisation
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center">
                <v-col>

                  <v-btn prepend-icon="mdi-eye" @click="openModal(item)"></v-btn>

                </v-col>
                <!-- <v-col cols="6">
                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>
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

                          <h1 class="text-center py-3">FICHE MOBILISATION</h1>

                          <div class="row d-flex justify-content-between mb-4">
                            <div class="col-6 ">
                              <div class="">
                                <div class="row border border-dark mb-4">
                                  <div class="col-md-6 border-right  border-secondary">
                                    <h2 class="m-2 ">Date: {{ mobile.date }}</h2>
                                  </div>

                                </div>
                                <div class="card-body p-2">
                                  <strong> Siège : </strong>{{ mobile.siege }} <br /><br />
                                  <strong> Type : </strong>{{ mobile.type }} <br /><br />
                                  <strong> Place : </strong>{{ mobile.place }} <br /><br />
                                  <strong> Nombre de participant : </strong>{{ mobile.participants_nb }} <br /><br />
                                  <strong> Organisateur: </strong>{{ mobile.organizer }} <br /><br />
                                  <strong> Opinion générale: </strong> {{ mobile.general_opinion }}<br />
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
  </v-container>



  <!-- modal d'ajout -->
  <v-row justify="center">
    <v-dialog v-model="add" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Ajouter une fiche de suivi de mobilisation</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="fiche_mobilisation.siege" clearable label="siege *" :rules="rules.siege"
                    :items="getSiege" item-title="libelle" item-value="code" prepend-icon="mdi-text-box-edit"
                    hint="Veuillez entrer le siege" variant="outlined" outlined></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field v-model="fiche_mobilisation.type" clearable variant="outlined" outlined label="Type*"
                    hint="Veuillez entrer le type" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field v-model="fiche_mobilisation.date" clearable variant="outlined" outlined label="Date*"
                    hint="Veuillez entrer la date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field v-model="fiche_mobilisation.place" variant="outlined" outlined clearable label="Lieu*"
                    hint="Veuillez entrer le place"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-model="fiche_mobilisation.organizer" variant="outlined" outlined clearable
                    label="Organisateur*" hint="Veuillez entrer l'organizer"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field v-model="fiche_mobilisation.participants_nb" clearable variant="outlined" outlined
                    label="Nombre de participant*" hint="Veuillez entrer le nombre de participant"
                    type="number"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                  <v-autocomplete v-model="fiche_mobilisation.zone_code" clearable label="zone *" :rules="rules.zone_code"
                    :items="users" item-title="firstname" item-value="zone" prepend-icon="mdi-text-box-edit"
                    hint="Veuillez entrer une zone" variant="outlined" outlined></v-autocomplete>
                </v-col> -->
                <h3>Elements de contrôle :</h3><br><br>
                <v-col cols="12" sm="3">
                  <v-checkbox label="Respect element de language"
                    v-model="fiche_mobilisation.language_element"></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-checkbox label="Respect de charte grphique"
                    v-model="fiche_mobilisation.graphical_charter"></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-checkbox label="Respect format des causeries" v-model="fiche_mobilisation.talk_format"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-textarea clearable label="Description" prepend-icon="mdi-text-box-edit"
                    variant="outlined" outlined></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea clearable label="Avis général" v-model="fiche_mobilisation.general_opinion"
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
            <v-btn color="blue-darken-1" variant="text" @click="post_mobilisation()">
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- Modal modifier un Mobilisation :------------------------------------------------------------------------------------------------------------------------------------------>
  <!-- <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Mobilisation : {{ list.id }}</span>
          </v-card-title>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field v-model="list.siege" clearable variant="outlined" outlined label="Siège*"
                hint="Veuillez entrer le Siège" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field v-model="list.date" clearable variant="outlined" outlined label="Date*"
                hint="Veuillez entrer la date" type="date" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field v-model="list.place" variant="outlined" outlined clearable label="place*"
                hint="Veuillez entrer le place"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model="list.organizer" variant="outlined" outlined clearable label="organizer*"
                hint="Veuillez entrer l'organizer"></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <v-text-field v-model="list.participants_nb" clearable variant="outlined" outlined label="Nombre de participant*"
                hint="Veuillez entrer le nombre de participant" type="number"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea v-model="list.general_opinion" clearable label="Description" prepend-icon="mdi-text-box-edit"
                variant="outlined" outlined></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updateMobilisation()">
              Modifier
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row> -->
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useAppStore } from '../../store/app'
const appStore = useAppStore();
import * as XLSX from "xlsx";
import moment from "moment";
import html2pdf from "html2pdf.js";

export default {
  components: {
    VDataTable,
  },
  data: () => ({
    modalOpen: false,
    signatureImage: null,
    fiche_mobilisation: {
      type: '',
      date: '',
      place: '',
      organizer: '',
      currentUser: appStore.currentUser,
      participants_nb: 0,
      language_element: false,
      graphical_charter: false,
      talk_format: false,
      general_opinion: '',
      // signature: appStore.token,
      siege: '',
      zone_code: ''
    },
    add: false,

    selectedProvince: null,
    attributionDialog: false,
    updateDialog: false,
    dialog: false,
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
      { key: "date", title: "Date" },
      { key: "place", title: "Lieu" },
      { key: "participants_nb", title: "Nbre participants" },
      { key: "organizer", title: "Organisateur" },
      { key: "general_opinion", title: "Opinion genral" },
      { key: "zone_code", title: "Siege" },
      { key: "created_at", title: "Créer le", sortable: false },
      { title: "Actions", key: "actions", sortable: false },
    ],

    lists: [],

    list: {
      date: "",
      place: "",
      participants_nb: "",
      organizer: "",
      general_opinion: "",
      siege: "",
    },
    getSiege: [],
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    mobilisation: {},
    mobile: {}

  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.get_all_mobilisation();
    this.get_siege();
    // this.get_zone_code();
    //this.interval = setInterval(this.get_all_mobilisation, 5000); // Appel toutes les 5 secondes
  },
  methods: {
    openModal(data) {
      this.modalOpen = true;
      console.log('data.columns = ', data.columns);
      this.mobilisation = data.columns;

      const mobilisationIdToFind = this.mobilisation.id;

      const foundItem = this.lists.find(item => item.id === mobilisationIdToFind);

      if (foundItem) {
        console.log('Mobilisation found:', foundItem);
        this.mobile = foundItem
        this.signatureImage = "data:image/png;base64," + foundItem.signature
      } else {
        console.log('Mobilisation not found in the list.');
      }

    },


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

    async get_zone_code() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
        this.$axios
          .get("/user/all")
          .then((response) => {
            console.log("siege =", response.data);
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

    test() {
      this.currentUser = appStore.currentUser
      console.log("test", this.currentUser)
    },
    sendInfo(id) {
      console.log('info', id.raw)
    },

    get_all_mobilisation() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
        this.$axios
          .get("/mobilization_sheet/by_zone")
          .then((response) => {
            console.log("Mobilisation =", response.data);
            this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error);
          })

      }

    },
    post_mobilisation() {
      const accessToken = appStore.token;

      if (accessToken !== null) {
        

        this.$axios
          .post("/mobilization_sheet/add", this.fiche_mobilisation)
          .then((response) => {
            console.log("Mobilisation =", response.data);
            this.get_all_mobilisation();
            this.add = false
            this.fiche_mobilisation = ''

          })
          .catch((error) => {
            console.error("Post mobilisation error:", error);
          });
      }
    },

    updateMobilisation() {
      const accessToken = appStore.token;

      if (accessToken !== null) {
        

        this.$axios
          .put("/mobilization_sheet/update", this.list)
          .then((response) => {
            console.log("Mobilisation =", response.data);
            this.get_all_mobilisation();
            this.add = false

          })
          .catch((error) => {
            console.error("Post mobilisation error:", error);
          });
      }
    },

    // async addfiche() {
    //   console.log(this.list)
    //   axios.post("http://192.168.43.221:8000/mobilization_sheet/add", this.fiche_mobilisation).then((response) => {
    //     this.fiche_mobilisation = {};
    //     console.log('Add fiche =', response.data);
    //     // this.addSuperviseur();
    //     this.get_all_mobilisation();
    //   })
    //     .catch((error) => {
    //       console.log(error.response.data.detail);
    //     });
    // },
    // async validate() {
    //   const { valid } = await this.$refs.form.validate();

    //   if (valid) {
    //     console.log(this.fiche_mobilisation);


    //     await this.get_all_mobilisation();
    //     this.dialog = false;
    //   } else {
    //     console.log("BAD TONTON !!!!");
    //   }

    // },
    onProvinceChange() {
      // Do something with this.selectedProvince
      if (this.selectedProvince == null) {
        this.get_all_mobilisation();
      } else {
        this.$axios
          .get(
            "/mobilization_sheet/by_siege/" +
            this.selectedProvince
          )
          .then((response) => {
            console.log("Filtre = ", response.data);
            this.lists = response.data;
          });
      }
      console.log("Selected Province:", this.selectedProvince);
    },
    download() {
      this.see = true
      html2pdf().set({
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        margin: [0.5, 0.5],
        filename: "fiche-mobilisation",
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

    generateExcel() {
      // Appeler la méthode pour récupérer les données depuis l'API
      this.get_all_mobilisation();

      // Attendre la fin de la requête API avant de générer le fichier Excel
      this.$nextTick(() => {
        const data = [
          // En-têtes
          [
            "Type",
            "Date",
            "place",
            "organizer",
            "Nbre participants",
            "Element langage",
            "Charte graphique",
            "Format causerie",
            "Avis general",
            "Siege",
            "Zone_code",
          ],
          // Données depuis this.lists
          ...this.lists.map((item) => [
            item.type,
            item.date,
            item.place,
            item.organizer,
            item.participants_nb,
            item.language_element,
            item.graphical_charter,
            item.talk_format,
            item.general_opinion,
            item.siege,
            item.zone_code,
          ]),
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Feuille1");

        XLSX.writeFile(wb, "Donnees mobilisation.xlsx");
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
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Faites quelque chose avec jsonData, par exemple, le stocker dans le state Vue ou l'afficher dans la console

        const json = jsonData.map((element) => {
          const [province, libelle] = element;
          return { province, libelle };
        });

        json.shift();
        console.log(json);

        this.$axios

          .post("/siege/add", json)
          .then((response) => {
            console.log("json =", response);
          })
          .catch((error) => {
            console.log(error.response.data.detail);
          });

        // await this.$axios
        // .post("/user/add_users", json)
        // .then((response) => {
        //   console.log(response);
        //   this.user = {};
        // })
        // .catch((error) => {
        //   console.log(error.response.data.detail);
        // });

        // console.log(jsonData);
        // console.log('---------------------------------------------------------------------------------------------------------------------')
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
    },
  },
};
</script>
