<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Contrôles des données</h4>
    </div>

    <div class="btn-group page-nav " role="group">
      <div>
        <router-link class="btn btn-primary" :to="{ name: 'bureaux-vote' }"
          :class="{ 'active': this.$route.name === 'controles' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Burreaux de votes">
          <i class="pi pi-table" style="color: #3242C5"></i> Bureaux de votes
        </router-link>
      </div>
      <div>
        <router-link class="btn " :to="{ name: 'centre-votes' }"
          :class="{ 'active': this.$route.name === 'centre-votes' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Centre de votes">
          <i class="pi pi-building" style="color: #3242C5"></i> Centres de votes
        </router-link>
      </div>

    </div>

    <div class="px-1 d-flex mr-4">

      <button type="button" class="btn-app btn-success ml-3" @click="exportToExcel">
        Exporter Excel <i class="fa-solid fa-file-excel"></i>
      </button>
    </div>

  </div>
  <hr>

  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.loading === true"></ProgressBar>
    <DataTable :value="datas" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters"
      :globalFilterFields="['libelle_centre', 'libelle', 'code', 'total_registered', 'total_scrutin', 'nb_bulletin_blanc', 'nb_scrutin_valide', 'nb_abstention', 'candidate_1.data', 'candidate_2.data', 'candidate_3.data']">
      <template #header>

        <div class="flex justify-content-end">
          <div class="mr-2" style="padding-right: 80%">
            <button class="btn btn-sm btn-outline-dark mr-2" @click="refreshDatas()" id="refresh-edit-centre">
              <span v-if="loading == true" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
              <i v-else class="fa fa-refresh"></i>
              <span> Actualiser</span>
            </button>
          </div>
          <InputText placeholder="Recherche" v-model="filters['global'].value" />
        </div>

      </template>
      <template #empty>
        Aucune données trouvées
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>

      <DataTableColumn field="code" header="Code du burreau de vote"></DataTableColumn>
      <DataTableColumn field="libelle_centre" header="Libelle centre"></DataTableColumn>
      <DataTableColumn field="libelle" header="Libelle bureau"></DataTableColumn>
      <DataTableColumn field="total_registered" header="Total inscrit"></DataTableColumn>
      <DataTableColumn field="total_scrutin" header="Total votant"></DataTableColumn>
      <DataTableColumn field="nb_bulletin_blanc" header="Bulletin B/N"></DataTableColumn>

      <DataTableColumn field="nb_scrutin_valide" header="Suffrage exprimé"></DataTableColumn>
      <DataTableColumn field="nb_abstention" header="Total abstention"></DataTableColumn>
      <DataTableColumn field="candidate_1.data" header="ACBBN"></DataTableColumn>
      <DataTableColumn field="candidate_2.data" header="CBON"></DataTableColumn>
      <DataTableColumn field="candidate_3.data" header="DIVERS"></DataTableColumn>
      <DataTableColumn header="Actions">
        <template #body="slotProps">
          <div class="d-flex">
            <button class="btn btn-sm btn-info m-1" @click="openModal(slotProps.data)">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
        </template>
      </DataTableColumn>
      <template #footer>
        Total {{ filteredData.length }} .
      </template>
    </DataTable>
  </div>
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
import { FilterMatchMode } from 'primevue/api';
// import CreateBureauVote from './CreateBureauVote.vue';
import EditBureauVote from './EditBureauVote.vue';
import { utils, writeFile } from "xlsx";
import Chart from 'chart.js/auto';
import { useAppStore } from "@/store/app";

export default {
  data() {
    return {
      datas: [],
      loading: true,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
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
    };
  },
  mounted() {
    // this.getvote();
    this.connectWebSocket();
    this.get_stat_by_burreau();
    this.get_stat_by_zone();
  },
  computed: {
    filteredData() {
      if (!this.filters['global'] || !this.filters['global'].value) {
        return this.datas;
      }
      const searchTerm = this.filters['global'].value.toLowerCase();
      return this.datas.filter(item => item.libelle_centre.toLowerCase().includes(searchTerm));
    }
  },
  methods: {
    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

    updateZone(zoneCode) {
      this.selectedZone = zoneCode;
      this.get_stat_by_zone();
    },
    openModal(objetData) {
      this.$dialog.open(EditBureauVote, {
        props: {
          header: "Modifier le centre " + objetData.id,
          style: {
            width: '50vw'
          },
          modal: true
        },
        data: objetData,
      });
    },

    get_stat_by_burreau() {
      this.$axios.get("/pol_sta/by_user_zone").then((response) => {
        this.loading = false
        this.datas = response.data;
        console.log('datas stat_by_burreau=', this.datas);
      });
    },

    // get_stat_by_zone() {
    //   this.$axios.get("/dep_com_can/stat_by_zone").then((response) => {
    //     this.datas1 = response.data;
    //     this.loading = false
    //     console.log('datas stat_by_zone=', this.datas1);
    //     this.renderget_stat_by_zone();
    //   });
    // },
    get_stat_by_zone() {
      this.$axios.get("/dep_com_can/stat_by_zone", { params: { zone: this.selectedZone } })
        .then((response) => {
          this.datas1 = response.data;
          console.log(`Données pour la zone ${this.selectedZone}:`, this.datas1);
          this.renderget_stat_by_zone();
        })
        .catch((error) => console.error("Erreur de récupération des statistiques :", error));
    },


    // getvote() {
    //   this.$axios
    //     .get('/pol_sta/by_user_zone')
    //     .then((response) => {
    //       this.loading = false
    //       this.datas1 = response.data;
    //     })
    //     .catch((error) => {
    //       console.error('Erreur de recuperation de donnees:', error);
    //     });
    // },
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
          const message = event.data;  // Si c'est un JSON, il faut le parser
          console.log("Message reçu via WebSocket :", message);
          this.getvote();

          if (message && message.updatedData) {
            // Mettre à jour les données (si ce message contient une clé `updatedData`)
            this.datas = [...this.datas, ...message.updatedData];
          }
        } catch (error) {
          console.error("Erreur lors de la réception des données WebSocket :", error);
        }
      };
      this.ws.onerror = (error) => {
        console.error("Erreur WebSocket :", error);
      };

      // this.ws.onclose = (event) => {
      //   console.log("WebSocket fermé !", event);
      // };
      this.ws.onclose = () => {
        console.log("WebSocket fermé ! Tentative de reconnexion...", event);
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000); // Reconnexion après 3 secondes
      };

    },
    refreshDatas() {
      this.loading = true
      // this.getvote()
      this.get_stat_by_burreau();
      this.get_stat_by_zone();
    },
    exportToExcel() {
      // Transforme les données en une feuille Excel
      const ws = utils.json_to_sheet(this.datas);

      // Crée un nouveau classeur et ajoute-y la feuille
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Centres de votes");

      // Génère et télécharge le fichier Excel
      writeFile(wb, "centres_votes.xlsx");
    },
    renderget_stat_by_burreau() {
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
        data: this.datas.map((zone) => zone[candidate]),
        backgroundColor: this.getColorForCandidate(index),
      }));

      // Récupérer le contexte du canvas
      const ctx = document.getElementById("zone").getContext("2d");

      // Créez un graphique bar
      this.chartInstanceZone = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets,
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

    renderget_stat_by_zone() {
      // Vérifiez si un graphique existe déjà et détruisez-le
      if (this.chartInstanceZone) {
        this.chartInstanceZone.destroy();
      }

      // Vérifier que this.datas contient des données
      if (!this.datas1 || this.datas1.length === 0) {
        console.error("Aucune donnée disponible pour les statistiques par zone.");
        return;
      }

      // Préparez les labels pour l'axe X (libellés des zones)
      const labels = this.datas1.map(zone => zone.libelle);

      // Récupérer les clés des candidats (ex: candidate_1, candidate_2...)
      const candidateKeys = Object.keys(this.datas1[0]).filter(key => key.startsWith("candidate_"));

      // Vérifier que des candidats existent
      if (candidateKeys.length === 0) {
        console.error("Aucun candidat trouvé dans les données.");
        return;
      }

      // Extraire les noms réels et les votes
      const candidateNames = candidateKeys.map(candidate => this.datas1[0][candidate]?.name || `${candidate}`);
      const datasets = candidateKeys.map((candidate, index) => ({
        label: candidateNames[index], // Utilisation des noms réels
        data: this.datas1.map(zone => zone[candidate]?.data || 0), // Extraire les votes (0 si valeur manquante)
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

    //  Fonction pour attribuer des couleurs aux candidats
    getColorForCandidate(index) {
      const colors = [
        "#FF6384",
        "#32cd32",
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
