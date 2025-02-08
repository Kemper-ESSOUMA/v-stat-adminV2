<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Remontées de votes internationales</h4>
    </div>

    <div class="px-1 d-flex mr-4">
      <!-- <button type="button" class="btn-app btn-active" @click="openCreateModal()">
        Enregistrer <i class="fa-solid fa-plus"></i>
      </button> -->

      <button type="button" class="btn-app btn-success ml-3" @click="exportToExcel">
        Exporter Excel <i class="fa-solid fa-file-excel"></i>
      </button>
    </div>

  </div>
  <hr>

  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.loading === true"></ProgressBar>
    <DataTable :value="datas" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" :globalFilterFields="['libelle']">
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
          <InputText placeholder="Keyword Search" v-model="filters['global'].value" />
        </div>

      </template>
      <template #empty>
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>

      <DataTableColumn field="code" header="Code"></DataTableColumn>
      <DataTableColumn field="libelle" header="Ambassade"></DataTableColumn>
      <DataTableColumn field="zone" header="Pays"></DataTableColumn>
      <DataTableColumn field="total_registered" header="Total Enregistré"></DataTableColumn>
      <DataTableColumn field="total_offices" header="Nombre Bureau"></DataTableColumn>
      <DataTableColumn field="total_scrutin" header="Total de scrutin"></DataTableColumn>
      <!-- <DataTableColumn field="burreau_code" header="Code du bureau"></DataTableColumn> -->
      <DataTableColumn field="nb_abstention" header="Scrutin nulle"></DataTableColumn>
      <DataTableColumn field="nb_bulletin_blanc" header="Bulletin blanc"></DataTableColumn>
      <DataTableColumn field="nb_scrutin_valide" header="Scrutin validé"></DataTableColumn>
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
        Total {{ datas ? datas.length : 0 }} .
      </template>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
// import CreateFicheClimatVue from './CreateFicheClimat.vue';
import EditCentreVote from './EditCentreVote.vue';
import { utils, writeFile } from "xlsx";

export default {
  data() {
    return {
      datas: [],
      loading: true,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  mounted() {
    this.getvote();
    this.connectWebSocket();
  },
  methods: {
    openModal(objetData) {
      this.$dialog.open(EditCentreVote, {
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
    // openCreateModal() {
    //   this.$dialog.open(CreateFicheClimatVue, {
    //     props: {
    //       header: "Fiche de climat ",
    //       style: {
    //         width: '50vw'
    //       },
    //       modal: true
    //     },
    //   });
    // },
    getvote() {
      this.$axios
        .get('/voting_centre/by_zone')
        .then((response) => {
          this.loading = false
          this.datas = response.data;
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },
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
      this.getvote()
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
  },
};
</script>
