<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Analyse des données</h4>
    </div>
  </div>
  <hr>

  <div class="card d-flex flex-column align-items-center justify-content-between">
    <!-- Premier graphique avec son titre -->
    <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
      <h5 class="chart-title text-center">Votes par Province</h5>
      <ProgressBar mode="indeterminate" style="height: 6px" v-if="loading === true"></ProgressBar>
      <canvas id="prov" width="400" height="200"></canvas>
    </div>

    <!-- Deuxième graphique avec son titre -->
    <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
      <h5 class="chart-title text-center">Votes par Zone</h5>
      <div class="button-container text-center" v-if="currentUser().role === 'SUPER_ADMIN'">
        <button v-for="(zone, index) in zones" :key="index" @click="updateZone(zone.code)"
          :class="['data-btn', { active: selectedZone === zone.code }]">
          {{ zone.name }}
        </button>
      </div>

      <canvas id="zone" width="400" height="200"></canvas>
    </div>


  </div>
</template>




<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.data-btn {
  padding: 5px 10px;
  border: none;
  background-color: #9abeda;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.data-btn:hover {
  background-color: #0056b3;
}

.data-btn.active {
  background-color: #0056b3 !important;
  color: white;
  font-weight: bold;
}


.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chart-title {
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.text-center {
  text-align: center;
}
</style>


<script>
import Chart from 'chart.js/auto';
import { useAppStore } from "@/store/app";

export default {
  data: () => ({
    ws: null,
    datas: [],
    get_all_province: [],
    province: [],
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
    selectedZone: "01", // Zone par défaut
    zones: [
      { code: "01", name: "Estuaire" },
      { code: "02", name: "Haut-Ogooué" },
      { code: "03", name: "Moyen-Ogooué" },
      { code: "04", name: "Ngounié" },
      { code: "05", name: "Nyanga" },
      { code: "06", name: "Ogooué-Ivindo" },
      { code: "07", name: "Ogooué-Lolo" },
      { code: "08", name: "Ogooué-Maritime" },
      { code: "09", name: "Woleu-Ntem" }
    ]
  }),

  mounted() {
    this.connectWebSocket();
    this.get_all_provinces();
    this.get_stat_by_zone();
    this.zoneCode = this.currentUser().zone_code;
  },


  methods: {

    connectWebSocket() {
      // Définir l'URL du WebSocket (à adapter selon votre serveur)
      this.ws = new WebSocket(this.$wsUrl);

      // Gestion des événements WebSocket
      this.ws.onopen = () => {
      };

      this.ws.onmessage = (event) => {

        try {
          // Appeler la fonction pour récupérer et actualiser les données
          this.get_all_provinces();
          this.get_stat_by_zone();
        } catch (error) {
          console.error("Erreur lors du traitement du message WebSocket :", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket :", error);
      };

      this.ws.onclose = () => {

        setTimeout(() => {
          this.connectWebSocket(); // Reconnexion après 3 secondes
        }, 3000);
      };
    },

    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

    get_all_provinces() {
      this.$axios.get("/resultat/get_vote_by_province").then((response) => {
        this.province = response.data;
        this.renderChartProvince();
      });
    },

    updateZone(zoneCode) {
      this.selectedZone = zoneCode;
      this.get_stat_by_zone();
    },

    get_stat_by_zone() {
      this.$axios.get("/dep_com_can/stat_by_zone", { params: { zone: this.selectedZone } })
        .then((response) => {
          this.datas = response.data;
          this.renderget_stat_by_zone();
        })
        .catch((error) => console.error("Erreur de récupération des statistiques :", error));
    },

    renderChartProvince() {
      // Vérifiez si un graphique existe déjà et détruisez-le
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Vérifier que this.province n'est pas vide
      if (!this.province || this.province.length === 0) {
        console.error("Aucune donnée disponible pour le graphique.");
        return;
      }

      // Récupérer les clés des candidats (ex: candidate_1, candidate_2...)
      const candidates = Object.keys(this.province[0]).filter(key => key.startsWith("candidate_"));

      // Vérifier que des candidats existent
      if (candidates.length === 0) {
        console.error("Aucun candidat trouvé dans les données.");
        return;
      }

      // Extraire les noms et les votes avec sécurité
      const labels = candidates.map(candidate => this.province[0][candidate]?.name || `${candidate}`);
      const values = this.province.map(item =>
        candidates.map(candidate => item[candidate]?.data || 0) // Valeur par défaut 0 si undefined
      );

      // Construire les datasets avec les vrais noms des candidats
      const datasets = labels.map((name, index) => ({
        label: name, // Utilisation des noms réels
        data: values.map(item => item[index]),
        backgroundColor: this.getColorForCandidate(index),
      }));

      const ctx = document.getElementById('prov').getContext('2d');

      // Créez un nouveau graphique et stockez l'instance
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.province.map(item => item.province), // Nom des provinces sur l'axe X
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: 'Provinces' },
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Votes' },
            },
          },
        },
      });
    },




    renderget_stat_by_zone() {
      // Vérifiez si un graphique existe déjà et détruisez-le
      if (this.chartInstanceZone) {
        this.chartInstanceZone.destroy();
      }

      // Vérifier que this.datas contient des données
      if (!this.datas || this.datas.length === 0) {
        console.error("Aucune donnée disponible pour les statistiques par zone.");
        return;
      }

      // Préparez les labels pour l'axe X (libellés des zones)
      const labels = this.datas.map(zone => zone.libelle);

      // Récupérer les clés des candidats (ex: candidate_1, candidate_2...)
      const candidateKeys = Object.keys(this.datas[0]).filter(key => key.startsWith("candidate_"));

      // Vérifier que des candidats existent
      if (candidateKeys.length === 0) {
        console.error("Aucun candidat trouvé dans les données.");
        return;
      }

      // Extraire les noms réels et les votes 
      const candidateNames = candidateKeys.map(candidate => this.datas[0][candidate]?.name || `${candidate}`);
      const datasets = candidateKeys.map((candidate, index) => ({
        label: candidateNames[index], // Utilisation des noms réels
        data: this.datas.map(zone => zone[candidate]?.data || 0), // Extraire les votes (0 si valeur manquante)
        backgroundColor: this.getColorForCandidate(index), // Couleur unique pour chaque candidat
      }));

      // Récupérer le contexte du canvas
      const ctx = document.getElementById("zone").getContext("2d");

      // Créez un graphique bar
      this.chartInstanceZone = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels, // Zones sur l'axe X
          datasets: datasets, // Données pour chaque candidat
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: { display: true, text: "Zones" },
              stacked: false,
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: "Votes" },
              stacked: false,
            },
          },
        },
      });
    },


    // Fonction pour attribuer des couleurs aux candidats
    getColorForCandidate(index) {
      const colors = [
        "#FF6384",
        "#32cd32",
        "#FFCE56",
        "#0000FF",
        "#9966FF",
        "#FF9F40",
      ];
      return colors[index % colors.length]; // Répéter les couleurs si plus de 6 candidats
    },




  },
};
</script>

<style>
.chart-container {
  display: inline-block;
  vertical-align: top;
}
</style>
