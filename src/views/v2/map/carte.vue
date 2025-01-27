<template>
  <div>
    <!-- Carte -->
    <div id="map"></div>

    <!-- Filtres -->
    <div id="filters">
      <h3>Filtres</h3>
      <label>
        <input type="checkbox" v-model="showVotingCenters" @change="toggleVotingCenters" />
        Centres de vote
      </label>
    </div>

    <!-- Légende des couleurs -->
    <div id="legend">
      <h3>Légende des couleurs</h3>
      <ul>
        <li><span class="icon candidate1"></span> Candidat 1</li>
        <li><span class="icon candidate2"></span> Candidat 2</li>
        <li><span class="icon candidate3"></span> Candidat 3</li>
        <li><span class="icon center"></span> Centre de vote</li>
        <li><span class="icon station"></span> Résultats à zéro</li>
      </ul>
    </div>

    <!-- Espace candidats -->
    <div id="candidates">
      <h3>Candidats</h3>
      <ul>
        <li v-for="(candidate, index) in candidates" :key="index">
          <p>Province : {{ candidate.province }}</p>
          <p>Candidat 1 : {{ candidate.candidate_1 }}</p>
          <p>Candidat 2 : {{ candidate.candidate_2 }}</p>
          <p>Candidat 3 : {{ candidate.candidate_3 }}</p>
          <p>Total votes : {{ candidate.nb_scrutin }}</p>
        </li>
        <p v-if="candidates.length === 0">Aucune donnée disponible.</p>
      </ul>
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
      votingData: [],
      candidates: [],
      centre_vote: [],
    };
  },
  mounted() {
    this.loadExternalScripts();
    this.get_all_donnees();
    this.getCandidates();
    this.getCentreVote();
    this.connectWebSocket();
  },

  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },

  methods: {
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
            console.error("Erreur lors de la récupération des données :", error);
          });
      }
    },

    getCandidates() {
      this.$axios
        .get("/resultat/get_vote_by_province")
        .then((response) => {
          this.candidates = response.data;
          this.updateMapWithResults(this.candidates);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des candidats :", error);
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
          console.error("Erreur lors de la récupération des centres de vote :", error);
        });
    },

    updateMapWithResults(apiData) {
      apiData.forEach((data) => {
        const provinceKey = data.province;
        const description = `
          <p><strong>Candidat 1 :</strong> ${data.candidate_1} votes</p>
          <p><strong>Candidat 2 :</strong> ${data.candidate_2} votes</p>
          <p><strong>Candidat 3 :</strong> ${data.candidate_3} votes</p>
          <p><strong>Total Scrutins :</strong> ${data.nb_scrutin} votants</p>
        `;

        if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
          simplemaps_countrymap_mapdata.state_specific[provinceKey].description = description;
        }

        const maxVotes = Math.max(data.candidate_1, data.candidate_2, data.candidate_3);
        let color = "#FFFFFF";
        if (data.candidate_1 === 0 && data.candidate_2 === 0 && data.candidate_3 === 0) {
          color = "#D3D3D3"; // Gris si résultats à zéro
        } else {
          if (maxVotes === data.candidate_1) color = "#FF6347";
          else if (maxVotes === data.candidate_2) color = "#32CD32";
          else if (maxVotes === data.candidate_3) color = "#1E90FF";
        }

        if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
          simplemaps_countrymap_mapdata.state_specific[provinceKey].color = color;
          simplemaps_countrymap_mapdata.state_specific[provinceKey].hover_color = color;
        }
      });

      simplemaps_countrymap.load();
    },

    updateMapLocations() {
      simplemaps_countrymap_mapdata.locations = {};
      this.centre_vote.forEach((centre, index) => {
        if (centre.lat && centre.lon && centre.lat !== 0 && centre.lon !== 0) {
          simplemaps_countrymap_mapdata.locations[index + 1] = {
            name: centre.libelle,
            lat: centre.lat,
            lng: centre.lon,
            parent_id: "GA1",
            type: "marker",
            color: "black",
            size: "100",
            description: `
              <p><strong>Nombre de bureaux de votes :</strong> ${centre.total_offices}</p>
              <p><strong>Nombre de participants :</strong> ${centre.total_registered}</p>
              <p><strong>Total des votants :</strong> ${centre.total_registered_bureau || 'N/A'}</p>
            `,
          };
        }
      });

      simplemaps_countrymap.load();
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
      console.log("Mise à jour de la carte avec les filtres :", {
        showVotingCenters: this.showVotingCenters,
      });
    },

    connectWebSocket() {
      this.ws = new WebSocket(this.$wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connecté !");
      };

      this.ws.onmessage = (event) => {
        try {
          const message = event.data;
          this.getCentreVote();
          this.getCandidates();

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
  background-color: #ffffff;
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

#filters {
  top: 10%;
}

#legend {
  top: 30%;
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
  background-color: #FF6347;
}

.candidate2 {
  background-color: #32CD32;
}

.candidate3 {
  background-color: #1E90FF;
}

.center {
  background-color: black;
}

.station {
  background-color: gray;
}
</style>
