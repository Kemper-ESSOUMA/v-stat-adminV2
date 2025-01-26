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
        <li v-for="(candidate, index) in candidates" :key="index">
          <p>Province : {{ candidate.province }}</p>
          <p>Candidate 1 : {{ candidate.candidate_1 }}</p>
          <p>Candidate 2 : {{ candidate.candidate_2 }}</p>
          <p>Candidate 3 : {{ candidate.candidate_3 }}</p>
          <p>Total votes : {{ candidate.nb_scrutin }}</p>
        </li>
        <p v-if="candidates.length === 0">Aucune donnée disponible.</p>
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
    this.connectWebSocket()
  },

  // Déconnecter le WebSocket lorsque le composant est détruit
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
          console.log('candidats = ', this.candidates)
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

    updateMapLocations() {
  // Nettoyer les locations existantes avant mise à jour
  simplemaps_countrymap_mapdata.locations = {};

  // Ajouter les centres de vote comme marqueurs si les coordonnées sont valides
  this.centre_vote.forEach((centre, index) => {
  // console.log(`Centre ${index + 1}: lat=${centre.lat}, lon=${centre.lon}`);  // Vérifie les coordonnées
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


  // Recharger la carte avec les nouvelles locations
  simplemaps_countrymap.load();
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
          if (src === "/countrymap.js" && this.showVotingCenters) {
            this.updateMapLocations();
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

    connectWebSocket() {
      // Définir l'URL du WebSocket (à adapter selon votre serveur)
      this.ws = new WebSocket(this.$wsUrl);

      // Gestion des événements WebSocket
      this.ws.onopen = () => {
        console.log("WebSocket connecté !");
        console.log("Données initiales :", this.datas); // Affichage des données initiales
      };

      this.ws.onmessage = (event) => {
        console.log("Événement WebSocket : Message reçu");

        try {
          const message = event.data;  // Si c'est un JSON, il faut le parser
          console.log("Message reçu via WebSocket :", message);
          this.getCentreVote();
          this.getCandidates()

          if (message && message.updatedData) {
            // Mettre à jour les données (si ce message contient une clé `updatedData`)
            this.datas = [...this.datas, ...message.updatedData];
          }
        } catch (error) {
          console.error("Erreur lors de la réception des données WebSocket :", error);
        }
      };
      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket :", error);
      };

      // this.ws.onclose = (event) => {
      //   console.log("WebSocket fermé !", event);
      // };
      this.ws.onclose = () => {
        console.log("WebSocket fermé ! Tentative de reconnexion...", event);
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000); // Reconnexion après 3 secondes
      };

    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#map {
  width: 800px; /* Augmenter la taille de la carte */
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

#candidates {
  top: 25%;
  position: absolute;
  left: 5%;
  background: #f9f9f9; /* Couleur de fond plus douce */
  border: 1px solid #e0e0e0; /* Couleur de bordure plus claire */
  border-radius: 12px; /* Bords arrondis */
  padding: 15px; /* Plus d'espace pour un rendu plus aéré */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ombre subtile */
  width: 300px; /* Augmentation de la largeur pour une meilleure lecture */
  max-height: 400px; /* Plus d'espace pour les données */
  overflow-y: auto;
  font-family: 'Arial', sans-serif; /* Police simple et lisible */
}

#candidates h3 {
  font-size: 18px; /* Taille de police légèrement augmentée */
  color: #333; /* Couleur plus foncée pour un meilleur contraste */
  margin-bottom: 10px;
}

#candidates ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#candidates li {
  background: #ffffff; /* Couleur de fond des éléments */
  border: 1px solid #ddd; /* Légère bordure pour séparer les éléments */
  border-radius: 8px; /* Bords arrondis */
  margin-bottom: 10px; /* Espacement entre les éléments */
  padding: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Animation fluide pour le survol */
}

#candidates li:hover {
  transform: translateY(-2px); /* Légère élévation au survol */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Ombre accentuée */
}

#candidates li p {
  margin: 5px 0; /* Espacement vertical entre les paragraphes */
  font-size: 14px;
  color: #555; /* Texte secondaire en gris */
}

#candidates li p strong {
  color: #222; /* Texte principal en noir */
}

#candidates::-webkit-scrollbar {
  width: 8px; /* Largeur de la barre de défilement */
}

#candidates::-webkit-scrollbar-thumb {
  background: #ccc; /* Couleur de la barre de défilement */
  border-radius: 8px; /* Arrondir la barre de défilement */
}

#candidates::-webkit-scrollbar-thumb:hover {
  background: #aaa; /* Couleur au survol */
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
