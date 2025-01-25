<template>
  <v-container>
    <v-row>
      <v-breadcrumbs :items="items" class="mb-4">
        <template v-slot:prepend>
          <v-icon size="small" icon="mdi-ticket" class="me-2"></v-icon>
          <v-card-title class="text-primary">Gestion d'analyse des données
          </v-card-title>
        </template>
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>


    <v-container class="mt-8">
      <v-row>
        <v-card-title>
          Tableau des données
          <v-spacer></v-spacer>
        </v-card-title>
      </v-row>
      <div>
        <div><canvas id="line" width="800" height="5"></canvas></div>
        <!-- <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" /> -->
      </div>

      <div>
        <canvas id="prov" width="800" height="400"></canvas>
      </div>

    </v-container>
  </v-container>
</template>

<script>
import Chart from 'chart.js/auto';



export default {

  data: () => ({

    getSiege: [],
    get_all_province: [],

    items: [
      {
        title: "Analyse de données",
        disabled: true,
        //  href: "/tickets",
      },
      {
        title: "Accueil",
        disabled: false,
        href: "/",
      },
    ],
  }),




  mounted() {

    this.get_all_provinces()
    // console.log('getSIege=', this.getSiege);





  },

  methods: {

    get_all_provinces() {
      this.$axios
        .get("/resultat/get_vote_by_province").then((response) => {
          this.province = response.data;
          // this.column_chart_data = response.data;
          console.log("get_all_province=", response);
          this.renderChartProvince(this.province);
          console.log('render=', this.province)
        });
    },








    renderChartProvince() {

      console.log("ici test =", this.province)
      var labels = Object.keys(this.province[0]).slice(1)
      var newLabels = ['Candidat 1', 'Candidat 2', 'Candidat 3'];
      var values = this.province.map(item => Object.values(item).slice(1))

      // var newValues = ['ESTUAIRE', 'HAUT-OGOOUE', 'MOYEN OGOOUE', 'NGOUNIE', 'NYANGA', 'OGOOUE IVINDO', 'OGOOUE-LOLO', 'OGOOUE-MARITIME', 'WOLEU-NTEM'];
      var colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow']
      console.log('labels=', labels)
      console.log('values=', values)

      var datasets = labels.map((label, index) => ({
        label: label,
        data: values.map(item => item[index]),
        backgroundColor: colors[index]
      }))

      const ctx = document.getElementById('prov').getContext('2d');


      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.province.map(item => item.province),
          datasets: datasets,
        },
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Provinces'
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valeurs'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: false,
            },
          },
          barPercentage: 2.9,
        }

      });
    },

    //  async get_all_donnees() {
    //    try {
    //      const accessToken = appStore.token;
    //      if (accessToken != null) {
    //        const headers = {
    //          Authorization: `Bearer ${accessToken}`,
    //        };
    //        const response = await axios.get("/api/voting_centre/get_result", {
    //          headers: headers,
    //        });
    //        console.log("siege =", response.data);
    //        this.getSiege = response.data;
    //        this.renderChart(response.data);
    //      }
    //    } catch (error) {
    //      console.error("Erreur lors de la récupération des données :", error);
    //    }
    //  },

    // renderChart() {

    //   console.log("ici test =", this.getSiege)
    //   var labels = Object.keys(this.getSiege[0]).slice(1)
    //   var values = this.getSiege.map(item => Object.values(item).slice(1))
    //   var colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow']

    //   var datasets = labels.map((label, index) => ({
    //     label: label,
    //     data: values.map(item => item[index]),
    //     backgroundColor: colors[index]
    //   }))

    //   const ctx = document.getElementById('line').getContext('2d');


    //   new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: this.getSiege.map(item => item.siege),
    //       datasets: datasets,
    //     },
    //     options: {
    //       responsive: true,
    //       legend: {
    //         position: 'top',
    //       },
    //       scales: {
    //         x: {
    //           title: {
    //             display: true,
    //             text: 'Siège'
    //           },
    //         },
    //         y: {
    //           beginAtZero: true,
    //           title: {
    //             display: true,
    //             text: 'Valeur'
    //           }
    //         }
    //       },
    //       plugins: {
    //         legend: {
    //           display: true,
    //         },
    //         title: {
    //           display: false,
    //         },
    //       },
    //       barPercentage: 2.9,
    //     },
    //   //    options: {
    //   //    scales: {
    //   //      y: {
    //   //        beginAtZero: true,
    //   //      },
    //   //    },
    //   // },
    //   });
    // },


  },


};
</script>

<!-- <script>
import { Chart } from 'chart.js/auto';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  mounted() {
    this.get_all_donnees();
  },

  methods: {
    async get_all_donnees() {
      try {
        const accessToken = appStore.token;
        if (accessToken != null) {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const response = await axios.get("http://31.207.33.167:8000/api/voting_centre/get_result", {
            headers: headers,
          });
          console.log("siege =", response.data);
          this.getSiege = response.data;
          console.log('tet =', this.getSiege);

          this.renderChart();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    },

    renderChart() {
      const ctx = document.getElementById('line').getContext('2d');
      const labels = this.getSiege.map(obj => obj.siege);
      const values = this.getSiege.map(obj => obj.PDG);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Votes',
            data: values,
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
});
</script> -->
