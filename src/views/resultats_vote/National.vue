<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="results-container">
    <v-row justify="center" class="mb-5">
      <v-col>
        <h2 class="text-center text-primary">Résultats National</h2>
        <div class="chart-container">
          <pie-chart :data="data" :colors="pieChartColors"></pie-chart>
        </div>
        <v-spacer></v-spacer>
      </v-col>

      <v-col>
        <v-card class="mx-auto legend-card" max-width="300">
          <v-list dense>
            <v-list-subheader class="legend-header">Légende</v-list-subheader>
            <v-list-item class="legend-item">
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip class="ma-2 legend-chip green-chip">
                    {{ pdg }}
                  </v-chip>
                  CANDIDAT 1
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip class="ma-2 legend-chip red-chip">
                    {{ ondo }}
                  </v-chip>
                  CANDIDAT 2
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip class="ma-2 legend-chip purple-chip">
                    {{ autre }}
                  </v-chip>
                  CANDIDAT 3
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="chart-container">
          <column-chart :data="data1" :colors="pieChartColors"></column-chart>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.results-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.text-primary {
  color: #1976d2;
  font-weight: bold;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.legend-card {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.legend-header {
  font-weight: bold;
  color: #555;
  text-transform: uppercase;
  padding-bottom: 10px;
}

.legend-item {
  padding: 10px 0;
}

.legend-chip {
  font-weight: bold;
  color: #fff;
}

.green-chip {
  background-color: #4caf50;
}

.red-chip {
  background-color: #f44336;
}

.purple-chip {
  background-color: #9c27b0;
}
</style>



<script>
export default {
  data: () => ({
    province: [],
    data: null,
    data1: null,
    result: [],
    pdg: 0,
    ondo: 0,
    autre: 0,
    pie_chart_data: null,
    column_chart_data: null,
    pieChartColors: ["green", "red", "purple", "orange", "purple"],
    data12: [
      {
        name: "Workout",
        data: {
          "2017-01-01 00:00:00 -0800": 3,
          "2017-01-02 00:00:00 -0800": 4,
        },
      },
      {
        name: "Call parents",
        data: {
          "2017-01-01 00:00:00 -0800": 5,
          "2017-01-02 00:00:00 -0800": 3,
        },
      },
    ],
  }),

  methods: {
    async grpah() {
      await this.getData();
      await this.getData1()
    },

    async getData1() {
      await this.$axios
        .get("/resultat/get_vote_by_province")
        .then((response) => {
          const data = response.data;
          // this.data1 = response.data;
          var newData = [];
          var candidates = [
            "candidate_1",
            "candidate_2",
            "candidate_3",
          ];
          var candidateNames = ["CANDIDAT 1", "CANDIDAT 2", "CANDIDAT 3"];

          for (var i = 0; i < candidates.length; i++) {
            var candidateData = {
              name: candidateNames[i], // Utilise le nom de candidat approprié
              data: {},
            };

            for (var j = 0; j < data.length; j++) {
              var province = data[j].province;
              var candidateValue = data[j][candidates[i]];

              candidateData.data[province] = candidateValue;
            }

            newData.push(candidateData);
          }

          console.log(newData);
          this.data1 = newData;

          console.log("par province", data);
          // this.column_chart_data = response.data;
        });
    },

    async getData() {
      await this.$axios
        .get("/voting_centre/get_result_by_province")
        .then((response) => {
          this.data = response.data;
          this.pdg = response.data[0][1];
          this.ondo = response.data[1][1];
          this.autre = response.data[2][1];
          // console.log("pdg", response.data[2][1])
          // this.column_chart_data = response.data;
        });
    },
  },
  beforeMount() {
    this.getData();
    this.getData1();
  },
  mounted() {
    // Appeler getData() au montage initial
    // this.getData();
    // this.get_all_provinces();

    // Exécuter getData() toutes les 3 minutes (180 000 millisecondes)
    setInterval(() => {
      this.grpah();
    }, 130000);
  },
};
</script>
