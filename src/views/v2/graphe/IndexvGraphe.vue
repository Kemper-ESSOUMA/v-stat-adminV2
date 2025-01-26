<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Analyse des données</h4>
    </div>
  </div>
  <hr>

  <!-- Conteneur pour les graphiques avec disposition en colonne -->
  <div class="card d-flex flex-column align-items-center justify-content-between">

    <!-- Premier graphique en haut -->
    <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
      <ProgressBar mode="indeterminate" style="height: 6px" v-if="loading === true"></ProgressBar>
      <canvas id="prov" width="400" height="200"></canvas>
    </div>

    <!-- Deuxième graphique en bas -->
    <div class="chart-container" style="width: 90%;">
      <canvas id="secondChart" width="500" height="300"></canvas>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>


<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    // this.get_vote_centre_vote();
    this.zoneCode = this.currentUser().zone_code;
  },


  methods: {

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
          const message = event.data; // Parse les données si elles sont en JSON
          console.log("Message WebSocket analysé :", message);

          // Vérifiez si le message contient `updatedData`
          if (message && message.updatedData) {
            console.log("Données mises à jour reçues :", message.updatedData);

            // Ajoutez les nouvelles données et mettez à jour le graphique
            this.province = [...this.province, ...message.updatedData];
            this.get_all_provinces();
            this.renderChartProvince();
          }

          // Vérifiez si le message contient `updatedProvinces`
          if (message && message.updatedProvinces) {
            console.log("Provinces mises à jour reçues :", message.updatedProvinces);

            // Remplacez les données et mettez à jour le graphique
            this.province = message.updatedProvinces;
            this.get_all_provinces();
            this.renderChartProvince();
          }
        } catch (error) {
          console.error("Erreur lors de la réception des données WebSocket :", error);
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

    // get_vote_centre_vote() {
    //   this.$axios.get(`/voting_centre/by_zone`).then((response) => {
    //     this.datas = response.data;
    //     console.log('datas centre by zone=', this.datas);
    //     this.renderSecondChart();
    //   });
    // },

    renderChartProvince() {
      console.log("Données actuelles pour le graphique :", this.province);

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
        backgroundColor: ['red', 'blue', 'green', 'purple', 'orange', 'yellow'][index],
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
    }



    // renderSecondChart() {
    //   // Extraire dynamiquement les noms des candidats
    //   const candidates = Object.keys(this.datas[0]).filter(key => key.startsWith('candidate_')); // Filtrer les clés commençant par 'candidate_'

    //   // Préparer les labels pour les centres de vote
    //   const labels = this.datas.map(item => item.libelle); // Utilisation du libellé pour les centres de vote

    //   // Préparer un tableau pour chaque candidat avec les votes par centre
    //   const datasets = candidates.map((candidate, index) => {
    //     return {
    //       label: `Candidat ${index + 1}`,  // Nom dynamique du candidat
    //       data: this.datas.map(item => item[candidate] || 0), // Récupérer les votes pour chaque candidat, avec 0 par défaut
    //       backgroundColor: `rgba(${(index * 40 + 50) % 255}, ${(index * 60 + 80) % 255}, ${(index * 80 + 100) % 255}, 0.6)`, // Couleurs dynamiques pour chaque candidat
    //       borderColor: `rgba(${(index * 40 + 50) % 255}, ${(index * 60 + 80) % 255}, ${(index * 80 + 100) % 255}, 1)`,
    //       borderWidth: 1,
    //     };
    //   });

    //   console.log('labels vote=', labels);
    //   console.log('datasets vote=', datasets);

    //   // Récupérer le contexte du canvas
    //   const ctx = document.getElementById('secondChart').getContext('2d');

    //   // Créer le graphique avec Chart.js
    //   new Chart(ctx, {
    //     type: 'bar', // Type de graphique (bar)
    //     data: {
    //       labels: labels, // Centres de vote comme labels
    //       datasets: datasets, // Datasets pour chaque candidat
    //     },
    //     options: {
    //       responsive: true, // Rend le graphique réactif
    //       plugins: {
    //         legend: {
    //           display: true, // Affiche la légende
    //           position: 'top', // Position de la légende
    //         },
    //       },
    //       scales: {
    //         x: {
    //           title: {
    //             display: true, // Affiche le titre de l'axe X
    //             text: 'Centres de vote', // Titre de l'axe X
    //           },
    //           barPercentage: 0.5, // Ajuste la largeur des barres
    //         },
    //         y: {
    //           beginAtZero: true, // Commence l'axe Y à 0
    //           title: {
    //             display: true, // Affiche le titre de l'axe Y
    //             text: 'Votes', // Titre de l'axe Y
    //           },
    //         },
    //       },
    //     },
    //   });
    // },


  },
};
</script>

<style>
.chart-container {
  display: inline-block;
  vertical-align: top;
}
</style>
