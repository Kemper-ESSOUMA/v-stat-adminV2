<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Top cinq (5) des statistiques</h4>
    </div>
  </div>
  <hr>

  <div class="card d-flex flex-column align-items-center justify-content-between">
    <!-- Premier graphique avec son titre -->
    <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
      <h5 class="chart-title text-center">Top cinq (5) par bureaux de vote</h5>
      <ProgressBar mode="indeterminate" style="height: 6px" v-if="loading === true"></ProgressBar>
      <canvas id="prov" width="400" height="200"></canvas>
    </div>

    <!-- Deuxième graphique avec son titre -->
    <!-- <div class="chart-container" style="width: 90%; margin-bottom: 10px;">
      <h5 class="chart-title text-center">Top cinq (5) des candidats</h5>
      <canvas id="candidatesChart" width="400" height="200"></canvas>
    </div> -->
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
  }),

  mounted() {
    this.connectWebSocket();
    this.get_top_5_burreau_votes();
    // this.get_stat_by_zone();
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
          this.get_top_5_burreau_votes();
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

    get_top_5_burreau_votes() {
      this.$axios.get("/pol_sta/all").then((response) => {
        this.pol_sta = response.data;
        console.log('datas pol_sta all=', this.pol_sta);
        this.renderChartTop_5();
      });
    },

    // get_stat_by_zone() {
    //   this.$axios.get("/dep_com_can/stat_by_zone").then((response) => {
    //     this.datas = response.data;
    //     console.log('datas stat_by_zone=', this.datas);
    //     this.renderget_stat_by_zone();
    //   });
    // },

    // renderChartTop_5() {
    //   // Vérifiez si un graphique existe déjà et détruisez-le
    //   if (this.chartInstance) {
    //     this.chartInstance.destroy();
    //   }

    //   // Trier les données pour obtenir le top 5 des abstentions et des scrutins
    //   const sortedData = this.pol_sta.sort((a, b) => b.nb_abstention - a.nb_abstention).slice(0, 5);

    //   // Récupérer les labels et les valeurs des candidats
    //   const labels = sortedData.map(item => item.libelle);
    //   const abstentionValues = sortedData.map(item => item.nb_abstention);
    //   const scrutinValues = sortedData.map(item => item.nb_scrutin_valide);

    //   const ctx = document.getElementById('prov').getContext('2d');

    //   // Créez un nouveau graphique et stockez l'instance
    //   this.chartInstance = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: labels,
    //       datasets: [
    //         {
    //           label: 'Abstentions',
    //           data: abstentionValues,
    //           backgroundColor: 'rgba(255, 99, 132, 0.7)',
    //         },
    //         {
    //           label: 'Scrutin Valide',
    //           data: scrutinValues,
    //           backgroundColor: 'rgba(54, 162, 235, 0.7)',
    //         }
    //       ]
    //     },
    //     options: {
    //       responsive: true,
    //       scales: {
    //         x: {
    //           title: { display: true, text: 'Écoles' }
    //         },
    //         y: {
    //           beginAtZero: true,
    //           title: { display: true, text: 'Nombre de Votes' }
    //         }
    //       }
    //     }
    //   });
    // },

    //Tout en 1
renderChartTop_5() {
    // Vérifiez si un graphique existe déjà et détruisez-le
    if (this.chartInstance) {
        this.chartInstance.destroy();
    }

    // Trier les données pour obtenir le top 5 des abstentions et des scrutins
    const sortedData = this.pol_sta.sort((a, b) => b.nb_abstention - a.nb_abstention).slice(0, 5);

    // Récupérer les labels et les valeurs des écoles
    const labels = sortedData.map(item => item.libelle);
    const abstentionValues = sortedData.map(item => item.nb_abstention);
    const scrutinValues = sortedData.map(item => item.nb_scrutin_valide);

    // Récupérer le Top 5 des candidats ayant obtenu le plus de votes
    const candidateLabels = Object.keys(this.pol_sta[0]).filter(key => key.startsWith('candidate_'));
    const candidateVotes = candidateLabels.map(label => ({
        label: label.replace('candidate_', 'Candidat '),
        total: this.pol_sta.reduce((sum, item) => sum + item[label], 0)
    }));

    const topCandidates = candidateVotes.sort((a, b) => b.total - a.total).slice(0, 5);
    const candidateNames = topCandidates.map(item => item.label);
    const candidateScores = topCandidates.map(item => item.total);

    const ctx = document.getElementById('prov').getContext('2d');

    // Création du graphique combiné
    this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.concat(candidateNames), // Écoles + Candidats
            datasets: [
                {
                    label: 'Abstentions',
                    data: abstentionValues.concat(new Array(candidateNames.length).fill(0)), 
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                },
                {
                    label: 'Scrutin Valide',
                    data: scrutinValues.concat(new Array(candidateNames.length).fill(0)), 
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                },
                {
                    label: 'Votes par Candidat',
                    data: new Array(labels.length).fill(0).concat(candidateScores), 
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Écoles et Candidats' } },
                y: { beginAtZero: true, title: { display: true, text: 'Votes' } }
            }
        }
    });
    },

    

    //en deux graphiques
// renderChartTop_5() {
//     // Vérifiez si un graphique existe déjà et détruisez-le
//     if (this.chartInstance) {
//         this.chartInstance.destroy();
//     }

//     // Trier les données pour obtenir le top 5 des abstentions et des scrutins
//     const sortedData = this.pol_sta.sort((a, b) => b.nb_abstention - a.nb_abstention).slice(0, 5);

//     // Récupérer les labels et les valeurs des écoles
//     const labels = sortedData.map(item => item.libelle);
//     const abstentionValues = sortedData.map(item => item.nb_abstention);
//     const scrutinValues = sortedData.map(item => item.nb_scrutin_valide);

//     // Récupérer le Top 5 des candidats ayant obtenu le plus de votes
//     const candidateLabels = Object.keys(this.pol_sta[0]).filter(key => key.startsWith('candidate_'));
//     const candidateVotes = candidateLabels.map(label => ({
//         label: label.replace('candidate_', 'Candidat '),
//         total: this.pol_sta.reduce((sum, item) => sum + item[label], 0)
//     }));

//     const topCandidates = candidateVotes.sort((a, b) => b.total - a.total).slice(0, 5);
//     const candidateNames = topCandidates.map(item => item.label);
//     const candidateScores = topCandidates.map(item => item.total);

//     // Graphique des abstentions et scrutins
//     const ctxAbstention = document.getElementById('prov').getContext('2d');
//     this.chartInstance = new Chart(ctxAbstention, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Abstentions',
//                     data: abstentionValues,
//                     backgroundColor: 'rgba(255, 99, 132, 0.7)',
//                 },
//                 {
//                     label: 'Scrutin Valide',
//                     data: scrutinValues,
//                     backgroundColor: 'rgba(54, 162, 235, 0.7)',
//                 }
//             ]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true, title: { display: true, text: 'Votes' } }
//             }
//         }
//     });

//     // Graphique du Top 5 des candidats
//     const ctxCandidates = document.getElementById('candidatesChart').getContext('2d');
//     new Chart(ctxCandidates, {
//         type: 'bar',
//         data: {
//             labels: candidateNames,
//             datasets: [{
//                 label: 'Votes par Candidat',
//                 data: candidateScores,
//                 backgroundColor: 'rgba(75, 192, 192, 0.7)'
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true, title: { display: true, text: 'Votes' } }
//             }
//         }
//     });
// }




    // renderget_stat_by_zone() {
    //   // Vérifiez si un graphique existe déjà et détruisez-le
    //   if (this.chartInstanceZone) {
    //     this.chartInstanceZone.destroy();
    //   }

    //   // Préparez les labels pour l'axe X (libellés des zones)
    //   const labels = this.datas.map((zone) => zone.libelle);

    //   // Préparer les datasets pour chaque candidat
    //   const candidateKeys = Object.keys(this.datas[0]).filter((key) =>
    //     key.startsWith("candidate_")
    //   );

    //   const datasets = candidateKeys.map((candidate, index) => ({
    //     label: `Candidat ${index + 1}`,
    //     data: this.datas.map((zone) => zone[candidate]), // Extraire les votes pour ce candidat dans chaque zone
    //     backgroundColor: this.getColorForCandidate(index), // Couleur unique pour chaque candidat
    //   }));

    //   // Récupérer le contexte du canvas
    //   const ctx = document.getElementById("zone").getContext("2d");

    //   // Créez un graphique bar
    //   this.chartInstanceZone = new Chart(ctx, {
    //     type: "bar",
    //     data: {
    //       labels: labels, // Zones sur l'axe X
    //       datasets: datasets, // Données pour chaque candidat
    //     },
    //     options: {
    //       responsive: true,
    //       plugins: {
    //         tooltip: {
    //           callbacks: {
    //             label: function (tooltipItem) {
    //               return `${tooltipItem.dataset.label}: ${tooltipItem.raw} votes`;
    //             },
    //           },
    //         },
    //       },
    //       scales: {
    //         x: {
    //           title: { display: true, text: "Zones" },
    //           stacked: false,
    //         },
    //         y: {
    //           beginAtZero: true,
    //           title: { display: true, text: "Votes" },
    //           stacked: false,
    //         },
    //       },
    //     },
    //   });
    // },

    // Fonction pour attribuer des couleurs aux candidats


  },
};
</script>

<style>
.chart-container {
  display: inline-block;
  vertical-align: top;
}
</style>
