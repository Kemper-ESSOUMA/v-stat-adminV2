<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary"> Gestion des utilisateurs
          </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>


    <v-divider></v-divider>

    <v-container class="mt-8">
      <v-row>
        <v-btn color="primary" prepend-icon="mdi-plus-circle" variant="tonal" @click="dialog = true; list = {}">
          Ajouter un utilisateur
        </v-btn>
        <div style="width: 30%;">

          <v-file-input v-model="selectedFile" label="Choisir un fichier" accept=".xlsx"
            @change="handleFileChange"></v-file-input>
        </div>

        <v-btn @click="generateExcel" color="primary" prepend-icon="mdi-file-excel">Générer le fichier Excel</v-btn>


      </v-row>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>
          Tableau des utilisateur
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details
            variant="outlined" outlined></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="6">

                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;"></v-btn>

                </v-col>
                <!-- <v-col cols="6">

                  <v-btn prepend-icon="mdi-pencil" @click="updateDialog = true; list = item.columns;">Supprimer</v-btn>

                </v-col> -->
              </v-row>
            </v-container>
          </template>
        </v-data-table>

      </v-row>
    </v-container>
  </v-container>

  <!-- modal d'ajout un user------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Ajouter un utilisateur</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.lastname" clearable :rules="rules.lastname" label="Noms *"
                    hint="Veuillez entrer le noms" variant="outlined" outlined></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.firstname" clearable :rules="rules.firstname" prepend-icon="mdi-ticket"
                    variant="outlined" outlined label="Prénoms *" hint="Veuillez entrer le prénoms" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.phone" clearable label="Télephone *" :rules="rules.phone"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer le n° télephone"
                    variant="outlined" outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field hint="Veuillez entrer votre mot de passe"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" v-model="list.password" label="Mot de passe"
                    prepend-icon="mdi mdi-lock" variant="outlined" outlined :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.email" type="email" clearable label="Email *" :rules="rules.email"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer l'email"
                    variant="outlined" outlined></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="list.role" clearable label="role *" :rules="rules.role"
                    :items="['Superviseur', 'Administrateur', 'Assistant(e)', 'Coordinateur', 'Consultant']"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer le role"
                    variant="outlined" outlined></v-autocomplete>
                </v-col>

                <!-- <v-col cols="12" sm="6">

                  <v-text-field hint="Veuillez entrer votre mot de passe" clearable
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" label="Mot de passe"
                    prepend-icon="mdi mdi-lock" variant="outlined" outlined :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1"></v-text-field>
                </v-col> -->

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.zone" clearable label="zone *" :rules="rules.zone"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer le code de zone"
                    variant="outlined" outlined></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small class="text-danger">*Champt obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="validate">
              Enregistrer
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- Modal modifier un superviseur------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">utilisateur : {{ list.firstname }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="Nom" prepend-icon="mdi-user-edit" variant="outlined" outlined v-model="list.firstname">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Prénom" prepend-icon="mdi-text-box-edit" variant="outlined" outlined
                    v-model="list.lastname">

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Téléphone" prepend-icon="mdi-text-box-edit" variant="outlined" outlined
                    v-model="list.phone">

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Email" type="email" prepend-icon="mdi-text-box-edit" variant="outlined" outlined
                    v-model="list.email">

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Role" prepend-icon="mdi-text-box-edit" variant="outlined" outlined v-model="list.role">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-btn color="blue-darken-1" variant="text" @click="update_password(list.id)">
                    Rénitialiser le mot de passe
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
              Annuler
            </v-btn>
            <!-- <v-btn color="blue-darken-1" variant="text" @click="searchItemById()">
              Modifier
            </v-btn> -->
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import { useSuperviseurStore } from '@/store/superviseurs';
import moment from "moment";
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
        title: "Superviseurs",
        disabled: true,
      },
      {
        title: "Accueil",
        disabled: false,
        href: "/",
      },
    ],
    headers: [
      { key: "id", title: "#" },
      { key: "code_user", title: "Code utilisateur" },
      { key: "lastname", title: "Noms" },
      { key: "firstname", title: "Prénoms" },
      { key: "phone", title: "Télephone" },
      { key: "email", title: "Email" },
      { key: "role", title: "Role" },
      { key: "zone", title: "Zone" },
      { key: "created_at", title: "Créer le", sortable: false },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    updateSuperviseur: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      zone: "",

    },
    list: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      zone: "",
      password: "root",
      currentUser: appStore.currentUser,

    },
    showPassword: false,
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },
    test: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      role: "",
      signature: "",
      zone: "",
    },

    updatePassword: {
      id: null,
      password: "root",
      password_is_change: false,
    }
  }),

  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.getAllSuperviseur()
  },
  methods: {

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    generateExcel() {
      // Appeler la méthode pour récupérer les données depuis l'API
      this.getAllSuperviseur();

      // Attendre la fin de la requête API avant de générer le fichier Excel
      this.$nextTick(() => {
        const data = [
          // En-têtes
          [
            "code_user",
            "firstname",
            "lastname",
            "phone",
            "email",
            "role",

          ],
          // Données depuis this.lists
          ...this.lists.map((item) => [
            item.code_user,
            item.firstname,
            item.lastname,
            item.phone,
            item.email,
            item.role,
          ]),
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Feuille1");

        XLSX.writeFile(wb, "Utilisateurs.xlsx");
      });

    },

    async update_password(id) {
      this.updatePassword.id = id

      console.log(this.updatePassword)
      // await axios.put("/user/update_password", this.updatePassword)

      try {
        const response = await this.$axios.post('/user/update_password_by_admin', this.updatePassword);
        console.log('Données mises à jour :', response);
        // Faites quelque chose avec la réponse, par exemple mettre à jour l'état local.
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données :', error);
        // Gérez l'erreur en conséquence.
      }
    },

    getAllSuperviseur() {



      this.$axios
        .get("/user/all")
        .then((response) => {
          console.log("user =", response.data);
          this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        })



    },

    updaateSuperviseur() {
      // Copy properties from this.updateSuperviseur to this.list
      this.list.firstname = this.updateSuperviseur.firstname;
      this.list.lastname = this.updateSuperviseur.lastname;
      this.list.phone = this.updateSuperviseur.phone;
      this.list.email = this.updateSuperviseur.email;
      this.list.role = this.updateSuperviseur.role;
      this.list.zone = this.updateSuperviseur.zone;

      const accessToken = appStore.token;

      if (accessToken != null) {

        this.$axios
          .put("/user/update/", this.list)
          .then((response) => {
            console.log("User update =", response.data);
            console.log("User listt =", this.list);
            this.update = response.data; // Make sure "update" is defined in your component's data.
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      }
    },

    //   findItemForModification(id) {
    //   return this.items.find(item => item.lastname === id); // Vous pouvez ajuster le critère de recherche
    // },

    //   modifyItemById(newData) {
    //     const foundItem = this.findItemForModification(newData.name);
    //     if (foundItem) {
    //       // Vous avez trouvé l'objet à modifier
    //       foundItem.name = newData.newName; // Modifiez les données nécessaires
    //       console.log("Objet modifié :", foundItem);
    //     } else {
    //       console.log("Objet introuvable pour la modification");
    //     }
    //   }
    // }
    // async updatesSuperviseur() {
    //   console.log(this.list)
    //   this.updateSuperviseur.firstname = this.list.firstname
    //   this.updateSuperviseur.lastname = this.list.lastname
    //   this.updateSuperviseur.phone = this.list.firstname
    //   this.updateSuperviseur.email = this.list.email
    //   this.updateSuperviseur.role = this.list.role
    //   this.updateSuperviseur.zone = this.list.zone
    //   this.updateSuperviseur.password = this.list.password


    //   axios.put("/user/update", this.updateSuperviseur).then((response) => {

    //     this.list = {};
    //     console.log('update =', response);
    //     // this.addSuperviseur();
    //     this.getAllSuperviseur();
    //   })
    //     .catch((error) => {
    //       console.log(error.response.data.detail);
    //     });
    // },





    async addSuperviseur() {
      console.log(this.list)
      this.$axios
        .post("/user/add", this.list).then((response) => {

          this.list = {};
          console.log('Add user =', response);
          // this.addSuperviseur();
          this.getAllSuperviseur();
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        });
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.list);

        await this.addSuperviseur();
        await this.getAllSuperviseur();
        this.dialog = false;
      } else {
        console.log("BAD TONTON !!!!");
      }

    },

    async updatedSuperviseur() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.list)

        this.updateSuperviseur.code = this.list.code
        this.updateSuperviseur.libelle = this.list.libelle
        this.updateSuperviseur.registered = this.list.registered
        this.updateSuperviseur.offices = this.list.description


        await this.$axios
          .put("/user/updated", this.updateSuperviseur)
          .then((response) => {
            console.log(response);
            this.list = {};
            this.attributionDialog = false
            this.getAllSuperviseur();
          })
          .catch((error) => {
            console.log(error.response.data.detail);
          });
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
          .post("/user/add_all", json).then((response) => {

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

  computed: {
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    }
  },
};
</script>
