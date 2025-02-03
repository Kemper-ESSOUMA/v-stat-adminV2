<template>
  <div>

    <form>
      <div class="form-row">
        <div class="form-group col-6">
          <label>Code<span class="text-danger">*</span></label>
          <input type="text" v-model="form.code_user" class="form-control" disabled>
        </div>
        <div class="form-group col-6">
          <label>Prénom<span class="text-danger">*</span></label>
          <input type="text" v-model="form.firstname" class="form-control" disabled>
        </div>
        <div class="form-group col-6">
          <label>Nom<span class="text-danger">*</span></label>
          <input type="text" v-model="form.lastname" class="form-control" disabled>
        </div>
        <div class="form-group col-6">
          <label>Telephone<span class="text-danger">*</span></label>
          <input type="text" v-model="form.phone" class="form-control" disabled>
        </div>
        <div class="form-group col-6">
          <label>Role<span class="text-danger">*</span></label>
          <input type="text" v-model="form.role" class="form-control" disabled>
        </div>
        <div class="form-group col-6">
          <label>Zone<span class="text-danger">*</span></label>
          <input type="text" v-model="form.zone" class="form-control" disabled>
        </div>
        <div>
          <h4 class="text-app font-weight-bold">Permissions attribuées</h4>
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Fiches</th>
                  <th>Lecture</th>
                  <th>Ecriture</th>
                  <th>Exécution</th>
                  <th>Tout</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(perm, index) in form.permissions" :key="index">
                  <td>{{ formatFicheName(perm.entity) }}</td>
                  <td>
                    <input type="checkbox" :checked="perm.action == 4 || perm.action == 7" disabled />
                  </td>
                  <td>
                    <input type="checkbox" :checked="perm.action == 2 || perm.action == 7" disabled />
                  </td>
                  <td>
                    <input type="checkbox" :checked="perm.action == 1 || perm.action == 7" disabled />
                  </td>
                  <td>
                    <input type="checkbox" :checked="perm.action == 7" disabled />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>

    <button class="btn btn-sm btn-warning mr-2" @click="updatePassord()">
      <i class="fa-solid fa-key"></i> Rénitialiser le mot de passe
      <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </button>

    <button class="btn btn-sm btn-danger mr-2">
      <i class="fa-solid fa-trash"></i> Supprimer
      <span v-if="isLoadingdelete == true" class="spinner-border spinner-border-sm" role="status"
        aria-hidden="true"></span>
    </button>
  </div>

</template>

<script>
import { defineComponent } from 'vue';

// import { useAppStore } from "@/store/app";
export default defineComponent({
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      isLoadingdelete: false,
      form: {
        code_user: this.dialogRef.data.code_user,
        firstname: this.dialogRef.data.firstname,
        lastname: this.dialogRef.data.lastname,
        phone: this.dialogRef.data.phone,
        email: this.dialogRef.data.email,
        role: this.dialogRef.data.role,
        zone: this.dialogRef.data.zone,
        permissions: this.dialogRef.data.permissions
      },

      update: {
        password: 'root'
      }
    }
  },
  mounted() {
    console.log('form = ', this.form.permissions)
  },

  methods: {

    updatePassord() {

      this.$axios.put('/user/update_password', this.update).then(response => {
        console.log('update = ', response.data)
        this.isLoading = false
      })
    },

    delete() {
      this.$axios.delete('/user/delete').then(response => {
        console.log('delete = ', response.data)
        this.isLoadingdelete = false
      })
    },

    // Fonction pour formater le nom de la fiche
    formatFicheName(fiche) {
      const ficheNames = {
        mobilization_sheets: 'Fiche de mobilisation',
        goodies_sheets: 'Fiche de goodies',
        electoral_climate_sheets: 'Fiche climatique électorale',
        incident_sheets: 'Fiche d\'incident',
        polling_station_sheets: 'Fiche de station de vote'
      };
      return ficheNames[fiche] || fiche;
    },


  }
})
</script>
