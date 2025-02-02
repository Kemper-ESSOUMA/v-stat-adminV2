<template>
  <div class="btn-group page-nav " role="group" style="margin-left: 40%">
    <div>
      <router-link class="btn " :to="{ name: 'map' }" :class="{ 'active': this.$route.name === 'map' }"
        data-bs-toggle="tooltip" data-bs-placement="right" title="map">
        <i class="pi pi-globe" style="color: #3242C5"></i> GLOBAL
      </router-link>
    </div>
    <div>
      <router-link class="btn " :to="{ name: 'national' }" :class="{ 'active': this.$route.name === 'national' }"
        data-bs-toggle="tooltip" data-bs-placement="right" title="national">
        <i class="pi pi-map-marker" style="color: #3242C5"></i> NATIONAL
      </router-link>
    </div>
    <div>
      <router-link class="btn btn-primary" :to="{ name: 'international' }"
        :class="{ 'active': this.$route.name === 'international' }" data-bs-toggle="tooltip" data-bs-placement="right"
        title="international">
        <i class="pi pi-map" style="color: #3242C5"></i> INTERNATIONAL
      </router-link>
    </div>
  </div>

  <div>


    <div id="map2">
      <div class="box">Afrique</div>
      <div class="box">Europe</div>
      <div class="box">Amerique</div>
      <div class="box">Asie</div>
    </div>
  </div>
</template>

<script>
// import { useAppStore } from "../../../store/app";


export default {
  name: "App",
  data() {
    return {

    };
  },
  // mounted() {
  //   this.loadExternalScripts();
  //   this.get_all_donnees();
  //   this.getCandidates();
  //   this.getCentreVote();
  //   this.connectWebSocket();
  // },

  // beforeUnmount() {
  //   if (this.ws) {
  //     this.ws.close();
  //   }
  // },

  methods: {

    // connectWebSocket() {
    //   this.ws = new WebSocket(this.$wsUrl);

    //   this.ws.onopen = () => {
    //     console.log("WebSocket connecté !");
    //   };

    //   this.ws.onmessage = (event) => {
    //     try {
    //       const message = event.data;
    //       this.getCentreVote();
    //       this.getCandidates();
    //       this.updateMapLocations()
    //       this.toggleVotingCenters()
    //       this.get_all_donnees()

    //       if (message && message.updatedData) {
    //         this.datas = [...this.datas, ...message.updatedData];
    //       }
    //     } catch (error) {
    //       console.error("Erreur WebSocket :", error);
    //     }
    //   };

    //   this.ws.onerror = (error) => {
    //     console.error("Erreur WebSocket :", error);
    //   };

    //   this.ws.onclose = () => {
    //     setTimeout(() => {
    //       this.connectWebSocket();
    //     }, 3000);
    //   };
    // },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#map2 {
  width: 750px;
  height: 500px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  padding: 5px;
}

</style>
