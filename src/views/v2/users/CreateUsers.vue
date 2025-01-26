<template>
  <div>

    <form @submit.prevent="createLine()">
      <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>
      <div class="form-row">

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
          <input type="email" v-model="form.email" class="form-control">
        </div>
        <div class="form-group col-6">
          <label>Role<span class="text-danger">*</span></label>
          <select class="form-control" v-model="form.role" required>
            <option value="Administrateur">Administrateur</option>
            <option value="Coordonateur">Coordonateur</option>
            <option value="Superviseur">Superviseur</option>
            <option value="Finaux">Finaux</option>
          </select>
        </div>
        <div class="form-group col-6">
          <label>Zone<span class="text-danger">*</span></label>
          <SearchDropdown v-model="form.zone" filter :options="provinces" optionLabel="libelle" optionValue="code"
            class="w-100" placeholder="Selectionner une province"
            v-if="this.form.role === 'Administrateur' || this.form.role === 'Coordonateur'" />

          <SearchDropdown v-model="province" filter :options="provinces" optionLabel="libelle"
            optionValue="deps_coms_cans" class="w-100" placeholder="Selectionner une province"
            v-if="this.form.role === 'Superviseur'" @change="departements(province)" />
        </div>

        <div class="form-group col-6" v-if="this.form.role === 'Superviseur'">
          <label>Departement<span class="text-danger">*</span></label>
          <SearchDropdown v-model="form.zone" filter :options="departement" optionLabel="libelle" optionValue="code"
            class="w-100" placeholder="Selectionner un departement" @change="centreVotes(form.zone)"/>
        </div>

        <!-- <div class="form-group col-6" v-if="this.form.role === 'Superviseur' && this.form.zone !== null">
          <label>Centre de vote<span class="text-danger">*</span></label>
          <SearchDropdown v-model="form.centre" filter :options="centre" optionLabel="libelle" optionValue="zone"
            class="w-100" placeholder="Selectionner un centre" />
        </div> -->
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
// import { useAppStore } from "@/store/app";
export default defineComponent({
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      province: {},
      departement:{},
      form: {
        // code_user: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        role: '',
        zone: '',
        password: ''

      },
      provinces: {},
      centre:{}
    }
  },

  mounted() {
    this.getProvinces()
    this.departements()
    // this.centreVotes()
  },

  methods: {
    departements(data) {
      console.log('departement = ', data)
      this.departement = data
    },
    // centreVotes(data) {

    //   console.log('centre = ', data)
    //   this.$axios.get(`/voting_centre/by_zone_dep/${data}`).then(response => {
    //     this.centre = response.data
    //     console.log('centre fin = ', this.centre)
    //   })

    // },
    getProvinces() {
      this.$axios.get('/province/all').then(response => {
        this.provinces = response.data
        })
      },
      createLine() {

      this.$axios.post('/user/add', this.form).then(response => {
        this.isLoading = false
        if (response.data !== null) {
          $('#refresh-user').click()
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
        // code_user: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        role: '',
        zone: '',
        password: ''
      }
    }
  }
})
</script>
