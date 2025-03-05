<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h2 class="text-primary"> Accueil </h2>
    </div>

    <!-- <div class="btn-group page-nav " role="group">
      <div>
        <router-link class="btn btn-primary" :to="{ name: 'Home' }" :class="{ 'active': this.$route.name === 'Home' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Burreaux de votes">
          <i class="pi pi-table" style="color: #3242C5"></i> Gestion des elections globales
        </router-link>
      </div>
      <div>
        <router-link class="btn" :to="{ name: 'suivi' }" :class="{ 'active': this.$route.name === 'suivi' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Centre de votes">
          <i class="pi pi-building" style="color: #3242C5"></i> Suivi de campagne du candidat
        </router-link>
      </div>

    </div> -->
  </div>
  <hr>
  <div class="body-contentys">
    <div class="row justify-content-center">
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
          <router-link :to="{ name: 'bureaux' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #FBBE04; min-height: 350px;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Bureaux de votes</p>
                <div class="row d-flex align-items-center flex-grow-1">
                  <div id="icon_animation" class="col-lg-4 col-12">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_bureaux }} Fiches des bureaux de votes</h4>
                    <ul class="list-unstyled">
                      <li>Bon: <b>{{ this.nb_bon_bureaux }}</b></li>
                      <li>Indecis: <b>{{ this.nb_indecis }}</b></li>
                      <li>Risque: <b>{{ this.nb_risque }}</b></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <small>
                  Details <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto;"></i>
                </small>
              </div>
            </div>
          </router-link>
        </div>
      </div>

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
          <router-link :to="{ name: 'incident' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #9E9E9E; min-height: 350px;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body d-flex flex-column">
                <p>Incidents</p>
                <div class="row d-flex align-items-center flex-grow-1">
                  <div id="icon_animation" class="col-lg-4 col-12">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_incidents }} Fiches d'alertes et incidents</h4>
                    <ul class="list-unstyled">
                      <li>Nombre des alertes : <b>{{ this.nb_alerte }}</b></li>
                      <li>Nombre des incidents : <b>{{ this.nb_incident }}</b></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end">
                <small>
                  Details <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto;"></i>
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
        <h5 class="row justify-content-center">Tableau des alertes et incidents</h5>
        <div class="m-0">
          <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.isLoading === true"></ProgressBar>
          <DataTable :value="datas1" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" :globalFilterFields="['voting_center']">
            <template #header>
              <div class="flex justify-content-end">
                <InputText placeholder="Recherche" v-model="filters['global'].value" />
              </div>
            </template>
<template #empty> Aucune données trouvées </template>
<template> Loading customers data. Please wait. </template>

<DataTableColumn field="voting_center" header="Centre de vote"></DataTableColumn>
<DataTableColumn field="code" header="Code"></DataTableColumn>
<DataTableColumn field="nb_incidents" header="Nombre Incident"></DataTableColumn>
<DataTableColumn field="nb_alertes" header="Nombre Alerte"></DataTableColumn>
<DataTableColumn field="mineur" header="Mineur"></DataTableColumn>
<DataTableColumn field="majeur" header="Majeur"></DataTableColumn>
<DataTableColumn field="critique" header="Critique"></DataTableColumn>
<template #footer>
              Total {{ filteredData1.length }} .
            </template>
</DataTable>
</div>

</div>

<div class="col-6">
  <h5 class="row justify-content-center">Tableau de bureaux de votes</h5>
  <div class="m-0">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.isLoading === true"></ProgressBar>
    <DataTable :value="datas2" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters_bureau" :globalFilterFields="['voting_center']">
      <template #header>
              <div class="flex justify-content-end">
                <InputText placeholder="Recherche" v-model="filters_bureau['global'].value" />
              </div>
            </template>
      <template #empty> Aucune données trouvées </template>
      <template #isLoading> Loading customers data. Please wait. </template>

      <DataTableColumn header="Code du bureau">
        <template #body="slotProps">
                {{ slotProps.data.voting_center + 'B' + slotProps.data.pol_sta_code }}
              </template>
      </DataTableColumn>

      <DataTableColumn field="opening_time" header="Heure ouverture"></DataTableColumn>
      <DataTableColumn field="office_climate" header="Statut"></DataTableColumn>
      <template #footer>
              Total {{ filteredData.length }} .
            </template>

    </DataTable>
  </div>
</div> -->


      <!-- <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
        <h5 class="chart-title text-center">Statistiques des alertes et incidents par gravités</h5>
        <ProgressBar mode="indeterminate" style="height: 6px" v-if="isLoading === true"></ProgressBar>
        <canvas id="data" width="400" height="200"></canvas>
      </div> -->

    </div>



  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chart-title {
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAppStore } from "@/store/app";
import { FilterMatchMode } from "primevue/api";
import { DatasetController } from 'chart.js';
// import RowsCounter from '@/components/RowsCounter.vue';
// import { data } from 'jquery';

// import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'HomeView',
  // components: { RowsCounter },
  data() {
    return {
      datas: [],
      isLoading: true,
      nb_mobilization: 0,
      nb_climat: 0,
      nb_goodie: 0,
      nb_incidents: 0,
      nb_bureaux: 0,
      nb_alerte: 0,
      nb_incident: 0,
      nb_bon: 0,
      nb_indecis: 0,
      nb_risque: 0,
      nb_defavorable: 0,
      nb_favorable: 0,
      nb_indecis_trends: 0,
      nb_plutot_defavorable: 0,
      nb_plutot_favorable: 0,
      nb_people_disabilities: 0,
      nb_women: 0,
      nb_young: 0,
      nb_tendu: 0,
      nb_calme: 0,
      nb_tendances: 0,
      nb_indifferent: 0,
      nb_satisfait: 0,
      nb_insatifait: 0,
      participants_nb: 0,
      datas1: [],
      datas2: [],
      datas3: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      filters_bureau: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      filters_mobilisation: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      filters_tendance: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      type: Array,
      required: true,
    }
  },

  mounted() {
    console.log("Current User", this.currentUser());
    this.connectWebSocket()
    this.getmoilization()
    this.getclimat()
    this.getincident()
    this.getbureaux()
    this.getResultatMobilization()
    this.getincident_table()
    this.gettendance_vote();
    // this.renderChart()
  },

  // computed: {
  //   filteredData() {
  //     if (!this.filters_bureau['global'] || !this.filters_bureau['global'].value) {
  //       return this.datas2;
  //     }
  //     const searchTerm = this.filters_bureau['global'].value.toLowerCase();
  //     return this.datas2.filter(item => item.voting_center.toLowerCase().includes(searchTerm));
  //   },


  //   filteredData1() {
  //     if (!this.filters['global'] || !this.filters['global'].value) {
  //       return this.datas1;
  //     }
  //     const searchTerm = this.filters['global'].value.toLowerCase();
  //     return this.datas1.filter(item => item.voting_center.toLowerCase().includes(searchTerm));
  //   }

  // },


  methods: {
    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

    // renderChart() {
    //   if (this.chartInstance) {
    //     this.chartInstance.destroy();
    //   }

    //   if (!this.datas3 || this.datas3.length === 0) {
    //     console.error("Aucune donnée disponible pour le graphique.");
    //     return;
    //   }

    //   // Regrouper les événements par date
    //   const groupedData = {};
    //   this.datas3.forEach(event => {
    //     console.log('Gravity:', event.gravity, 'Event:', event.event);

    //     const date = event.date.split("T")[0]; // Récupérer uniquement la date (sans l'heure)
    //     if (!groupedData[date]) {
    //       groupedData[date] = { incident: 0, alerte: 0, majeur: 0, mineur: 0, critique: 0 };
    //     }

    //     // Comptabiliser les types d'événements
    //     if (event.type === "Incident") {
    //       groupedData[date].incident += 1;
    //     } else if (event.type === "Alerte") {
    //       groupedData[date].alerte += 1;
    //     }

    //     // Comptabiliser les gravités
    //     if (event.gravity === 2) {
    //       groupedData[date].critique += 1; // 2 est bloquant
    //     } else if (event.gravity === 1) {
    //       groupedData[date].majeur += 1; // 1 est majeur
    //     } else if (event.gravity === 0) {
    //       groupedData[date].mineur += 1; // 0 est mineur
    //     }
    //   });

    //   // Extraire les labels et datasets
    //   const labels = Object.keys(groupedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    //   const incidents = labels.map(date => groupedData[date].incident);
    //   const alertes = labels.map(date => groupedData[date].alerte);
    //   const majeurs = labels.map(date => groupedData[date].majeur);
    //   const mineurs = labels.map(date => groupedData[date].mineur);
    //   const critiques = labels.map(date => groupedData[date].critique);

    //   console.log('Labels:', labels);
    //   console.log('Incidents:', incidents);
    //   console.log('Alertes:', alertes);
    //   console.log('Majeurs:', majeurs);
    //   console.log('Mineurs:', mineurs);
    //   console.log('Critiques:', critiques);

    //   const ctx = document.getElementById('data').getContext('2d');

    //   this.chartInstance = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: labels,
    //       datasets: [
    //         {
    //           label: 'Incidents',
    //           data: incidents,
    //           backgroundColor: 'pink', // Ajout de transparence
    //           borderColor: 'pink',
    //           borderWidth: 1,
    //           type: 'line',
    //           yAxisID: 'y2',
    //         },
    //         {
    //           label: 'Alertes',
    //           data: alertes,
    //           backgroundColor: 'green', // Ajout de transparence
    //           borderColor: 'green',
    //           borderWidth: 1,
    //           type: 'line',
    //           yAxisID: 'y2',
    //         },
    //         {
    //           label: 'Mineur',
    //           data: mineurs,
    //           type: 'bar',
    //           borderColor: 'yellow',
    //           backgroundColor: 'yellow',
    //           fill: false,
    //           pointRadius: 4, // Rendre les points plus visibles
    //           stack: 'Stack 1', // Activation de l'empilement
    //           yAxisID: 'y',
    //         },
    //         {
    //           label: 'Majeur',
    //           data: majeurs,
    //           type: 'bar',
    //           borderColor: 'orange',
    //           backgroundColor: 'orange',
    //           fill: false,
    //           pointRadius: 4,
    //           stack: 'Stack 1', // Activation de l'empilement
    //           yAxisID: 'y',
    //         },
    //         {
    //           label: 'Critique',
    //           data: critiques,
    //           type: 'bar',
    //           borderColor: 'red',
    //           backgroundColor: 'red',
    //           fill: false,
    //           pointRadius: 4,
    //           stack: 'Stack 1', // Activation de l'empilement
    //           yAxisID: 'y',
    //         },
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       scales: {
    //         x: {
    //           title: { display: true, text: 'Dates' },
    //           stacked: true,  // Désactiver l'empilement sur X pour mieux voir les barres
    //         },
    //         y: {
    //           beginAtZero: true,
    //           title: { display: true, text: 'Nombre d\'événements (Mineurs, Majeurs, Critique)' },
    //           stacked: true,  // Désactiver l'empilement en Y pour éviter que les valeurs se superposent
    //         },
    //         y2: { // Axe Y secondaire à droite
    //           beginAtZero: true,
    //           position: 'right', // Déplacer l'axe sur la droite
    //           title: { display: true, text: 'Nombre d\'événements (Incidents & Alertes)' },
    //           grid: { drawOnChartArea: false }, // Empêche la grille d’être dupliquée
    //         }
    //       }
    //     }
    //   });

    // },
    getincident() {
      this.$axios
        .get('/incident/by_zone')
        .then((response) => {
          this.isLoading = false;
          this.nb_incidents = response.data.length;
          this.datas3 = response.data;


          console.log('datas3', this.datas3);

          // this.renderChart();
        })
        .catch((error) => {
          console.error('Erreur de récupération de données:', error);
        });
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
          console.error("Erreur lors de la réception des données WebSocket :", error);
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
      this.getincident_table();
      this.gettendance_vote();
    },

    getmoilization() {
      this.isLoading = true
      this.$axios
        .get('/mobilization_sheet/by_zone')
        .then((response) => {
          if (response.data !== null) {
            this.isLoading = false
            this.nb_mobilization = response.data.length
          }

        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },


    getclimat() {
      this.$axios
        .get('/electoral_climate_sheet/by_zone')
        .then((response) => {
          this.isLoading = false
          this.nb_climat = response.data.length
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },


    getincident_table() {
      this.$axios
        .get('/incident/get_stats_by_zone')
        .then((response) => {
          this.isLoading = false
          this.datas1 = response.data;
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },

    getbureaux() {
      this.$axios
        .get('/polling_station_sheet/by_zone')
        .then((response) => {
          this.isLoading = false
          this.nb_bureaux = response.data.length
          this.datas2 = response.data
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },
    gettendance_vote() {
      this.$axios
        .get("/voting_trends_sheet/by_zone")
        .then((response) => {
          this.isLoading = false;
          console.log("tendance", response.data);
          this.nb_tendances = response.data.length;
          // this.datas1 = response.data;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },

    //fonctions resultats stats

    getResultatMobilization() {
      this.$axios.get('/stats_home/get_stats_by_user_zone').then(response => {
        console.log('stats = ', response.data)
        this.nb_alerte = response.data.incidents.nb_alerte
        this.nb_incident = response.data.incidents.nb_incident
        this.nb_bon_bureaux = response.data.polling_station.nb_bon
        this.nb_bon = response.data.voting_trends.nb_bon;
        this.nb_indecis = response.data.polling_station.nb_indecis
        this.nb_risque = response.data.polling_station.nb_risque
        this.nb_defavorable = response.data.voting_trends.nb_defavorable
        this.nb_favorable = response.data.voting_trends.nb_favorable
        this.nb_indecis_trends = response.data.voting_trends.nb_indecis_trends
        this.nb_plutot_defavorable = response.data.voting_trends.nb_plutot_defavorable
        this.nb_plutot_favorable = response.data.voting_trends.nb_plutot_favorable
        this.nb_people_disabilities = response.data.mobilization.nb_people_disabilities
        this.nb_women = response.data.mobilization.nb_women
        this.nb_young = response.data.mobilization.nb_young
        this.nb_tendu = response.data.electoral_climate.nb_tendu;
        this.nb_calme = response.data.electoral_climate.nb_calme;
        this.nb_indifferent = response.data.electoral_climate.nb_indifferent;
        this.nb_satisfait = response.data.voting_trends.nb_satisfait;
        this.nb_insatifait = response.data.voting_trends.nb_insatifait;
        this.participants_nb = response.data.mobilization.participants_nb
      })
    },

    refreshDatas() {
      this.isLoading = true;
      this.getincident_table();
    },
  }
})
</script>
