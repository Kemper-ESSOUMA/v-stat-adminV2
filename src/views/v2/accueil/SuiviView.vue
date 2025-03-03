<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h2 class="text-primary">Accueil</h2>
    </div>

    <div class="btn-group page-nav" role="group">
      <!-- <div>
        <router-link class="btn" :to="{ name: 'Home' }" :class="{ active: this.$route.name === 'Home' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Burreaux de votes">
          <i class="pi pi-table" style="color: #3242c5"></i> Gestion des
          elections globales
        </router-link>
      </div>
      <div>
        <router-link class="btn btn-primary" :to="{ name: 'suivi' }" :class="{ active: this.$route.name === 'suivi' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Centre de votes">
          <i class="pi pi-building" style="color: #3242c5"></i> Suivi de
          campagne du candidat
        </router-link>
      </div> -->
    </div>
  </div>
  <hr />
  <div class="body-contentys">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="m-1">
          <router-link :to="{ name: 'mobilization' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #1976d3; min-height: 350px">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Mobilisation</p>
                <div class="row d-flex align-items-center flex-grow-1">
                  <div id="icon_animation" class="col-lg-4 col-12">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_mobilization }} Fiches de mobilisation</h4>
                    <ul class="list-unstyled">
                      <li>
                        Handicapés: <b>{{ this.nb_people_disabilities }}</b>
                      </li>
                      <li>
                        Femmes: <b>{{ this.nb_women }}</b>
                      </li>
                      <li>
                        Jeunes: <b>{{ this.nb_young }}</b>
                      </li>
                      <li>
                        Participants: <b>{{ this.participants_nb }}</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <small>
                  Details
                  <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto"></i>
                </small>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="col-4">
        <div class="m-1">
          <router-link :to="{ name: 'climat' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #43a047; min-height: 350px">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Climat</p>
                <div class="row d-flex align-items-center flex-grow-1">
                  <div id="icon_animation" class="col-lg-4 col-12">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_climat }} Fiches de climats</h4>
                    <ul class="list-unstyled">
                      <li>
                        Tendu : <b>{{ this.nb_tendu }}</b>
                      </li>
                      <li>
                        Calme : <b>{{ this.nb_calme }}</b>
                      </li>
                      <li>
                        Indifférent : <b>{{ this.nb_indifferent }}</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <small>
                  Details
                  <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto"></i>
                </small>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="col-4">
        <div class="m-1">
          <router-link :to="{ name: 'climat' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #755547; min-height: 350px">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Tendances de votes</p>
                <div class="row d-flex align-items-center flex-grow-1">
                  <div id="icon_animation" class="col-lg-4 col-12">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_tendances }} Fiches de tendance de vote</h4>
                    <ul class="list-unstyled">
                      <li>
                        Bon : <b>{{ this.nb_bon }}</b>
                      </li>
                      <li>
                        Satisfait : <b>{{ this.nb_satisfait }}</b>
                      </li>
                      <li>
                        Insatisfait : <b>{{ this.nb_insatifait }}</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <small>
                  Details
                  <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto"></i>
                </small>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- <div class="col-6">
        <h5 class="row justify-content-center">Tableau de mobilisations</h5>
        <div class="m-0">
          <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.isLoading === true"></ProgressBar>
          <DataTable :value="datas2" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters_mobilisation" :globalFilterFields="['zone']">
            <template #header>
              <div class="flex justify-content-end">
                <InputText placeholder="Recherche" v-model="filters_mobilisation['global'].value" />
              </div>
            </template>
            <template #empty> Aucune données trouvées </template>
            <template> Loading customers data. Please wait. </template>

            <DataTableColumn field="zone" header="Zone"></DataTableColumn>
            <DataTableColumn field="zone_code" header="Code"></DataTableColumn>
            <DataTableColumn field="nb_meetings" header="Meetings"></DataTableColumn>
            <DataTableColumn field="nb_talking" header="Causeries"></DataTableColumn>
            <DataTableColumn field="nb_door_to_door" header="Porte à porte"></DataTableColumn>
            <DataTableColumn field="nb_other" header="Autres"></DataTableColumn>
            <DataTableColumn field="nb_population" header="Participants"></DataTableColumn>
            <template #footer> Total {{ filteredData1.length }} . </template>
          </DataTable>
        </div>
      </div>

      <div class="col-6">
        <h5 class="row justify-content-center">
          Tableau de climat électoral et tendances des votes
        </h5>
        <div class="m-0">
          <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.isLoading === true"></ProgressBar>
          <DataTable :value="datas1" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters_tendance" :globalFilterFields="['zone']">
            <template #header>
              <div class="flex justify-content-end">
                <InputText placeholder="Recherche" v-model="filters_tendance['global'].value" />
              </div>
            </template>
            <template #empty> Aucune données trouvées </template>
            <template> Loading customers data. Please wait. </template>

            <DataTableColumn field="zone" header="Zone"></DataTableColumn>
            <DataTableColumn field="zone_code" header="Code"></DataTableColumn>
            <DataTableColumn field="climate" header="Climat"></DataTableColumn>
            <DataTableColumn field="date" header="Date"></DataTableColumn>
            <template #footer> Total {{ filteredData.length }} . </template>
          </DataTable>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@/store/app";
import { FilterMatchMode } from "primevue/api";
import { data } from "jquery";
// import RowsCounter from '@/components/RowsCounter.vue';
// import { data } from 'jquery';

export default defineComponent({
  name: "HomeView",
  // components: { RowsCounter },
  data() {
    return {
      datas: [],
      isLoading: false,
      nb_mobilization: 0,
      nb_climat: 0,
      nb_goodie: 0,
      nb_incidents: 0,
      nb_bureaux: 0,
      nb_alerte: 0,
      nb_incident: 0,
      nb_indecis: 0,
      nb_risque: 0,
      nb_tendu: 0,
      nb_calme: 0,
      nb_indecis_trends: 0,
      nb_indifferent: 0,
      nb_people_disabilities: 0,
      nb_women: 0,
      nb_young: 0,
      participants_nb: 0,
      nb_bon: 0,
      nb_satisfait: 0,
      nb_insatifait: 0,
      nb_tendances: 0,
      datas1: [],
      datas2: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      filters_mobilisation: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      filters_tendance: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },

  mounted() {
    console.log("Current User", this.currentUser());
    this.connectWebSocket();
    this.getmoilization();
    this.getclimat();
    this.getincident();
    this.getbureaux();
    this.getResultatMobilization();
    this.gettendance_vote();
    this.get_table_mobilisation();
  },
  computed: {
    filteredData() {
      if (
        !this.filters_tendance["global"] ||
        !this.filters_tendance["global"].value
      ) {
        return this.datas1;
      }
      const searchTerm = this.filters_tendance["global"].value.toLowerCase();
      return this.datas1.filter((item) =>
        item.zone.toLowerCase().includes(searchTerm)
      );
    },
    filteredData1() {
      if (
        !this.filters_mobilisation["global"] ||
        !this.filters_mobilisation["global"].value
      ) {
        return this.datas2;
      }
      const searchTerm =
        this.filters_mobilisation["global"].value.toLowerCase();
      return this.datas2.filter((item) =>
        item.zone.toLowerCase().includes(searchTerm)
      );
    },
  },
  methods: {
    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

    connectWebSocket() {
      // Définir l'URL du WebSocket (à adapter selon votre serveur)
      this.ws = new WebSocket(this.$wsUrl);

      // Gestion des événements WebSocket
      this.ws.onopen = () => {
        console.log("WebSocket connecté !");
      };

      this.ws.onmessage = (event) => {
        console.log("Événement WebSocket : Message reçu");

        try {
          const message = event.data; // Parsing en JSON si nécessaire

          console.log("Message reçu via WebSocket :", message);

          // Appels des fonctions pour mettre à jour les données
          this.updateDataFromWebSocket();

          if (message && message.updatedData) {
            // Traiter le message si nécessaire, mais pas de modification de `this.datas`
            // Ex : si tu as d'autres variables à mettre à jour, fais-le ici
          }
        } catch (error) {
          console.error(
            "Erreur lors de la réception des données WebSocket :",
            error
          );
        }
      };

      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket :", error);
      };

      this.ws.onclose = (event) => {
        console.log("WebSocket fermé ! Tentative de reconnexion...", event);
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000); // Reconnexion après 3 secondes
      };
    },

    updateDataFromWebSocket() {
      // Mettre à jour les différentes données en appelant les fonctions
      this.isLoading = true;
      this.getmoilization();
      this.getclimat();
      this.getincident();
      this.getbureaux();
      this.getResultatMobilization();
      this.gettendance_vote();
      this.get_table_mobilisation();
    },

    getmoilization() {
      this.isLoading = true;
      this.$axios
        .get("/mobilization_sheet/by_zone")
        .then((response) => {
          if (response.data !== null) {
            this.isLoading = false;
            this.nb_mobilization = response.data.length;
          }
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    get_table_mobilisation() {
      this.isLoading = true;
      this.$axios
        .get("/mobilization_sheet/get_stats_by_zone")
        .then((response) => {
          if (response.data !== null) {
            this.isLoading = false;
            this.datas2 = response.data;
            console.log("mobilisation", response.data);
          }
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    getclimat() {
      this.$axios
        .get("/electoral_climate_sheet/by_zone")
        .then((response) => {
          this.isLoading = false;
          this.nb_climat = response.data.length;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    getincident() {
      this.$axios
        .get("/incident/by_zone")
        .then((response) => {
          this.isLoading = false;
          this.nb_incidents = response.data.length;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    getbureaux() {
      this.$axios
        .get("/polling_station_sheet/by_zone")
        .then((response) => {
          this.isLoading = false;
          this.nb_bureaux = response.data.length;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    gettendance_vote() {
      this.$axios
        .get("/electoral_climate_sheet/get_stats_by_zone")
        .then((response) => {
          this.isLoading = false;
          console.log("tendance", response.data);
          this.datas1 = response.data;
          this.nb_tendances = response.data.length;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },



    //fonctions resultats stats

    getResultatMobilization() {
      this.$axios.get("/stats_home/get_stats_by_user_zone").then((response) => {
        console.log("stats = ", response.data);
        this.nb_alerte = response.data.incidents.nb_alerte;
        this.nb_incident = response.data.incidents.nb_incident;
        this.nb_bon = response.data.polling_station.nb_bon;
        this.nb_indecis = response.data.polling_station.nb_indecis;
        this.nb_risque = response.data.polling_station.nb_risque;
        this.nb_tendu = response.data.electoral_climate.nb_tendu;
        this.nb_calme = response.data.electoral_climate.nb_calme;
        this.nb_indifferent = response.data.electoral_climate.nb_indifferent;
        this.nb_people_disabilities =
          response.data.mobilization.nb_people_disabilities;
        this.nb_women = response.data.mobilization.nb_women;
        this.nb_young = response.data.mobilization.nb_young;
        this.participants_nb = response.data.mobilization.participants_nb;
        this.nb_bon = response.data.voting_trends.nb_bon;
        this.nb_satisfait = response.data.voting_trends.nb_satisfait;
        this.nb_insatifait = response.data.voting_trends.nb_insatifait;
      });
    },
  },
});
</script>
