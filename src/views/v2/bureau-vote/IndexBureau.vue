<template>
  <div class="header-contentys pt-3 d-flex align-items-center">
    <div class="mr-5">
      <h4 class="text-app font-weight-bold">Fiche des bureaux de votes</h4>
    </div>
    <div class="btn-group page-nav " role="group">
      <div>
        <router-link class="btn " :to="{ name: 'mobilization' }"
          :class="{ 'active': this.$route.name === 'mobilization' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Mobilisation">
          <i class="pi pi-users" style="color: #3242C5"></i> Mobilisation
        </router-link>
      </div>
      <div>
        <router-link class="btn " :to="{ name: 'climat' }" :class="{ 'active': this.$route.name === 'climat' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Climat">
          <i class="pi pi-sitemap" style="color: #3242C5"></i> Climats
        </router-link>
      </div>
      <div>
        <router-link class="btn " :to="{ name: 'incident' }" :class="{ 'active': this.$route.name === 'incident' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="incident">
          <i class="pi pi-exclamation-circle" style="color: #3242C5"></i> Alerte et Incident
        </router-link>
      </div>
      <div>
        <router-link class="btn " :to="{ name: 'goodies' }" :class="{ 'active': this.$route.name === 'goodies' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="goodies">
          <i class="pi pi-gift" style="color: #3242C5"></i> Goodies
        </router-link>
      </div>
      <div>
        <router-link class="btn btn-primary" :to="{ name: 'bureaux' }"
          :class="{ 'active': this.$route.name === 'bureaux' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="bureaux">
          <i class="pi pi-envelope" style="color: #3242C5"></i> Bureaux de votes
        </router-link>
      </div>
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
            <button class="btn btn-sm btn-outline-dark mr-2" @click="refreshDatas()" id="refresh-climat">
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

      <DataTableColumn field="date" header="Date"></DataTableColumn>
      <DataTableColumn field="office_climate" header="Climat"></DataTableColumn>
      <DataTableColumn field="voting_center" header="Centre de vote"></DataTableColumn>
      <DataTableColumn field="supervisor" header="Superviseur"></DataTableColumn>
      <DataTableColumn field="observation" header="Observation"></DataTableColumn>
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
// import CreateFicheClimatVue from './CreateFicheClimat.vue';
import ViewFicheBureauVote from './ViewFicheBureauVote.vue';
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
    this.getBureaux();
  },
  methods: {
    openModal(objetData) {
      this.$dialog.open(ViewFicheBureauVote, {
        props: {
          header: "Fiche de bureau de vote " + objetData.id,
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
    getBureaux() {
      this.$axios
        .get('/polling_station_sheet/all')
        .then((response) => {
          this.loading = false
          this.datas = response.data;
        })
        .catch((error) => {
          console.error('Erreur de recuperation de donnees:', error);
        });
    },
    refreshDatas() {
      this.loading = true
      this.getBureaux()
    }
  },
};
</script>
