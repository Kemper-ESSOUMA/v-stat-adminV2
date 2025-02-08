<template>
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



    <div class="card" style="margin-right: 48%;">
      <ChartJS type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
      <div>
        <div id="map"></div>
      </div>
    </div>

  </div>

  <div class="card">

  </div>

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
      chartOptions: null

    };
  },
  mounted() {
    this.loadExternalScripts();
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0.4
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            tension: 0.4
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
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
