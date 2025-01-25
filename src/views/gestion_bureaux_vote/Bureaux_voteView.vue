<template>
  <v-container>
              <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary"> Gestion des bureaux de votes
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
        <v-btn color="primary" prepend-icon="mdi-plus-circle" variant="tonal" @click="dialog = true">
          Ajouter un bureau de vote
        </v-btn>
      </v-row>

      <v-row class="mt-8">
        <br><br>
        <v-card-title>
          Tableau des bureaux de votes
          <v-spacer></v-spacer>
          <v-text-field v-model="search" label="Recherche" single-line hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="lists" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-container>
              <v-row justify="center" align="center">
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

      </v-row>
    </v-container>
  </v-container>

  <!-- modal d'ajout un bureau de vote------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Créer un bureau de vote</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.code" clearable :rules="rules.libelle" label="Code *"
                    hint="Veuillez entrer le code" variant="solo-filled"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.libelle" clearable :rules="rules.libelle" label="Libelle *"
                    hint="Veuillez entrer libelle" variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.registered" clearable :rules="rules.registered" prepend-icon="mdi-ticket"
                    variant="solo-filled" type="number" label="Enregistrement *" hint="Veuillez entrer le nombre d'enregistremnt"
                    required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="list.offices" clearable label="Bureaux *" :rules="rules.offices"
                    prepend-icon="mdi-text-box-edit" type="number"  hint="Veuillez entrer le nombre de bureau"
                    variant="solo-filled"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                    <v-autocomplete v-model="list.zone_code" clearable label="zone *" :rules="rules.zone_code"
                      :items="users" item-title="firstname" item-value="zone_code" prepend-icon="mdi-text-box-edit"
                      hint="Veuillez entrer une zone" variant="solo-filled"></v-autocomplete>
                    <!-- <v-text-field v-model="fiche_climat.zone_code" clearable variant="solo-filled" label="Code Zone*"
                      hint="Veuillez entrer le code de zone" type="number" required></v-text-field> -->
                  </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="list.arr_can_code" clearable label="Arrondissement *"
                    :rules="rules.arr_can_code" :items="arrondissement" item-title="libelle" item-value="code"
                    prepend-icon="mdi-text-box-edit" hint="Veuillez entrer l'arrondissement"
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
  </v-row>
  <!-- Modal modifier un bureau de vote------------------------------------------------------------------------------------------------------------------------------------------>
  <v-row justify="center">
    <v-dialog v-model="updateDialog" persistent width="1024">
      <v-card>
        <v-form ref="form">
          <v-card-title>
            <span class="text-h5">Bureau de vote de : {{ list.code }} / {{ list.libelle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col cols="12" sm="6">
                <v-text-field :label="list.code" prepend-icon="mdi-text-box-edit" variant="solo-filled"
                  :model-value="list.code">

                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field :label="list.libelle" prepend-icon="mdi-text-box-edit" variant="solo-filled"
                  :model-value="list.libelle">

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field :label="list.registered" prepend-icon="mdi-text-box-edit" variant="solo-filled"
                  :model-value="list.registered">

                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field :label="list.offices" prepend-icon="mdi-text-box-edit" variant="solo-filled"
                  :model-value="list.offices">

                </v-text-field>

              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete v-model="list.arr_can_code" :label="list.arr_can_code" :model-value="list.arr_can_code"
                  :items="arrondissement" item-title="libelle" prepend-icon="mdi-text-box-edit"
                  variant="solo-filled"></v-autocomplete>
              </v-col>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="updateDialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updated_burrau()">
              Modifier
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import moment from "moment";
const appStore = useAppStore();
import { useAppStore } from '../../store/app'


export default {
  components: {
    VDataTable,
  },
  data: () => ({
    updateDialog: false,
    dialog: false,
    search: "",
    items: [
      {
        title: "bureaux de votes",
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
      {
        align: "start",
        key: "code",
        sortable: false,
        title: "Code",
      },
      { key: "libelle", title: "Libelle" },
      { key: "registered", title: "Enregistrement" },
      { key: "offices", title: "Bureaux" },
      { key: "arr_can_code", title: "Arrondissement" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    lists: [],
    updatedBureau: {
      code: "",
      libelle: "",
      registered: "",
      offices: "",
      arr_can_code: "",
      zone_code:"",
    },
    list: {
      code: "",
      libelle: "",
      registered: "",
      offices: "",
      arr_can_code: "",
      zone_code:"",
      // currentUser: appStore.currentUser,
    },
    rules: {
      object: [(value) => !!value || "Veuillez renseigner ce champs"],
    },

  }),
  mounted() {
    this.currentUser = appStore.currentUser
    console.log('usertoken', appStore.token)
    console.log('currzent_user', this.currentUser)
    this.getBureau()
    this.getArrondissement()
    this.get_zone_code()
  },
  methods: {

    async getArrondissement() {
      this.$axios
          .get("arr_can/all").then((response) => {
        this.arrondissement = response.data;
        console.log('arrondissement =', response.data);
      });
    },

    // getBureau() {
    //   axios.get("pol_sta/all").then((response) => {
    //     console.log('bureau = ', response.data)
    //     this.lists = response.data
    //   })
    // },
     async get_zone_code() {
     this.$axios
          .get("user/all").then((response) => {
         this.users = response.data;
         console.log('siege_user =', response.data);
       });
     },

    getBureau() {
      const accessToken = appStore.token;
      console.log("test", accessToken)
      if (accessToken != null) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        console.log("entete", headers)
      this.$axios
        .get("pol_sta/all", {
          headers: headers
        })
        .then((response) => {
          console.log("bureau =", response.data);
          this.lists = response.data; // Assurez-vous que "lists" est une propriété accessible dans le contexte où vous exécutez cette requête.
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        })

      }

    },


    async addBurreau() {
      // console.log(this.list)
      // axios.post("pol_sta/add", this.list).then((response) => {
      //   this.list = {};
      //   console.log('Add burreau =', response);
      //   // this.addBurreau();
      //   this.getBureau();
      // })
      //   .catch((error) => {
      //     console.log(error.response.data.detail);
      //   });
      console.log(this.list)
      this.$axios
          .post("pol_sta/add", this.list).then((response) => {

        this.list = {};
        console.log('Add pol_sta =', response);
        // this.addSuperviseur();
        this.getBureau();
      })
        .catch((error) => {
          console.log(error.response.data.detail);
        });
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log(this.list);

        await this.addBurreau();
        await this.getBureau();
        this.dialog = false;
      } else {
        console.log("BAD TONTON !!!!");
      }

    },




    async updated_burrau() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        console.log('List =', this.list)

        const formData = new FormData();
        formData.append('code', this.list.code);
        formData.append('libelle', this.list.libelle);
        formData.append('registered', this.list.registered)
        formData.append('offices', this.list.offices)
        formData.append('arr_can_code', this.list.arr_can_code)
        console.log('form =', formData);


        this.$axios
          .put("pol_sta/update", formData).then((response) => {
          // console.log('formdata =', this.formData)
          console.log('update =', response);
          this.list = {};
          this.updateDialog = false;
          this.getBureau();
        })
          .catch((error) => {
            console.log(error.response);
          });
      }
      else {
        console.log("BAD TONTON !!!!");
      }
    },


    async delete_bureau(){

    }



  },

  computed: {
    formattedDate() {
      return (date) => moment(date).format("DD/MM/YYYY à HH:mm");
    }
  },


};

</script>
