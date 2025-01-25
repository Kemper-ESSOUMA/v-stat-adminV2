<template>
  <div>
    <v-row justify="center">
      <v-col>
         <h2 class="text-center text-primary">Résultats Haut OGOOUE</h2>
        <!-- <line-chart :data="data" /> -->
        <column-chart :data="data" :colors="pieChartColors"></column-chart>
      </v-col>
    </v-row>
  </div>
  <!-- <pie-chart :data="data"></pie-chart>
  <line-chart :data="dataTest" />
  <column-chart :data="dataTest"></column-chart> -->
  <!-- <bar-chart :data="dataTest"></bar-chart> -->
</template>


<script>
export default {
  data: () => ({
    data: [],
    pieChartColors: ['green', 'red', 'purple', 'orange', 'purple'],
    // data: [['Blueberry', 44], ['Strawberry', 23]],
    // data1: [
    //   {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
    //   {name: 'Call parents', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}}
    // ]
  }),
  methods: {
    async getData() {
      await this.$axios
        .get("/voting_centre/by_province/02")
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
        });
    },
  },
  beforeMount() {
    this.getData();
  },
  mounted() {
    // Appeler getData() au montage initial
    this.getData();

    // Exécuter getData() toutes les 3 minutes (180 000 millisecondes)
    setInterval(() => {
      this.getData();
    }, 130000);
  },
};
</script>
