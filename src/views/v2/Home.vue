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

    <!-- Espace candidats -->
    <div id="candidates">
      <h3>Candidats</h3>
      <ul>
        <!-- <li v-for="candidate in candidates" :key="candidate.id">
          <strong>{{ candidate.name }}</strong>: {{ candidate.party }}
        </li> -->
      </ul>
    </div>

    <!-- Légende -->
    <div id="legend">
      <h3>Légende</h3>
      <ul>
        <li>
          <span class="icon center"></span> Centre de vote
        </li>
        <li>
          <span class="icon station"></span> Bureau de vote
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/store/app";
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
          console.log('map = ', this.centre_vote)
          if (this.showVotingCenters) {
            this.updateMapLocations();
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des centres de vote :", error);
        });
    },

    updateMapLocations() {
      // Nettoyer les locations existantes avant mise à jour
      simplemaps_countrymap_mapdata.locations = {};

      // Ajouter les centres de vote comme marqueurs
      this.centre_vote.forEach((centre, index) => {
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
            <p><strong>Total des votants :</strong> ${centre.total_registered_bureau}</p>
          `,
        };
      });

      // Recharger la carte avec les nouvelles locations
      simplemaps_countrymap.load();
      console.log("Locations mises à jour avec succès !");
    },

    toggleVotingCenters() {
      if (this.showVotingCenters) {
        this.updateMapLocations();
      } else {
        // Supprimer tous les marqueurs si la case est décochée
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
          if (src === "/countrymap.js") {
            if (this.showVotingCenters) {
              this.updateMapLocations();
            }
          }
        };
        script.onerror = () => {
          console.error(`Erreur lors du chargement de ${src}.`);
        };
        document.body.appendChild(script);
      });
    },

    updateMap() {
      console.log("Mise à jour de la carte avec les filtres :", {
        showVotingCenters: this.showVotingCenters,
      });
    },
  },
};
</script>

<style>
/* Votre CSS reste inchangé */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#map {
  width: 600px;
  height: 400px;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;

}

#filters,
#candidates,
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
  top: 45%;
}

#legend {
  top: 70%;
}

h3 {
  margin: 0 0 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 50%;
}

.icon.center {
  background-color: blue;
}

.icon.station {
  background-color: green;
}
</style>
