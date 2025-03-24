<template>
  <div class="btn-group page-nav" role="group" style="margin-left: 40%">
    <!-- <div>
      <router-link class="btn" :to="{ name: 'map' }" :class="{ active: this.$route.name === 'map' }"
        data-bs-toggle="tooltip" data-bs-placement="right" title="map">
        <i class="pi pi-globe" style="color: #3242c5"></i> GLOBAL
      </router-link>
    </div>
    <div>
      <router-link class="btn" :to="{ name: 'national' }" :class="{ active: this.$route.name === 'national' }"
        data-bs-toggle="tooltip" data-bs-placement="right" title="national">
        <i class="pi pi-map-marker" style="color: #3242c5"></i> NATIONAL
      </router-link>
    </div> -->
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

    <div id="map2" v-if="this.$route.name === 'map'">
      <div class="box candidat1">

        <AvatarPrime :image="candidat1" class="mr-2" size="xlarge" shape="circle" />
        <p>{{ name_acbbn }}</p>
        <div id="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-segment candidate1" :style="{ width: resu_acbbn + '%' }">
              <span class="percentage-text">{{ resu_acbbn }}%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box candidat2">

        <AvatarPrime :image="candidat2" class="mr-2" size="xlarge" shape="circle" />
        <p>{{ name_cbon }}</p>
        <div id="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-segment candidate2" :style="{ width: resu_cbon + '%' }">
              <span class="percentage-text">{{ resu_cbon }}%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box candidat3">

       <AvatarPrime :image="candidat3" class="mr-2" size="xlarge" shape="circle" />
        <p>{{ name_jle }}</p>
        <div id="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-segment candidate3" :style="{ width: resu_jle + '%' }">
              <span class="percentage-text">{{ resu_jle }}%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box candidat4">

        <AvatarPrime :image="candidat4" class="mr-2" size="xlarge" shape="circle" />
        <p>{{ name_sgib }}</p>
        <div id="progress-bar-container">
          <div class="progress-bar">
            <div class="progress-segment candidate4" :style="{ width: resu_sgib + '%' }">
              <span class="percentage-text">{{ resu_sgib }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <div id="filters">
      <h3>Filtres</h3>
      <label>
        <input type="checkbox" v-model="showVotingCenters" @change="toggleVotingCenters" />
        Vue Centres de vote
      </label>
      <label>
        <input type="checkbox" v-model="showNationalView" @change="toggleNationalView" checked />
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
          <p>
            {{ candidate.candidate_4?.name || "Candidat 4" }} :
            {{ candidate.candidate_4?.data ?? "N/A" }}
          </p>
          <p>Total votes : {{ candidate.nb_scrutin ?? "N/A" }}</p>
        </li>

        <p v-if="candidates.length === 0">Aucune donnée disponible.</p>
      </ul>
    </div>

    <!-- Barre de progression des votes -->
    <!-- <div id="progress-bar-container">
      <div class="d-plex">
        <div class="image-container candidate1-image" :style="{ left: resu_acbbn + '%' }">
          <img src="../../../assets/candidat1.png" class="candidate-photo" alt="Candidate 1" />
        </div>
        <div class="image-container candidate2-image" :style="{ left: resu_cbon + '%' }">
          <img src="../../../assets/candidat2.png" class="candidate-photo" alt="Candidate 1" />
        </div>

      </div>
      <div class="progress-bar">
        <div class="progress-segment candidate1" :style="{ width: resu_acbbn + '%' }">
          <div class="candidate-photo candidate1-photo"></div>
          <span class="percentage-text">{{ resu_acbbn }}%</span>
        </div>
        <div class="progress-segment candidate2" :style="{ width: resu_cbon + '%' }">
          <div class="candidate-photo candidate2-photo"></div>
          <span class="percentage-text">{{ resu_cbon }}%</span>
        </div>
      </div>
    </div> -->
    <!-- <div id="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-segment candidate1" :style="{ width: resu_acbbn + '%' }">
          <div class="candidate-photo candidate1-photo"></div>
          <span class="percentage-text">{{ resu_acbbn }}%</span>
        </div>
      </div>
    </div> -->






  </div>
</template>

<script>
import { useAppStore } from "../../../store/app";
const appStore = useAppStore();

import candidat1 from '@/assets/candidat1.png';
import candidat2 from '@/assets/candidat2.png';
import candidat3 from '@/assets/candidat3.png';
import candidat4 from '@/assets/candidat4.png';

export default {
  name: "App",
  data() {
    return {
      candidate1Image: '', // Utilisation de l'importation statique
      candidate2Image: candidat2,
           candidat1,
      candidat2,
      candidat3,
      candidat4,
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
      name_cbon: "",
      resu_acbbn: 0,
      name_acbbn: "",
      resu_jle: 0,
      name_jle: "",
      resu_sgib: 0,
      name_sgib: "",



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
          this.name_cbon = response.data.candidate_2.name;

          this.resu_acbbn = response.data.candidate_1.data.toFixed(2);
          this.name_acbbn = response.data.candidate_1.name;

          this.resu_jle = response.data.candidate_3.data.toFixed(2);
          this.name_jle = response.data.candidate_3.name;

          this.resu_sgib = response.data.candidate_4.data.toFixed(2);
          this.name_sgib = response.data.candidate_4.name;
          console.log("resss", response.data);
          // Met à jour l'affichage des stats
          this.updateStats();

        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },



    // get_stat_candidate() {
    //   this.$axios
    //     .get("/stats_home/get_porcent_by_candidate")
    //     .then((response) => {
    //       const candidate_1 = parseFloat(response.data.candidate_1.data.toFixed(2));
    //       const candidate_2 = parseFloat(response.data.candidate_2.data.toFixed(2));
    //       const candidate_3 = parseFloat(response.data.candidate_3.data.toFixed(2));
    //       const candidate_4 = parseFloat(response.data.candidate_4.data.toFixed(2));

    //       // Mise à jour des valeurs des candidats
    //       this.resu_acbbn = candidate_1;
    //       this.resu_cbon = candidate_2;
    //       this.resu_jle = candidate_3;
    //       this.resu_sgib = candidate_4;

    //       // Comparaison dynamique pour définir l'image, sans modifier les valeurs !
    //       const maxCandidate = Math.max(this.resu_acbbn, this.resu_jle, this.resu_sgib);

    //       if (maxCandidate === this.resu_jle) {
    //         this.candidate1Image = candidat3;
    //       } else if (maxCandidate === this.resu_sgib) {
    //         this.candidate1Image = candidat4;
    //       } else {
    //         this.candidate1Image = candidat1;
    //       }

    //       console.log("Statistiques mises à jour :", {
    //         resu_cbon: this.resu_cbon,
    //         resu_acbbn: this.resu_acbbn,
    //         resu_jle: this.resu_jle,
    //         resu_sgib: this.resu_sgib
    //       });

    //       this.updateStats();
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de la récupération des données :", error);
    //     });
    // },

    // get_stat_candidate() {
    //   this.$axios
    //     .get("/stats_home/get_porcent_by_candidate")
    //     .then((response) => {
    //       const candidate_1 = parseFloat(response.data.candidate_1.data.toFixed(2));
    //       const candidate_2 = parseFloat(response.data.candidate_2.data.toFixed(2));
    //       const candidate_3 = parseFloat(response.data.candidate_3.data.toFixed(2));
    //       const candidate_4 = parseFloat(response.data.candidate_4.data.toFixed(2));

    //       // Mise à jour des valeurs
    //       this.resu_acbbn = candidate_1;
    //       this.resu_cbon = candidate_2;
    //       this.resu_jle = candidate_3;
    //       this.resu_sgib = candidate_4;

    //       // Trouver la valeur maximale
    //       const maxCandidate = Math.max(this.resu_acbbn, this.resu_jle, this.resu_sgib);

    //       // Trouver les candidats qui ont cette valeur maximale
    //       let topCandidates = [];
    //       if (this.resu_acbbn === maxCandidate) topCandidates.push(candidat1);
    //       if (this.resu_jle === maxCandidate) topCandidates.push(candidat3);
    //       if (this.resu_sgib === maxCandidate) topCandidates.push(candidat4);

    //       // Mettre à jour les images dynamiquement
    //       this.candidate1Images = topCandidates;

    //       console.log("Candidats affichés :", this.candidate1Images);

    //       // Met à jour les statistiques si nécessaire
    //       this.updateStats();
    //     })
    //     .catch((error) => {
    //       console.error("Erreur lors de la récupération des données :", error);
    //     });
    // },












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

    // getCandidates() {
    //   this.$axios
    //     .get("/resultat/get_vote_by_province")
    //     .then((response) => {
    //       this.candidates = response.data;
    //       this.total_candidate_1 = response.data[9].total_candidate_1;
    //       this.total_candidate_2 = response.data[9].total_candidate_2;
    //       this.total_candidate_3 = response.data[9].total_candidate_3;
    //       this.total_candidate_4 = response.data[9].total_candidate_4;

    //       this.updateMapWithResults(this.candidates);
    //     })
    //     .catch((error) => {
    //       console.error(
    //         "Erreur lors de la récupération des candidats :",
    //         error
    //       );
    //     });
    // },
    getCandidates() {
      this.$axios
        .get("/resultat/get_vote_by_province")
        .then((response) => {
          // Séparer les provinces des totaux
          const data = response.data;

          // Vérifier si le tableau contient au moins 10 éléments avant d'accéder à l'index 9
          if (data.length < 10) {
            console.error("Données incomplètes reçues :", data);
            return;
          }

          this.candidates = data.slice(0, -1); // Exclure le dernier élément (totaux)
          const totalData = data[data.length - 1]; // Dernier élément contenant les totaux

          // Vérifier que les totaux existent avant de les attribuer
          this.total_candidate_1 = totalData.total_candidate_1 ?? { data: 0, name: "" };
          this.total_candidate_2 = totalData.total_candidate_2 ?? { data: 0, name: "" };
          this.total_candidate_3 = totalData.total_candidate_3 ?? { data: 0, name: "" };
          this.total_candidate_4 = totalData.total_candidate_4 ?? { data: 0, name: "" };

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
          console.error(
            "Erreur lors de la récupération des centres de vote :",
            error
          );
        });
    },

    // updateMapWithResults(apiData) {
    //   apiData.forEach((data) => {
    //     const provinceKey = data.province;
    //     const description = `
    //       <p><strong>${data.candidate_1.name} :</strong> ${data.candidate_1.data} votes</p>
    //       <p><strong>${data.candidate_2.name} :</strong> ${data.candidate_2.data} votes</p>
    //       <p><strong>${data.candidate_3.name} :</strong> ${data.candidate_3.data} votes</p>
    //       <p><strong>${data.candidate_4.name} :</strong> ${data.candidate_4.data} votes</p>
    //       <p><strong>Total Scrutins :</strong> ${data.nb_scrutin} votants</p>
    //     `;

    //     if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
    //       simplemaps_countrymap_mapdata.state_specific[
    //         provinceKey
    //       ].description = description;
    //     }

    //     const maxVotes = Math.max(
    //       data.candidate_1.data,
    //       data.candidate_2.data,
    //       data.candidate_3.data,
    //       data.candidate_4.data
    //     );
    //     let color = "#FFFFFF";
    //     if (
    //       data.candidate_1.data === 0 &&
    //       data.candidate_2.data === 0 &&
    //       data.candidate_3.data === 0 &&
    //       data.candidate_4.data === 0
    //     ) {
    //       color = "#D3D3D3"; // Gris si résultats à zéro
    //     } else {
    //       if (maxVotes === data.candidate_1.data) color = "#FF6347";
    //       else if (maxVotes === data.candidate_2.data) color = "#32CD32";
    //       else if (maxVotes === data.candidate_3.data) color = "#FFCE56";
    //       else if (maxVotes === data.candidate_4.data) color = "#0000FF";
    //     }

    //     if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
    //       simplemaps_countrymap_mapdata.state_specific[provinceKey].color =
    //         color;
    //       simplemaps_countrymap_mapdata.state_specific[
    //         provinceKey
    //       ].hover_color = color;
    //     }
    //   });

    //   simplemaps_countrymap.load();
    // },

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
          simplemaps_countrymap_mapdata.state_specific[provinceKey].description = description;
        }

        // Créer un tableau des candidats avec leurs votes
        const candidates = [
          { name: data.candidate_1.name, value: data.candidate_1.data, color: "#FF6347" }, // Rouge
          { name: data.candidate_2.name, value: data.candidate_2.data, color: "#32CD32" }, // Vert
          { name: data.candidate_3.name, value: data.candidate_3.data, color: "#FFCE56" }, // Jaune
          { name: data.candidate_4.name, value: data.candidate_4.data, color: "#0000FF" }, // Bleu
        ];

        // Trouver le nombre maximum de votes
        const maxVotes = Math.max(...candidates.map(c => c.value));

        // Vérifier combien de candidats ont ce score maximum
        const leaders = candidates.filter(c => c.value === maxVotes);

        let color = "#FFFFFF"; // Couleur par défaut : blanc

        if (candidates.every(c => c.value === 0)) {
          color = "#D3D3D3"; // Gris si aucun vote
        } else if (leaders.length > 1) {
          color = "#808080"; // Gris neutre si égalité
        } else {
          // Si un seul gagnant
          color = leaders[0].color;
        }

        // Appliquer la couleur sur la carte
        if (simplemaps_countrymap_mapdata.state_specific[provinceKey]) {
          simplemaps_countrymap_mapdata.state_specific[provinceKey].color = color;
          simplemaps_countrymap_mapdata.state_specific[provinceKey].hover_color = color;
        }
      });

      // Recharger la carte après les modifications
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
              color = "#FFCE56"; // Bleu
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
              <p><strong>Nombre de bureaux de votes :</strong> ${centre.total_offices
              }</p>
              <p><strong>Nombre de participants :</strong> ${centre.total_registered
              }</p>
              <p><strong>${centre.candidate_1.name} :</strong> ${centre.candidate_1.data
              }</p>
              <p><strong>${centre.candidate_2.name} :</strong> ${centre.candidate_2.data
              }</p>
              <p><strong>${centre.candidate_3.name} :</strong> ${centre.candidate_3.data
              }</p>
              <p><strong>${centre.candidate_4.name} :</strong> ${centre.candidate_4.data
              }</p>

              <p><strong>Total des votants :</strong> ${centre.total_registered_bureau || "N/A"
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
    updateStats() {
      console.log("Mise à jour des statistiques :", {
        resu_cbon: this.resu_cbon,
        resu_acbbn: this.resu_acbbn,
        resu_jle: this.resu_jle,
        resu_sgib: this.resu_sgib,
      });
    },


    connectWebSocket() {
      this.ws = new WebSocket(this.$wsUrl);

      this.ws.onopen = () => { };

      this.ws.onmessage = (event) => {
        try {
          const message = event.data;
          this.getCentreVote();
          this.getCandidates();
          this.updateMapLocations();
          this.toggleVotingCenters();
          this.toggleNationalView();
          this.get_all_donnees();
          this.get_stat_candidate();
          this.updateStats();
          this.updateMapWithResults();


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
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 10px;
}

.box img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
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
  position: absolute;
  top: 60%;
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

#progress-bar-container {
  width: 100%;
  margin-top: 10px;
}

.progress-bar {
  width: 100%;
  height: 18px;
  background: #ddd;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.progress-segment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  position: relative;
}



.percentage-text {
  font-size: 12px;
  position: absolute;
  right: -60px;
  top: -5px;
  color: black;
  padding: 3px 6px;
  border-radius: 4px;
}

.label {
  font-size: 16px;
  font-weight: bold;
}

.label.candidate1 {
  color: #ff6347;
}

.label.candidate2 {
  color: #32cd32;
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

/* ----------- RESPONSIVE DESIGN ----------- */

/* Écrans tablettes (max 1024px) */
@media (max-width: 1024px) {
  #map {
    width: 90%;
    height: 50vh;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

  #map2 {
    width: 300px;
    height: 200px;
    left: 80%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  #filters,
  #legend,
  #candidates {
    width: 200px;
    left: 3%;
  }

  .progress-bar {
    height: 20px;
  }

  .candidate-photo {
    width: 60px;
    height: 60px;
  }
}

/* Écrans mobiles (max 768px) */
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
    top: auto;
    position: relative;
    margin-bottom: 10px;
  }

  #progress-bar-container {
    width: 90%;
    margin-top: 20px;
  }

  .progress-bar {
    height: 15px;
  }

  .candidate-photo {
    width: 50px;
    height: 50px;
  }

  .label {
    font-size: 14px;
  }
}

/* Écrans très petits (max 480px) */
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

  .candidate-photo {
    width: 40px;
    height: 40px;
  }

  .progress-bar {
    height: 12px;
  }

  .label {
    font-size: 12px;
  }
}
</style>
