<template>
  <div>

    <form @submit.prevent="createLine()">
      <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>
      <div class="form-row">
        <div class="form-group col-6">
          <label>Date<span class="text-danger">*</span></label>
          <input type="date" v-model="form.date" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Centre de vote</label>
          <SearchDropdown v-model="form.voting_center" filter :options="centre_vote" optionLabel="libelle"
            optionValue="code" class="w-100" placeholder="Selectionner un centre de vote" />
        </div>
        <div class="form-group col-6">
          <label>Code du bureau de vote</label>
          <input type="text" v-model="form.polling_station" class="form-control">
        </div>
        <div class="form-group col-6">
          <label>Nom du superviseur<span class="text-danger">*</span></label>
          <input type="text" v-model="form.supervisor" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Type d'evenement<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.type" required>
            <option value="Alerte">Alerte</option>
            <option value="Incident">Incident</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label>Type arlete<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.event" >
            <option value="Ouverture tardive du bureau de vote">Ouverture tardive du bureau de vote</option>
            <option value="Absence de bulletin de vote d’un candidat">Absence de bulletin de vote d’un candidat</option>
            <option value="Urnes de vote ouverte">Urnes de vote ouverte</option>
            <option value="Absence de scrutateur">Absence de scrutateur</option>
            <option value="Liste électorale non affichée">Liste électorale non affichée</option>
            <option value="Absence de représentant de parti">Absence de représentant de parti</option>
            <option value="Pression sur les électeurs">Pression sur les électeurs</option>
            <option value="Exclusion d’électeurs">Exclusion d’électeurs</option>
            <!-- <option value="">Autres (préciser)</option> -->
          </select>
        </div>

        <div class="form-group col-6">
          <label>Type incident<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.event" required>
            <option value="Vandalisme sur le matériel électoral">Vandalisme sur le matériel électoral</option>
            <option value="Saccage d’un bureau de vote">Saccage d’un bureau de vote</option>
            <option value="Tentatives de fraudes">Tentatives de fraudes</option>
            <option value="Violence et intimidation">Violence et intimidation</option>
            <option value="Contestation des résultats">Contestation des résultats</option>
            <option value="Pression sur les électeurs">Pression sur les électeurs</option>
            <option value="Exclusion d’électeurs">Exclusion d’électeurs</option>
            <option value="Désinformation">Désinformation</option>
            <!-- <option value="">Autres (préciser)</option> -->
          </select>
        </div>

        <div class="form-group col-6">
          <label class="fomt-bold">Recommandation</label>
          <TextEditor v-model="form.description" editorStyle="height: 200px">
            <template v-slot:toolbar>
              <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
              </span>
            </template>
          </TextEditor>
        </div>
        <div class="form-group col-6">
          <label class="fomt-bold">Action Préconisée</label>
          <TextEditor v-model="form.criticality_situation" editorStyle="height: 200px">
            <template v-slot:toolbar>
              <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
              </span>
            </template>
          </TextEditor>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-sm mt-3">
        <i class="fas fa-floppy-disk"></i>
        <span class="mx-2 text-white">Creer</span>
        <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>

    </form>
  </div>

</template>

<script>
import $ from "jquery";
import { defineComponent } from 'vue';
import { useAppStore } from "@/store/app";
export default defineComponent({
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      centre_vote:[],
      types_permis: [],
      form: {
        type: '',
        event: '',
        criticality_situation: '',
        description: '',
        recommendation: '',
        signature: '',
        siege: '',
        // zone_code: '',
        date: '',
        voting_center: '',
        polling_station: '',
        supervisor: ''

      },
    }
  },

  mounted(){
    this.getCentreVotes()
  },

  methods: {
    getCentreVotes(){
      this.isLoading = true
      this.$axios.get('/voting_centre/by_zone').then(response => {
        this.centre_vote = response.data
        this.isLoading = false
      })
    },
    createLine() {
      this.isLoading = true
      const appStore = useAppStore();
      this.form.zone_code = appStore.currentUser.zone
      this.$axios.post('/incident/add', this.form).then(response => {
        this.isLoading = false
        if (response.data !== null) {
          $('#refresh-incident').click()
          this.$toast.add({
            severity: 'success',
            detail: response.data.message,
            life: 3000
          });
          this.dialogRef.close()
        }
        else {
          response.data.errors.forEach(element => {
            this.$toast.add({
              severity: 'warn',
              summary: 'Oups !',
              detail: element,
              life: 7000
            });
          });
        }
      }).catch(() => {
        this.isLoading = false
        this.$toast.add({
          severity: 'error',
          summary: 'Probleme de connexion',
          detail: 'Une erreur s\'est produite lors de la connexion au serveur !',
          life: 5000
        });
      })
    },
    resetForm() {
      this.form = {
        date: "",
        intention: '',
        recommendation: '',
        signature: '',
        zone_code: '',
        supervisor: ''
      }
    }
  }
})
</script>
