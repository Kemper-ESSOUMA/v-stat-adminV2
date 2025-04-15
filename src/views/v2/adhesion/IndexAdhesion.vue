<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Liste des adhérents</h4>
    </div>


  </div>
  <hr />

  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.loading === true"></ProgressBar>
    <DataTable :value="datas" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" :globalFilterFields="['prefix','lastname','firstname','second_firstname','residence','nip']">
      <template #header>
        <div class="flex justify-content-end">
          <div class="mr-2" style="padding-right: 80%">
            <button class="btn btn-sm btn-outline-dark mr-2" @click="refreshDatas()" id="refresh-user">
              <span v-if="loading == true" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
              <i v-else class="fa fa-refresh"></i>
              <span> Actualiser</span>
            </button>
          </div>
          <InputText placeholder="Recherche" v-model="filters['global'].value" />
        </div>
      </template>
      <template #empty> Aucune données trouvées </template>
      <template #loading> Loading customers data. Please wait. </template>
      <DataTableColumn field="prefix" header="Préfixe"></DataTableColumn>
      <DataTableColumn field="lastname" header="Nom"></DataTableColumn>
      <DataTableColumn field="firstname" header="Prénom"></DataTableColumn>
      <DataTableColumn field="second_firstname" header="Deuxième prénom"></DataTableColumn>
      <DataTableColumn field="email" header="email"></DataTableColumn>
      <DataTableColumn field="phone" header="Téléphone"></DataTableColumn>
      <DataTableColumn field="residence" header="Résidence"></DataTableColumn>
      <DataTableColumn field="nip" header="NIP"></DataTableColumn>

      <DataTableColumn header="Actions">
        <template #body="slotProps">
          <div class="d-flex">
            <button class="btn btn-sm btn-info m-1" @click="openModal(slotProps.data)">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </template>
      </DataTableColumn>
      <template #footer> Total {{ datas ? datas.length : 0 }} . </template>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { useAppStore } from "@/store/app";
import ViewAdhesion from './ViewAdhesion.vue'
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
    this.getadherents();
    this.connectWebSocket();

  },
   beforeUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  },


  methods: {
    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

     connectWebSocket() {
      // Définir l'URL du WebSocket (à adapter selon votre serveur)
      this.ws = new WebSocket(this.$wsUrl);

      // Gestion des événements WebSocket
      this.ws.onopen = () => {
      };

      this.ws.onmessage = (event) => {

        try {
          const message = event.data;  // Si c'est un JSON, il faut le parser
          this.getadherents();

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

      this.ws.onclose = () => {
        setTimeout(() => {
          this.connectWebSocket();
        }, 3000); // Reconnexion après 3 secondes
      };

    },

    openModal(objetData) {
      this.$dialog.open(ViewAdhesion, {
        props: {
          header: "Fiche adherent " + objetData.id,
          style: {
            width: "50vw",
          },
          modal: true,
        },
        data: objetData,
      });
    },
    // openCreateModal() {
    //   this.$dialog.open(CreateUsers, {
    //     props: {
    //       header: "Créer un utilisateur ",
    //       style: {
    //         width: "50vw",
    //       },
    //       modal: true,
    //     },
    //   });
    // },
    getadherents() {
      this.$axios
        .get("/registration_sheet/all")
        .then((response) => {
          this.loading = false;
          this.datas = response.data;

           this.connectWebSocket();
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },
    refreshDatas() {
      this.loading = true;
      this.getadherents();
    },
  },
};
</script>
