<template>

  <div class="body-contentys">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="m-1">
          <router-link :to="{ name: 'mobilization' }" class="small-box-footer text-decoration-none">
            <div id="rows_counter" class="card mb-1" style="background-color: #1976d3">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Mobilisation</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12"> </div>
                  <h4>{{ this.nb_mobilization }} Fiches de mobilisation</h4>
                  <li>Effectif total: <b>{{ this.participants_nb }}</b></li>

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
            <div id="rows_counter" class="card mb-1" style="background-color: #43a047">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Climat</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12"></div>
                  <h4>{{ this.nb_climat }} Fiches de climats</h4>
                  <div class="col-lg-8 col-12">
                    <li>Favorable: <b>{{ this.nb_favorable }}</b></li>
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
            <div id="rows_counter" class="card mb-1" style="background-color: #9e9e9e">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Incidents</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12"></div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_incidents }} Fiches d'alertes et incidents</h4>
                    <li>Nombre des alertes : <b>{{ this.nb_alerte }}</b></li>
                    <li>Nombre des incidents : <b>{{ this.nb_incident }}</b></li>
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
            <div id="rows_counter" class="card mb-1" style="background-color: #fbbe04">
              <div v-if="isLoading === true" class="card-header">
                <ProgressBar mode="indeterminate" style="height: 6px; color: #fff"></ProgressBar>
              </div>
              <div class="card-body">
                <p>Bureaux de votes</p>
                <div class="row d-flex align-items-center">
                  <div id="icon_animation" class="col-lg-4 col-12"></div>
                  <div class="col-lg-8 col-12">
                    <h4>{{ this.nb_bureaux }} Fiches des bureaux de votes</h4>
                    <li>Risque: <b>{{ this.nb_risque }}</b></li>

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
    </div>
    <div class="card" style="margin-right: 48%">
      <ChartJS type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
      <div>
        <div id="map"></div>
      </div>
    </div>
  </div>

  <div class="card"></div>
</template>

<script>
// import { useAppStore } from "../../../store/app";
// const appStore = useAppStore();

export default {
  name: "App",
  data() {
    return {
      showVotingCenters: true,
      showNationalView: true,
      votingData: [],
      candidates: [],
      centre_vote: [],
      total_candidate_1: 0,
      total_candidate_2: 0,
      total_candidate_3: 0,
      ws: null,
      datas: [],
      get_top_5_burreau_vote: [],
      nb_mobilization: 0,
      nb_climat: 0,
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

      participants_nb: 0,
      items: [
        {
          title: "Analyse de données",
          disabled: true,
        },
        {
          title: "Accueil",
          disabled: false,
          href: "/",
        },
      ],
      chartData: null,
      chartOptions: null,
    };
  },
  mounted() {
    this.getmoilization();
    this.loadExternalScripts();
    this.getResultatMobilization();
    this.getclimat();
    this.getincident();
    this.getbureaux();
    this.connectWebSocket()
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
    // this.get_all_donnees();
    // this.getCandidates();
    // this.getCentreVote();
    // this.connectWebSocket();
  },

  // beforeUnmount() {
  //   if (this.ws) {
  //     this.ws.close();
  //   }
  // },

  methods: {
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
        this.nb_banderol = response.data.goodies.nb_banderol
        this.nb_casquette = response.data.goodies.nb_casquette
        this.nb_divers = response.data.goodies.nb_divers
        this.nb_t_shirt = response.data.goodies.nb_t_shirt
        this.nb_people_disabilities = response.data.mobilization.nb_people_disabilities
        this.participants_nb = response.data.mobilization.participants_nb
      })
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
    },
    // get_all_donnees() {
    //   const accessToken = appStore.token;
    //   if (accessToken) {
    //     const headers = { Authorization: `Bearer ${accessToken}` };
    //     this.$axios
    //       .get("/voting_centre/get_result_by_province", { headers })
    //       .then((response) => {
    //         this.votingData = response.data;
    //         this.updateMap();
    //       })
    //       .catch((error) => {
    //         console.error("Erreur lors de la récupération des données :", error);
    //       });
    //   }
    // },

    // getCandidates() {
    //   this.$axios
    //     .get("/resultat/get_vote_by_province")
    //     .then((response) => {
    //       this.candidates = response.data;
    //       this.total_candidate_1 = response.data[9].total_candidate_1
    //       this.total_candidate_2 = response.data[9].total_candidate_2
    //       this.total_candidate_3 = response.data[9].total_candidate_3
    //       this.updateMapWithResults(this.candidates);
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de la récupération des candidats :", error);
    //     });
    // },

    // getCentreVote() {
    //   this.$axios
    //     .get("/voting_centre/all")
    //     .then((response) => {
    //       this.centre_vote = response.data;
    //       console.log('centre by zone = ', this.centre_vote)
    //       if (this.showVotingCenters) {
    //         this.updateMapLocations();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de la récupération des centres de vote :", error);
    //     });
    // },

    // updateMapWithResults(apiData) {
    //   apiData.forEach((data) => {
    //     const provinceKey = data.province;
    //     const description = `
    //       <p><strong>Candidat 1 :</strong> ${data.candidate_1} votes</p>
    //       <p><strong>Candidat 2 :</strong> ${data.candidate_2} votes</p>
    //       <p><strong>Candidat 3 :</strong> ${data.candidate_3} votes</p>
    //       <p><strong>Total Scrutins :</strong> ${data.nb_scrutin} votants</p>
    //     `;

    //     if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
    //       simplemaps_countrymap_mapdata.state_specific[provinceKey].description = description;
    //     }

    //     const maxVotes = Math.max(data.candidate_1, data.candidate_2, data.candidate_3);
    //     let color = "#FFFFFF";
    //     if (data.candidate_1 === 0 && data.candidate_2 === 0 && data.candidate_3 === 0) {
    //       color = "#D3D3D3"; // Gris si résultats à zéro
    //     } else {
    //       if (maxVotes === data.candidate_1) color = "#FF6347";
    //       else if (maxVotes === data.candidate_2) color = "#32CD32";
    //       else if (maxVotes === data.candidate_3) color = "#1E90FF";
    //     }

    //     if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
    //       simplemaps_countrymap_mapdata.state_specific[provinceKey].color = color;
    //       simplemaps_countrymap_mapdata.state_specific[provinceKey].hover_color = color;
    //     }
    //   });

    //   simplemaps_countrymap.load();
    // },

    // updateMapLocations() {
    //   simplemaps_countrymap_mapdata.locations = {};
    //   this.centre_vote.forEach((centre, index) => {
    //     if (centre.lat && centre.lon && centre.lat !== 0 && centre.lon !== 0) {
    //       let maxVotes = Math.max(centre.candidate_1, centre.candidate_2, centre.candidate_3);
    //       let color = "#808080"; // Gris par défaut si tous les résultats sont 0
    //       if (maxVotes > 0) {
    //         if (maxVotes === centre.candidate_1) color = "#FF6347"; // Rouge
    //         else if (maxVotes === centre.candidate_2) color = "#32CD32"; // Vert
    //         else if (maxVotes === centre.candidate_3) color = "#1E90FF"; // Bleu
    //       }

    //       simplemaps_countrymap_mapdata.locations[index + 1] = {
    //         name: centre.libelle,
    //         lat: centre.lat,
    //         lng: centre.lon,
    //         parent_id: "GA1",
    //         type: "marker",
    //         color: color,
    //         size: "40",
    //         description: `
    //           <p><strong>Nombre de bureaux de votes :</strong> ${centre.total_offices}</p>
    //           <p><strong>Nombre de participants :</strong> ${centre.total_registered}</p>
    //           <p><strong>Candidat 1 :</strong> ${centre.candidate_1}</p>
    //           <p><strong>Candidat 2 :</strong> ${centre.candidate_2}</p>
    //           <p><strong>Candidat 3 :</strong> ${centre.candidate_3}</p>
    //           <p><strong>Total des votants :</strong> ${centre.total_registered_bureau || 'N/A'}</p>
    //         `,
    //       };
    //     }
    //   });
    //   simplemaps_countrymap.load();
    // },

    // toggleNationalView() {
    //   if (this.showNationalView) {
    //     this.updateMapWithResults(this.candidates); // Appliquer les couleurs
    //   } else {
    //     this.resetProvinceColors(); // Enlever les couleurs
    //   }
    //   simplemaps_countrymap.load();
    // },

    // resetProvinceColors() {
    //   Object.keys(simplemaps_countrymap_mapdata.state_specific).forEach((province) => {
    //     simplemaps_countrymap_mapdata.state_specific[province].color = "#d3d3d3";
    //     simplemaps_countrymap_mapdata.state_specific[province].hover_color = "#d3d3d3";
    //     simplemaps_countrymap_mapdata.state_specific[province].description = "";
    //   });
    // },

    // toggleVotingCenters() {
    //   if (this.showVotingCenters) {
    //     this.updateMapLocations();
    //   } else {
    //     simplemaps_countrymap_mapdata.locations = {};
    //     simplemaps_countrymap.load();
    //   }
    // },

    loadExternalScripts() {
      const scripts = ["/mapdata.js", "/countrymap.js"];
      scripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          if (src === "/countrymap.js" && this.showVotingCenters) {
            this.updateMapLocations();
          }
        };
        document.body.appendChild(script);
      });
    },

    // updateMap() {
    //   console.log("Mise à jour de la carte avec les filtres :", {
    //     showVotingCenters: this.showVotingCenters,
    //   });
    // },

    // connectWebSocket() {
    //   this.ws = new WebSocket(this.$wsUrl);

    //   this.ws.onopen = () => {
    //     console.log("WebSocket connecté !");
    //   };

    //   this.ws.onmessage = (event) => {
    //     try {
    //       const message = event.data;
    //       this.getCentreVote();
    //       this.getCandidates();
    //       this.updateMapLocations()
    //       this.toggleVotingCenters()
    //       this.get_all_donnees()
    //       this.updateMapWithResults()

    //       if (message && message.updatedData) {
    //         this.datas = [...this.datas, ...message.updatedData];
    //       }
    //     } catch (error) {
    //       console.error("Erreur WebSocket :", error);
    //     }
    //   };

    //   this.ws.onerror = (error) => {
    //     console.error("Erreur WebSocket :", error);
    //   };

    //   this.ws.onclose = () => {
    //     setTimeout(() => {
    //       this.connectWebSocket();
    //     }, 3000);
    //   };
    // },

    setChartData() {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
            tension: 0.4,
          },
          {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-gray-500"),
            tension: 0.4,
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#map {
  width: 600px;
  height: 600px;
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  margin-left: 100%;
  border-radius: 10px;
}
</style>
