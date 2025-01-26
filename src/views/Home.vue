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
            <div id="rows_counter" class="card mb-1">
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
          <router-link :to="{ name: 'climat' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1">
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
                    <p>Liste des climats</p>
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
            <div id="rows_counter" class="card mb-1">
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
            <div id="rows_counter" class="card mb-1">
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
          <router-link :to="{ name: 'bureaux' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1">
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
                    <p>Liste des bureaux de votes</p>
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
import RowsCounter from '@/components/RowsCounter.vue';


export default defineComponent({
  name: 'HomeView',
  components: { RowsCounter },
  data(){
    return{

      isLoading: false,
      nb_mobilization: 0,
      nb_climat: 0,
      nb_goodie: 0,
      nb_incidents: 0,
      nb_bureaux: 0
    }
  },

  mounted(){
    this.getmoilization()
    this.getclimat()
    this.getgoodies()
    this.getincident()
    this.getbureaux()
  },
  methods: {
    getmoilization() {
      this.isLoading = true
      this.$axios
        .get('/mobilization_sheet/all')
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
        .get('/electoral_climate_sheet/all')
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
        .get('/incident/all')
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
        .get('/goodies/all')
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
        .get('/polling_station_sheet/all')
        .then((response) => {
          this.isLoading = false
          this.nb_bureaux = response.data.length
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },
  }
})
</script>
