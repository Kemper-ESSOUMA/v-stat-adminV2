<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h2 class="text-primary"> Accueil </h2>
    </div>
  </div>
  <hr>
  <div class="body-contentys">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="m-1">
          <router-link :to="{ name: 'mobilization' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #1976D3;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Mobilisation</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12 ">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_mobilization }} Fiches de mobilisation</h4>
                    <p>Liste des mobilisations</p>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end ">
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
          <router-link :to="{ name: 'goodies' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #8E24AA;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Goodies</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12 ">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_goodie }} Fiches de goodies</h4>
                    <p>Liste des goodies</p>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end ">
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
          <router-link :to="{ name: 'incident' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #9E9E9E;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Incidents</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12 ">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_incidents }} Fiches d'alertes et incidents</h4>
                    <p>Nombre des alertes : <b>{{ this.nb_alerte }}</b></p>
                    <p>Nombre des incidents : <b>{{ this.nb_incident }}</b></p>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end ">
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
          <router-link :to="{ name: 'bureaux' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #FBBE04;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Bureaux de votes</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12 ">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_bureaux }} Fiches des bureaux de votes</h4>
                    <p>Situations :</p>
                    <li>Bon: <b>{{ this.nb_bon }}</b></li>
                    <li>Indecis: <b>{{ this.nb_indecis }}</b></li>
                    <li>Risque: <b>{{ this.nb_risque }}</b></li>

                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end ">
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
            <div id="rows_counter" class="card mb-1" style="background-color: #43A047;">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Climat</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12 ">
                    <!-- <img :src=" this.icon" alt=""> -->
                  </div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_climat }} Fiches de climats</h4>
                    <div class="col-lg-8 col-12">
                      <p>Tendances :</p>
                      <li>Defavorable: <b>{{ this.nb_defavorable }}</b></li>
                      <li>Favorable: <b>{{ this.nb_favorable }}</b></li>
                      <li>Indecis: <b>{{ this.nb_indecis }}</b></li>
                      <li>Plutot defavorable: <b>{{ this.nb_plutot_defavorable }}</b></li>
                      <li>Plutot favorable: <b>{{ this.nb_plutot_favorable }}</b></li>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-end ">
                <small>
                  Details <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto;"></i>
                </small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import RowsCounter from '@/components/RowsCounter.vue';
// import { data } from 'jquery';


export default defineComponent({
  name: 'HomeView',
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
      nb_bon: 0,
      nb_indecis: 0,
      nb_risque: 0,
      nb_defavorable:0,
      nb_favorable: 0,
      nb_indecis_trends: 0,
      nb_plutot_defavorable: 0,
      nb_plutot_favorable: 0
    }
  },

  mounted() {
    this.connectWebSocket()
    this.getmoilization()
    this.getclimat()
    this.getgoodies()
    this.getincident()
    this.getbureaux()
    this.getResultatMobilization()
  },
  methods: {

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
      this.getgoodies();
      this.getbureaux();
      this.getResultatMobilization();
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

    getincident() {
      this.$axios
        .get('/incident/by_zone')
        .then((response) => {
          this.isLoading = false
          this.nb_incidents = response.data.length
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },

    getgoodies() {
      this.$axios
        .get('/goodies/by_zone')
        .then((response) => {
          this.isLoading = false
          this.nb_goodie = response.data.length
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
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },

    //fonctions resultats stats

    getResultatMobilization() {
      this.$axios.get('/stats_home/get_stats_by_user_zone').then(response => {
        console.log('stats = ', response.data)
        this.nb_alerte = response.data.incidents.nb_alerte
        this.nb_incident = response.data.incidents.nb_incident
         this.nb_bon = response.data.polling_station.nb_bon
         this.nb_indecis = response.data.polling_station.nb_indecis
         this.nb_risque = response.data.polling_station.nb_risque
        this.nb_defavorable = response.data.voting_trends.nb_defavorable
        this.nb_favorable = response.data.voting_trends.nb_favorable
        this.nb_indecis_trends = response.data.voting_trends.nb_indecis_trends
        this.nb_plutot_defavorable = response.data.voting_trends.nb_plutot_defavorable
        this.nb_plutot_favorable = response.data.voting_trends.nb_plutot_favorable
      })
    }
  }
})
</script>
