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
      <canvas id="zone" width="400" height="200"></canvas>
    </div>
  </div>
</template>




<style scoped>
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
        console.log("WebSocket connecté !");
      };

      this.ws.onmessage = (event) => {
        console.log("Message WebSocket reçu :", event.data);

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
        console.log("WebSocket fermé ! Tentative de reconnexion...");
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
        console.log('datas province=', this.province);
        this.renderChartProvince();
      });
    },

    get_stat_by_zone() {
      this.$axios.get("/dep_com_can/stat_by_zone").then((response) => {
        this.datas = response.data;
        console.log('datas stat_by_zone=', this.datas);
        this.renderget_stat_by_zone();
      });
    },

    renderChartProvince() {

      // Vérifiez si un graphique existe déjà et détruisez-le
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Récupérer les labels et les données
      const labels = Object.keys(this.province[0]).filter(key => key.startsWith('candidate_'));
      const values = this.province.map(item => labels.map(label => item[label]));

      const datasets = labels.map((label, index) => ({
        label: `Candidat ${index + 1}`,
        data: values.map(item => item[index]),
        backgroundColor: this.getColorForCandidate(index),
      }));

      const ctx = document.getElementById('prov').getContext('2d');

      // Créez un nouveau graphique et stockez l'instance
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.province.map(item => item.province),
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

      // Préparez les labels pour l'axe X (libellés des zones)
      const labels = this.datas.map((zone) => zone.libelle);

      // Préparer les datasets pour chaque candidat
      const candidateKeys = Object.keys(this.datas[0]).filter((key) =>
        key.startsWith("candidate_")
      );

      const datasets = candidateKeys.map((candidate, index) => ({
        label: `Candidat ${index + 1}`,
        data: this.datas.map((zone) => zone[candidate]), // Extraire les votes pour ce candidat dans chaque zone
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
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw} votes`;
                },
              },
            },
          },
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
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
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
