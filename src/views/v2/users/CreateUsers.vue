<template>
  <div>

    <form @submit.prevent="createLine()">
      <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>
      <div class="form-row">
        <div class="form-group col-6">
          <label>Code<span class="text-danger">*</span></label>
          <input type="text" v-model="form.code_user" class="form-control" required>
        </div>

        <div class="form-group col-6">
          <label>Prénom<span class="text-danger">*</span></label>
          <input type="text" v-model="form.firstname" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Nom<span class="text-danger">*</span></label>
          <input type="text" v-model="form.lastname" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Telephone<span class="text-danger">*</span></label>
          <input type="text" v-model="form.phone" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Email<span class="text-danger">*</span></label>
          <input type="email" v-model="form.email" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Role<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.role" required>
            <option value="Favorable">Favorable</option>
            <option value="Plutot favorable">Plutot favorable</option>
            <option value="Defavorable">Defavorable</option>
            <option value="Plutot defavorable">Plutot defavorable</option>
            <option value="Indecis">Indecis</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label>Zone<span class="text-danger">*</span></label>
          <input type="text" v-model="form.code_user" class="form-control" required>
        </div>
        <div class="form-group col-6">
          <label>Mot de passe<span class="text-danger">*</span></label>
          <input type="password" v-model="form.password" class="form-control" required>
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
      centre_vote: [],
      types_permis: [],
      form: {
        code_user: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        role: '',
        zone: '',
        password: ''

      },
    }
  },

  mounted() {
    this.getCentreVotes()
  },

  methods: {
    getCentreVotes() {
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
