<template>
  <div class="btn-group page-nav" role="group" style="margin-left: 40%">
    <div>
      <router-link
        class="btn btn-primary"
        :to="{ name: 'map' }"
        :class="{ active: this.$route.name === 'map' }"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="map"
      >
        <i class="pi pi-globe" style="color: #3242c5"></i> GLOBAL
      </router-link>
    </div>
    <div>
      <router-link
        class="btn"
        :to="{ name: 'national' }"
        :class="{ active: this.$route.name === 'national' }"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="national"
      >
        <i class="pi pi-map-marker" style="color: #3242c5"></i> NATIONAL
      </router-link>
    </div>
    <!-- <div>
      <router-link class="btn" :to="{ name: 'international' }" :class="{ active: this.$route.name === 'international' }"
        data-bs-toggle="tooltip" data-bs-placement="right" title="international">
        <i class="pi pi-map" style="color: #3242c5"></i> INTERNATIONAL
      </router-link>
    </div> -->
  </div>
  <div>
    <!-- Carte -->
    <div id="map"></div>

    <div id="map2">
      <div class="box">Afrique</div>
      <div class="box">Europe</div>
      <div class="box">Amerique</div>
      <div class="box">Asie</div>
    </div>
    <!-- Filtres -->
    <div id="filters">
      <h3>Filtres</h3>
      <label>
        <input
          type="checkbox"
          v-model="showVotingCenters"
          @change="toggleVotingCenters"
        />
        Vue Centres de vote
      </label>
      <label>
        <input
          type="checkbox"
          v-model="showNationalView"
          @change="toggleNationalView"
          checked
        />
        Vue resultat des provinces
      </label>
    </div>

    <!-- Légende des couleurs -->
    <div id="legend">
      <h3>Légende des couleurs</h3>
      <ul>
        <li>
          <span class="icon candidate2"></span>
          {{ this.total_candidate_2.name }}:
          <b>{{ this.total_candidate_2.data }}</b> votes
        </li>
        <li>
          <span class="icon candidate3"></span>
          {{ this.total_candidate_3.name }}:
          <b>{{ this.total_candidate_3.data }}</b> votes
        </li>
        <li>
          <span class="icon candidate4"></span>
          {{ this.total_candidate_4.name }}:
          <b>{{ this.total_candidate_4.data }}</b> votes
        </li>
        <li>
          <span class="icon candidate1"></span>
          {{ this.total_candidate_1.name }}:
          <b>{{ this.total_candidate_1.data }}</b> votes
        </li>
        <li><span class="icon center"></span> Centre de vote</li>
        <li><span class="icon station"></span> Résultats à zéro</li>
      </ul>
    </div>

    <!-- Espace candidats -->
    <div id="candidates">
      <h3>Candidats</h3>
      <ul>
        <li v-for="(candidate, index) in candidates" :key="index">
          <p>Province : {{ candidate.province || "N/A" }}</p>
          <p>
            {{ candidate.candidate_1?.name || "Candidat 1" }} :
            {{ candidate.candidate_1?.data ?? "N/A" }}
          </p>
          <p>
            {{ candidate.candidate_2?.name || "Candidat 2" }} :
            {{ candidate.candidate_2?.data ?? "N/A" }}
          </p>
          <p>
            {{ candidate.candidate_3?.name || "Candidat 3" }} :
            {{ candidate.candidate_3?.data ?? "N/A" }}
          </p>
          <p>Total votes : {{ candidate.nb_scrutin ?? "N/A" }}</p>
        </li>

        <p v-if="candidates.length === 0">Aucune donnée disponible.</p>
      </ul>
    </div>

    <!-- Barre de progression des votes -->
    <div id="progress-bar-container">
      <div class="d-plex">
        <div
          class="image-container candidate1-image"
          :style="{ left: candidate1Percentage + '%' }"
        >
          <img
            src="../../../assets/candidat1.png"
            class="candidate-photo"
            alt="Candidate 1"
          />
        </div>
        <div
          class="image-container candidate1-image"
          :style="{ left: candidate1Percentage + '%' }"
        >
          <img
            src="../../../assets/candidat2.png"
            class="candidate-photo"
            alt="Candidate 1"
          />
        </div>
      </div>
      <div class="progress-bar">
        <div
          class="progress-segment candidate1"
          :style="{ width: candidate1Percentage + '%' }"
        >
          <div class="candidate-photo candidate1-photo"></div>
          <span class="percentage-text">{{ resu_acbbn }}%</span>
        </div>
        <div
          class="progress-segment candidate2"
          :style="{ width: candidate2Percentage + '%' }"
        >
          <div class="candidate-photo candidate2-photo"></div>
          <span class="percentage-text">{{ resu_cbon }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "../../../store/app";
const appStore = useAppStore();

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
      total_candidate_4: 0,
      resu_cbon: 0,
      resu_acbbn: 0,
    };
  },

  computed: {
    totalVotes() {
      return (
        this.total_candidate_1.data +
        this.total_candidate_2.data +
        this.total_candidate_3.data +
        this.total_candidate_4.data
      );
    },
    candidate1Percentage() {
      return this.totalVotes
        ? ((this.total_candidate_1.data / this.totalVotes) * 100).toFixed(2)
        : 0;
    },
    candidate2Percentage() {
      return this.totalVotes
        ? ((this.total_candidate_2.data / this.totalVotes) * 100).toFixed(2)
        : 0;
    },
  },

  mounted() {
    this.loadExternalScripts();
    this.get_all_donnees();
    this.getCandidates();
    this.getCentreVote();
    this.connectWebSocket();
    this.get_stat_candidate();
  },

  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },

  methods: {
    get_stat_candidate() {
      this.$axios
        .get("/stats_home/get_porcent_by_candidate")
        .then((response) => {
          this.resu_cbon = response.data.candidate_2.data.toFixed(2);
          this.resu_acbbn = response.data.candidate_1.data.toFixed(2);
          console.log("resss", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },
    get_all_donnees() {
      const accessToken = appStore.token;
      if (accessToken) {
        const headers = { Authorization: `Bearer ${accessToken}` };
        this.$axios
          .get("/voting_centre/get_result_by_province", { headers })
          .then((response) => {
            this.votingData = response.data;
            this.updateMap();
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
      }
    },

    getCandidates() {
      this.$axios
        .get("/resultat/get_vote_by_province")
        .then((response) => {
          this.candidates = response.data;
          this.total_candidate_1 = response.data[9].total_candidate_1;
          this.total_candidate_2 = response.data[9].total_candidate_2;
          this.total_candidate_3 = response.data[9].total_candidate_3;
          this.total_candidate_4 = response.data[9].total_candidate_4;

          this.updateMapWithResults(this.candidates);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des candidats :",
            error
          );
        });
    },

    getCentreVote() {
      this.$axios
        .get("/voting_centre/all")
        .then((response) => {
          this.centre_vote = response.data;

          if (this.showVotingCenters) {
            this.updateMapLocations();
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des centres de vote :",
            error
          );
        });
    },

    updateMapWithResults(apiData) {
      apiData.forEach((data) => {
        const provinceKey = data.province;
        const description = `
          <p><strong>${data.candidate_1.name} :</strong> ${data.candidate_1.data} votes</p>
          <p><strong>${data.candidate_2.name} :</strong> ${data.candidate_2.data} votes</p>
          <p><strong>${data.candidate_3.name} :</strong> ${data.candidate_3.data} votes</p>
          <p><strong>${data.candidate_4.name} :</strong> ${data.candidate_4.data} votes</p>
          <p><strong>Total Scrutins :</strong> ${data.nb_scrutin} votants</p>
        `;

        if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
          simplemaps_countrymap_mapdata.state_specific[
            provinceKey
          ].description = description;
        }

        const maxVotes = Math.max(
          data.candidate_1.data,
          data.candidate_2.data,
          data.candidate_3.data,
          data.candidate_4.data
        );
        let color = "#FFFFFF";
        if (
          data.candidate_1.data === 0 &&
          data.candidate_2.data === 0 &&
          data.candidate_3.data === 0 &&
          data.candidate_4.data === 0
        ) {
          color = "#D3D3D3"; // Gris si résultats à zéro
        } else {
          if (maxVotes === data.candidate_1.data) color = "#FF6347";
          else if (maxVotes === data.candidate_2.data) color = "#32CD32";
          else if (maxVotes === data.candidate_3.data) color = "#FFCE56";
          else if (maxVotes === data.candidate_4.data) color = "#0000FF";
        }

        if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
          simplemaps_countrymap_mapdata.state_specific[provinceKey].color =
            color;
          simplemaps_countrymap_mapdata.state_specific[
            provinceKey
          ].hover_color = color;
        }
      });

      simplemaps_countrymap.load();
    },

    updateMapLocations() {
      simplemaps_countrymap_mapdata.locations = {};
      this.centre_vote.forEach((centre, index) => {
        if (centre.lat && centre.lon && centre.lat !== 0 && centre.lon !== 0) {
          let maxVotes = Math.max(
            centre.candidate_1.data,
            centre.candidate_2.data,
            centre.candidate_3.data,
            centre.candidate_4.data
          );
          let color = "#808080"; // Gris par défaut si tous les résultats sont 0
          if (maxVotes > 0) {
            if (maxVotes === centre.candidate_1.data) color = "#FF6347";
            // Rouge
            else if (maxVotes === centre.candidate_2.data) color = "#32CD32";
            // Vert
            else if (maxVotes === centre.candidate_3.data)
              color = "#FFCE56"; // jaune
            else if (maxVotes === centre.candidate_4.data) color = "#0000FF";
          }

          simplemaps_countrymap_mapdata.locations[index + 1] = {
            name: centre.libelle,
            lat: centre.lat,
            lng: centre.lon,
            parent_id: "GA1",
            type: "marker",
            color: color,
            size: "40",
            description: `
              <p><strong>Nombre de bureaux de votes :</strong> ${
                centre.total_offices
              }</p>
              <p><strong>Nombre de participants :</strong> ${
                centre.total_registered
              }</p>
              <p><strong>${centre.candidate_1.name} :</strong> ${
              centre.candidate_1.data
            }</p>
              <p><strong>${centre.candidate_2.name} :</strong> ${
              centre.candidate_2.data
            }</p>
              <p><strong>${centre.candidate_3.name} :</strong> ${
              centre.candidate_3.data
            }</p>
            <p><strong>${centre.candidate_4.name} :</strong> ${
              centre.candidate_4.data
            }</p>
              <p><strong>Total des votants :</strong> ${
                centre.total_registered_bureau || "N/A"
              }</p>
            `,
          };
        }
      });
      simplemaps_countrymap.load();
    },

    toggleNationalView() {
      if (this.showNationalView) {
        this.updateMapWithResults(this.candidates); // Appliquer les couleurs
      } else {
        this.resetProvinceColors(); // Enlever les couleurs
      }
      simplemaps_countrymap.load();
    },

    resetProvinceColors() {
      Object.keys(simplemaps_countrymap_mapdata.state_specific).forEach(
        (province) => {
          simplemaps_countrymap_mapdata.state_specific[province].color =
            "#d3d3d3";
          simplemaps_countrymap_mapdata.state_specific[province].hover_color =
            "#d3d3d3";
          simplemaps_countrymap_mapdata.state_specific[province].description =
            "";
        }
      );
    },

    toggleVotingCenters() {
      if (this.showVotingCenters) {
        this.updateMapLocations();
      } else {
        simplemaps_countrymap_mapdata.locations = {};
        simplemaps_countrymap.load();
      }
    },

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

    updateMap() {
      console.log(" :", {
        showVotingCenters: this.showVotingCenters,
      });
    },

    connectWebSocket() {
      this.ws = new WebSocket(this.$wsUrl);

      this.ws.onopen = () => {};

      this.ws.onmessage = (event) => {
        try {
          const message = event.data;
          this.getCentreVote();
          this.getCandidates();
          this.updateMapLocations();
          this.toggleVotingCenters();
          this.get_all_donnees();
          this.updateMapWithResults();
          this.get_stat_candidate();

          if (message && message.updatedData) {
            this.datas = [...this.datas, ...message.updatedData];
          }
        } catch (error) {
          console.error("Erreur WebSocket :", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket :", error);
      };

      this.ws.onclose = () => {
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000);
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
  width: 800px;
  height: 600px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
}

#map2 {
  width: 450px;
  height: 300px;
  position: absolute;
  top: 45%;
  left: 85%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  padding: 5px;
}

.box {
  background-color: rgb(228, 228, 228);
  text-align: center;
}

#filters,
#legend {
  position: absolute;
  top: 10%;
  left: 5%;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
}

#candidates {
  top: 60%;
  position: absolute;
  left: 5%;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
}

.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 10px;
}

.candidate1 {
  background-color: #ff6347;
}

.candidate2 {
  background-color: #32cd32;
}

.candidate3 {
  background-color: #ffce56;
}

.candidate4 {
  background-color: #0000ff;
}

.center {
  background-color: black;
}

.station {
  background-color: gray;
}

#progress-bar-container {
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
  margin-top: 40%;
}

.progress-bar {
  display: flex;
  height: 30px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  position: relative;
}

.progress-segment {
  height: 100%;
  transition: width 0.5s ease-in-out;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-segment.candidate1 {
  background-color: #ff6347;
  left: 0;
}

.progress-segment.candidate2 {
  background-color: #32cd32;
  right: 0;
}

.percentage-text {
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.label {
  font-size: 16px;
  font-weight: bold;
}

.candidate-photo {
  width: 80px;
  height: 80px;
  margin-right: 30%;
}

.d-plex {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* Responsive Design */
@media (max-width: 1024px) {
  #map {
    width: 90%;
    height: 50vh;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  #map2 {
    width: 300px;
    height: 200px;
    left: 80%;
  }

  #filters,
  #legend,
  #candidates {
    width: 200px;
    left: 3%;
  }
}

@media (max-width: 768px) {
  #map {
    width: 100%;
    height: 40vh;
    position: static;
    transform: none;
  }

  #map2 {
    width: 250px;
    height: 150px;
    left: 50%;
    top: auto;
    transform: translate(-50%, 0);
  }

  #filters,
  #legend,
  #candidates {
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  #map {
    height: 35vh;
  }

  #map2 {
    width: 200px;
    height: 120px;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
