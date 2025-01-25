<template>
  <div id="app">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.loadExternalScripts();
  },
  methods: {
    loadExternalScripts() {
      const scripts = [
        "/mapdata.js",
        "/countrymap.js",
      ];

      scripts.forEach((src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => {
          console.log(`${src} chargé avec succès.`);
        };
        script.onerror = () => {
          console.error(`Erreur lors du chargement de ${src}.`);
        };
        document.body.appendChild(script);
      });
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: Arial, sans-serif;
}

#map {
  width: 600px;
  height: 400px;
  margin-bottom: 300px;
}
</style>
