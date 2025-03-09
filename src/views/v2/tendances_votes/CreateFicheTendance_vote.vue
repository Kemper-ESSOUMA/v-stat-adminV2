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
          <label>Zone Code<span class="text-danger">*</span></label>
          <input type="text" v-model="form.zone_code" class="form-control" required>
        </div>
               <div class="form-group col-6">
          <label>Centre de vote<span class="text-danger">*</span></label>
          <input type="text" v-model="form.centre_vote" class="form-control" required>
        </div>

        <div class="form-group col-6">
          <label>Taux de participation<span class="text-danger">*</span></label>
           <input type="text" v-model="form.participation_taux" class="form-control" required>
  
        </div>
        <div class="form-group col-6">
          <label>trends_candidate<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.trends_candidate" required>
            <option value="Bon">Bon</option>
            <option value="Satisfait">Satisfait</option>
            <option value="Insatisfait">Insatisfait</option>
          </select>
        </div>
        <div class="form-group col-12">
          <label class="fomt-bold">Observation</label>
          <TextEditor v-model="form.observation" editorStyle="height: 200px">
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
// @ts-nocheck
import $ from "jquery";
import { defineComponent } from 'vue';
import { useAppStore } from "@/store/app";
export default defineComponent({
  name: 'CreateEmploye',
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      table: 'goodies',
      types_permis: [],
      form: {
        date: '',
        zone_code: '',
        participation_taux: '',
        trends_candidate: '',
        observation: '',
        centre_vote: ''
      },
    }
  },

  methods: {
    createLine() {
      this.isLoading = true
      const appStore = useAppStore();
  
      this.form.zone_code = appStore.currentUser.zone
      this.$axios.post('/voting_trends_sheet/add', this.form,).then(response => {
        this.isLoading = false
        if (response.data !== null) {
          $('#refresh-goodies').click()
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
        zone_code: '',
        participation_taux: '',
        trends_candidate: '',
        observation: '',
        centre_vote: ''
      }
    }
  }
})
</script>
