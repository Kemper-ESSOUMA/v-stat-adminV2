<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Liste des utilisateurs</h4>
    </div>

    <div class="px-1 d-flex mr-4">
      <button type="button" class="btn-app btn-active" @click="openCreateModal()">
        Ajouter une utilisateur <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </div>
  <hr />

  <div class="card">
    <ProgressBar mode="indeterminate" style="height: 6px" v-if="this.loading === true"></ProgressBar>
    <DataTable :value="datas" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]" :filters="filters" :globalFilterFields="['lastname']">
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

      <DataTableColumn field="code_user" header="Code"></DataTableColumn>
      <DataTableColumn field="firstname" header="Prenom"></DataTableColumn>
      <DataTableColumn field="lastname" header="Nom"></DataTableColumn>
      <DataTableColumn field="phone" header="Telephone"></DataTableColumn>
      <DataTableColumn field="role" header="Role"></DataTableColumn>
      <DataTableColumn field="zone" header="Zone"></DataTableColumn>

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
import CreateUsers from "./CreateUsers.vue";
import ViewUser from "./ViewUser.vue";
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
    this.getUsers();
    console.log("Current User", this.currentUser());
  },


  methods: {
        currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },

    openModal(objetData) {
      this.$dialog.open(ViewUser, {
        props: {
          header: "Fiche utilisateur " + objetData.id,
          style: {
            width: "50vw",
          },
          modal: true,
        },
        data: objetData,
      });
    },
    openCreateModal() {
      this.$dialog.open(CreateUsers, {
        props: {
          header: "Créer un utilisateur ",
          style: {
            width: "50vw",
          },
          modal: true,
        },
      });
    },
    getUsers() {
      this.$axios
        .get("/user/all")
        .then((response) => {
          this.loading = false;
          this.datas = response.data;
        })
        .catch((error) => {
          console.error("Erreur de recuperation de donnees:", error);
        });
    },
    refreshDatas() {
      this.loading = true;
      this.getUsers();
    },
  },
};
</script>
