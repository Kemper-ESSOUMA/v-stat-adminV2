<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Fiche des goodies</h4>
    </div>
    <div class="btn-group page-nav " role="group">
      <div>
        <router-link class="btn " :to="{ name: 'mobilization' }" v-if=" parseInt(this.getPermissionActionByEntity('mobilization_sheets'),10) >= 4"
          :class="{ 'active': this.$route.name === 'mobilization' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Mobilisation">
          <i class="pi pi-users" style="color: #3242C5"></i> Mobilisation
        </router-link>
      </div>
      <div>
        <router-link class="btn" :to="{ name: 'climat' }" :class="{ 'active': this.$route.name === 'climat' }" v-if=" parseInt(this.getPermissionActionByEntity('mobilization_sheets'),10) >= 4"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Climat">
          <i class="pi pi-sitemap" style="color: #3242C5"></i> Climats
        </router-link>
      </div>
      <div>
        <router-link class="btn" :to="{ name: 'incident' }" :class="{ 'active': this.$route.name === 'incident' }" v-if=" parseInt(this.getPermissionActionByEntity('mobilization_sheets'),10) >= 4"
          data-bs-toggle="tooltip" data-bs-placement="right" title="incident">
          <i class="pi pi-exclamation-circle" style="color: #3242C5"></i> Alerte et Incident
        </router-link>
      </div>
      <!-- <div>
        <router-link class="btn btn-primary" :to="{ name: 'goodies' }" v-if=" parseInt(this.getPermissionActionByEntity('mobilization_sheets'),10) >= 4"
          :class="{ 'active': this.$route.name === 'goodies' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="goodies">
          <i class="pi pi-gift" style="color: #3242C5"></i> Goodies
        </router-link>
      </div> -->
      <div>
        <router-link class="btn" :to="{ name: 'bureaux' }" :class="{ 'active': this.$route.name === 'bureaux' }" v-if=" parseInt(this.getPermissionActionByEntity('mobilization_sheets'),10) >= 4"
          data-bs-toggle="tooltip" data-bs-placement="right" title="bureaux">
          <i class="pi pi-envelope" style="color: #3242C5"></i> Bureaux de votes
        </router-link>
      </div>
    </div>
    <div class="px-1 d-flex mr-4">
      <button type="button" class="btn-app btn-active" @click="openCreateModal()" v-if="[6, 3, 2, 7].includes(parseInt(this.getPermissionActionByEntity('mobilization_sheets')))">
        Ajouter une fiche <i class="fa-solid fa-plus"></i>
      </button>
    </div>

  </div>
  <hr>

  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.loading === true"></ProgressBar>
    <DataTable :value="datas" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" :globalFilterFields="['zone_code']">
      <template #header>

        <div class="flex justify-content-end">
          <div class="mr-2" style="padding-right: 80%">
            <button class="btn btn-sm btn-outline-dark mr-2" @click="refreshDatas()" id="refresh-goodies">
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

      <DataTableColumn field="date" header="Date"></DataTableColumn>
      <DataTableColumn field="zone_code" header="Zone Code"></DataTableColumn>
      <DataTableColumn field="population" header="Satisfaction population"></DataTableColumn>
      <DataTableColumn field="party_members" header="Satisfaction adherant"></DataTableColumn>
      <DataTableColumn header="Actions">
        <template #body="slotProps">
          <div class="d-flex">
            <button class="btn btn-sm btn-info m-1" @click="openModal(slotProps.data)">
              <i class="fa-solid fa-eye"></i>
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
import CreateFicheGoodie from './CreateFicheGoodie.vue';
import ViewFIcheGoodie from './ViewFIcheGoodie.vue';
import { useAppStore } from "@/store/app";
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
    this.getGoodies();
    this.connectWebSocket();
             const mobilizationAction = this.getPermissionActionByEntity('mobilization_sheets');
    console.log("Current User", this.currentUser());
    console.log("Permissions User", mobilizationAction);
  },
  methods: {

                currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },
          getPermissionActionByEntity(entityName) {
    const permission = this.currentUser().permissions.find(permission => permission.entity === entityName);
    return permission ? permission.action : null;
  },
    openModal(objetData) {
      this.$dialog.open(ViewFIcheGoodie, {
        props: {
          header: "Fiche de goodie " + objetData.id,
          style: {
            width: '50vw'
          },
          modal: true
        },
        data: objetData,
      });
    },
    openCreateModal() {
      this.$dialog.open(CreateFicheGoodie, {
        props: {
          header: "Fiche de goodies ",
          style: {
            width: '50vw'
          },
          modal: true
        },
      });
    },
    getGoodies() {
      this.$axios
        .get('/goodies/by_zone')
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
          this.getGoodies();

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
      this.getGoodies()
    }
  },
};
</script>
