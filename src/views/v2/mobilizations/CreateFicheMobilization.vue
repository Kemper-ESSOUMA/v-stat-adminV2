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
          <label>Lieu</label>
          <input type="text" v-model="form.place" class="form-control">
        </div>
        <div class="form-group col-6">
          <label>Type</label>
          <select class="form-control" v-model="form.type" required>
            <option value="Meeting">Meeting</option>
            <option value="Causerie">Causerie</option>
            <option value="Porte a porte">Porte a porte</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div class="form-group col-6">
          <label>Organisateur</label>

          <input type="text" class="form-control" v-model="form.organizer">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-6">
          <label>Nombre de participant<span class="text-danger">*</span></label>
          <input type="number" v-model="form.participants_nb" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Nombre de jeunes</label>
          <input type="number" v-model="form.nb_young" class="form-control">
        </div>
        <div class="form-group col-6">
          <label>Nombre de femmes<span class="text-danger">*</span></label>
          <input type="number" v-model="form.nb_women" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Nombre de handicapés</label>
          <input type="number" class="form-control" v-model="form.nb_people_disabilities">
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
  name: 'CreateEmploye',
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      table: 'employes',
      types_permis: [],
      form: {
        date: '',
        place: '',
        type: '',
        language_element: false,
        graphical_charter: false,
        zone_code: '',
        talk_format: false,
        general_opinion: 'mobilization',
        organizer: '',
        participants_nb: '',
        nb_young: '',
        nb_women: '',
        nb_people_disabilities: '',

      },
    }
  },


  methods: {


    createLine() {
      const appStore = useAppStore();
      this.form.zone_code = appStore.currentUser.zone
      this.$axios.post('/mobilization_sheet/add', this.form).then(response => {
        this.isLoading = false


        if (response.data !== null) {
          $('#refresh-mobilization').click()
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
