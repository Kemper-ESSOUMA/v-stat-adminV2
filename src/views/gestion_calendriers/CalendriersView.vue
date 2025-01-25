<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket"></v-icon>
          <v-card-title  style="color: cadetblue;">
            Gestion des calendriers

        </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-left"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>

    <v-divider></v-divider>

    <v-container class="mt-8">
      <v-row>
        <!-- <v-btn color="primary" prepend-icon="mdi-plus-circle" variant="tonal" @click="dialog = true; list = {}">
          Ajouter un calendrier
        </v-btn> -->
      </v-row>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>
          Tableau des calendriers
          <v-spacer></v-spacer>
          <v-text-field v-model="search"  label="Recherche" single-line hide-details
            variant="solo-filled"></v-text-field>
        </v-card-title>
        <!-- <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.="{ item }">
            <v-container>
              <v-row justify="center" align="center">

              </v-row>
            </v-container>
          </template>
        </v-data-table> -->

      </v-row>
    </v-container>
  </v-container>

  <!-- modal d'ajout un bureau de vote------------------------------------------------------------------------------------------------------------------------------------------>
  <!-- <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Ajouter un calendrier</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.firstname" clearable :rules="rules.firstname" label="Noms *"
                    hint="Veuillez entrer le noms" variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.lastname" clearable :rules="rules.lastname" prepend-icon="mdi-ticket"
                    variant="solo-filled" label="Prénoms *" hint="Veuillez entrer le prénoms"
                    required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.phone" clearable label="Télephone *" :rules="rules.phone"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer le n° télephone"
                    variant="solo-filled"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.email" clearable label="Email *" :rules="rules.email"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer l'email"
                    variant="solo-filled"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="list.role" clearable label="role *" :rules="rules.role"
                  :items="['Superviseur', 'Autre',]"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer le role"
                    variant="solo-filled"></v-autocomplete>
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
  </v-row> -->
  <!-- Modal modifier un superviseur------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent>
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">calendrier n° : {{ list.id }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>

              <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    :label="list.firstname"
                    prepend-icon="mdi-text-box-edit"
                    variant="solo-filled"
                    :model-value="list.firstname"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    :label="list.lastname"
                    prepend-icon="mdi-text-box-edit"
                    variant="solo-filled"
                    :model-value="list.lastname"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    :label="list. phone"
                    prepend-icon="mdi-text-box-edit"
                    variant="solo-filled"
                    :model-value="list.phone"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    :label="list.email"
                    prepend-icon="mdi-text-box-edit"
                    variant="solo-filled"
                    :model-value="list.email"
                  >

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    readonly
                    :label="list.signature"
                    prepend-icon="mdi-text-box-edit"
                    variant="solo-filled"
                    :model-value="list.signature"
                  >

                  </v-text-field>
                </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updatedSuperviseur()">
              Modifier
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
// import { VDataTable } from "vuetify/labs/VDataTable";
// import { useAppStore } from "../store/app";
import moment from "moment";
// const appStore = useAppStore();

export default {
  components: {
    // VDataTable,
  },
  data: () => ({
    attributionDialog: false,
    updateDialog: false,
    dialog: false,
    search: "",
    // items: [
    //   {
    //     title: "Tickets",
    //     disabled: true,
    //     href: "/tickets",
    //   },
    //   {
    //     title: "Accueil",
    //     disabled: false,
    //     href: "/directions",
    //   },
    // ],
    headers: [
      {
        align: "start",
        key: "id",
        sortable: false,
        title: "id",
      },
      { key: "firstname", title: "Noms" },
      { key: " lastname", title: "Prénoms" },
      { key: "phone", title: "Télephone" },
      { key: "email", title: "Email" },
      { key: " role", title: "Role" },
      { key: "created_at", title: "Créer le", sortable: false },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    updatedBureau: {
      firstname: "",
       lastname: "",
       phone: "",
       email: "",
       role: "",
    },
    list: {
      firstname: "",
       lastname: "",
       phone: "",
       email: "",
       role: "",
    },
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },

  }),
  methods: {

    async getAllSuperviseur() {
      await this.$axios.get("/pol_sta/all").then((response) => {
        this.pol_sta = response.data;
        console.log(response.data);
      });
    },

    async addSuperviseur() {
      await this.$axios
        .post("/pol_sta/add", this.list)
        .then((response) => {
          console.log(response);
          this.list = {};
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
      }
    },
  },

  async updatedSuperviseur() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.list)

        this.updatedBureau.code = this.list.code
        this.updatedBureau.libelle = this.list.libelle
        this.updatedBureau.registered = this.list.registered
        this.updatedBureau.offices = this.list.description


        await this.$axios
        .post("/pol_sta/updated", this.updatedBureau)
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

  computed: {
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    }
  },
  beforeMount() {
    this.getAllSuperviseur();

  },
};
</script>
