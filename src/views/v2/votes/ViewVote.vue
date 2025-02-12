<template>

  <TabView>
    <TabPanel header="Details du bureau">
      <div>

        <form @submit.prevent="createLine()">
          <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>
          <div class="form-row">
            <div class="form-group col-6">
              <label>Nom<span class="text-danger">*</span></label>
              <input type="text" v-model="form.libelle" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Zone<span class="text-danger">*</span></label>
              <input type="text" v-model="form.zone" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Total enregistré<span class="text-danger">*</span></label>
              <input type="number" v-model="form.total_registered" class="form-control" disabled>
            </div>

            <div class="form-group col-6">
              <label>Nombre de bulletin blanc<span class="text-danger">*</span></label>
              <input type="number" v-model="form.nb_bulletin_blanc" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Nombre de bulletin nule<span class="text-danger">*</span></label>
              <input type="number" v-model="form.nb_abstention" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Nombre de scrutin validé<span class="text-danger">*</span></label>
              <input type="number" v-model="form.nb_scrutin_valide" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Candidat 1<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_1" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Camdidat 2<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_2" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Candidat 3<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_3" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Candidat 4<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_4" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Candidat 5<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_5" class="form-control" disabled>
            </div>
            <div class="form-group col-6">
              <label>Candidat 6<span class="text-danger">*</span></label>
              <input type="number" v-model="form.candidate_6" class="form-control" disabled>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-sm mt-3">
            <i class="fas fa-floppy-disk"></i>
            <span class="mx-2 text-white">Modifier</span>
            <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status"
              aria-hidden="true"></span>
          </button>

        </form>
      </div>
    </TabPanel>

    <TabPanel header="Proces verbal">
      <div class="row">
        <div class="col-md-4">
          <div class="border shadow-md p-1 rounded">
            <!-- <div class="d-flex justify-content-between">
              <a v-bind:href="form.fichier" target="_blank" class="btn btn-sm mr-2 btn-info ">
                <i class="fa-solid fa-folder-open"></i> Ouvrir
              </a>
            </div> -->
            <div class="card flex justify-content-center">
              <ShowImage :src="form.fichier" alt="Image" width="250" preview />
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>

</template>

<script>
import $ from "jquery";
import { defineComponent } from 'vue';
// import { useAppStore } from "@/store/app";

export default defineComponent({
  name: 'CreateEmploye',
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      table: 'employes',
      types_permis: [],
      form: {
        code: this.dialogRef.data.code,
        libelle: this.dialogRef.data.libelle,
        zone: this.dialogRef.data.zone,
        total_registered: this.dialogRef.data.total_registered,
        total_offices: this.dialogRef.data.total_offices,
        total_scrutin: this.dialogRef.data.total_scrutin,
        nb_bulletin_blanc: this.dialogRef.data.nb_bulletin_blanc,
        nb_abstention: this.dialogRef.data.nb_abstention,
        nb_scrutin_valide: this.dialogRef.data.nb_scrutin_valide,
        candidate_1: this.dialogRef.data.candidate_1,
        candidate_2: this.dialogRef.data.candidate_2,
        candidate_3: this.dialogRef.data.candidate_3,
        candidate_4: this.dialogRef.data.candidate_4,
        candidate_5: this.dialogRef.data.candidate_5,
        candidate_6: this.dialogRef.data.candidate_6,
        fichier: this.dialogRef.data.file_path

      },
    }
  },

  mounted() {
    console.log('view = ', this.dialogRef.data)
  },


  methods: {


    createLine() {

      this.$axios.post('/voting_centre/update', this.form).then(response => {
        this.isLoading = false


        if (response.data !== null) {
          $('#refresh-edit-centre').click()
          this.$toast.add({
            severity: 'success',
            detail: 'enregistrement avec success !!',
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
        date: '',
        place: '',
        // siege: '',
        organizer: '',
        participants_nb: '',
        nb_young: '',
        nb_women: '',
        nb_people_disabilities: '',
      }
    }
  }
})
</script>
