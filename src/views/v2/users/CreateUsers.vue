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
            class="w-100" placeholder="Selectionner un departement" @change="centreVotes(form.zone)" />
        </div>

        <div class="form-group col-6">
          <label>Mot de passe<span class="text-danger">*</span></label>
          <input type="password" v-model="form.password" class="form-control" required>
        </div>

        <!-- Permissions -->
        <div class="form-group col-12">
          <label>Permissions<span class="text-danger">*</span></label>

          <!-- Table d'affichage -->
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Fiches</th>
                  <th>Permissions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fiche Climats</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <input type="checkbox" id="selectAllClimat"
                          v-model="permissions.electoral_climate_sheets.selectAll"
                          @change="toggleCategoryPermissions('electoral_climate_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="selectAllClimat">Tout</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeClimat" v-model="permissions.electoral_climate_sheets.read"
                          @change="checkCategorySelectAll('electoral_climate_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeClimat">Lecture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeClimat" v-model="permissions.electoral_climate_sheets.write"
                          @change="checkCategorySelectAll('electoral_climate_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeClimat">Écriture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="editClimat" v-model="permissions.electoral_climate_sheets.execute"
                          @change="checkCategorySelectAll('electoral_climate_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="editClimat">Exécution</label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fiche Alertes et incidents</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <input type="checkbox" id="selectAllIncident" v-model="permissions.incident_sheets.selectAll"
                          @change="toggleCategoryPermissions('incident_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="selectAllIncident">Tout</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeIncident" v-model="permissions.incident_sheets.read"
                          @change="checkCategorySelectAll('incident_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeIncident">Lecture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeIncident" v-model="permissions.incident_sheets.write"
                          @change="checkCategorySelectAll('incident_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeIncident">Écriture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="editIncident" v-model="permissions.incident_sheets.execute"
                          @change="checkCategorySelectAll('incident_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="editIncident">Exécution</label>
                      </div>

                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fiche Bureaux de votes</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <input type="checkbox" id="selectAllBureaux"
                          v-model="permissions.polling_station_sheets.selectAll"
                          @change="toggleCategoryPermissions('polling_station_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="selectAllBureaux">Tout</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeBureaux" v-model="permissions.polling_station_sheets.read"
                          @change="checkCategorySelectAll('polling_station_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeBureaux">Lecture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeBureaux" v-model="permissions.polling_station_sheets.write"
                          @change="checkCategorySelectAll('polling_station_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeBureaux">Écriture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="editBureaux" v-model="permissions.polling_station_sheets.execute"
                          @change="checkCategorySelectAll('polling_station_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="editBureaux">Exécute</label>
                      </div>

                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fiche Mobilisation</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <input type="checkbox" id="selectAllMobilisation"
                          v-model="permissions.mobilization_sheets.selectAll"
                          @change="toggleCategoryPermissions('mobilization_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="selectAllMobilisation">Tout</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeMobilisation" v-model="permissions.mobilization_sheets.read"
                          @change="checkCategorySelectAll('mobilization_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeMobilisation">Lecture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeMobilisation" v-model="permissions.mobilization_sheets.write"
                          @change="checkCategorySelectAll('mobilization_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeMobilisation">Écriture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="editMobilisation" v-model="permissions.mobilization_sheets.execute"
                          @change="checkCategorySelectAll('mobilization_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="editMobilisation">Exécute</label>
                      </div>

                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Fiche Goodies</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="form-check me-3">
                        <input type="checkbox" id="selectAllGoodies" v-model="permissions.goodies_sheets.selectAll"
                          @change="toggleCategoryPermissions('goodies_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="selectAllGoodies">Tout</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeGoodies" v-model="permissions.goodies_sheets.read"
                          @change="checkCategorySelectAll('goodies_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeGoodies">Lecture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="writeGoodies" v-model="permissions.goodies_sheets.write"
                          @change="checkCategorySelectAll('goodies_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="writeGoodies">Écriture</label>
                      </div>
                      <div class="form-check me-3">
                        <input type="checkbox" id="editGoodies" v-model="permissions.goodies_sheets.execute"
                          @change="checkCategorySelectAll('goodies_sheets')" class="form-check-input" />
                        <label class="form-check-label" for="editGoodies">Exécution</label>
                      </div>

                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      departement: {},
      form: {
        // code_user: '',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        role: '',
        zone: '',
        password: '',
      },
      permissions: {
        mobilization_sheets: {
          selectAll: false,
          write: false,
          read: false,
          execute: false,
        },
        goodies_sheets: {
          selectAll: false,
          write: false,
          read: false,
          execute: false,
        },
        electoral_climate_sheets: {
          selectAll: false,
          write: false,
          read: false,
          execute: false,
        },
        incident_sheets: {
          selectAll: false,
          write: false,
          read: false,
          execute: false,
        },
        polling_station_sheets: {
          selectAll: false,
          write: false,
          read: false,
          execute: false,
        },
      },
      provinces: {},
      centre: {}
    }
  },

  mounted() {
    this.getProvinces()
    this.departements()
    // this.centreVotes()
  },

  methods: {
    toggleCategoryPermissions(category) {
      // Vérifie si la catégorie existe dans les permissions
      if (this.permissions[category]) {
        // Récupère l'état de "selectAll" pour la catégorie
        const selectAll = this.permissions[category].selectAll;

        // Applique cet état aux autres permissions (write, read, execute)
        this.permissions[category].write = selectAll;
        this.permissions[category].read = selectAll;
        this.permissions[category].execute = selectAll;
      } else {
        console.error(`Category "${category}" does not exist in permissions.`);
      }
    },

    checkCategorySelectAll(category) {
      const { write, read, execute: ex } = this.permissions[category];
      this.permissions[category].selectAll = write && read && ex;
    },

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
    computePermissionValue(permission) {
      let value = 0;
      if (permission.read) value += 4; // Lecture (r)
      if (permission.write) value += 2; // Écriture (w)
      if (permission.execute) value += 1; // Exécution (x)
      return value;
    },
    validatePermissions(permissions) {
      return Object.values(permissions).every(category =>
        category.read !== null && category.write !== null && category.execute !== null
      );
    },

    preparePermissions() {
      const permissions = this.permissions;
      const preparedPermissions = [];

      Object.keys(permissions).forEach(category => {
        // Calculer la valeur des actions
        const actions =
          (permissions[category].read ? 4 : 0) +
          (permissions[category].write ? 2 : 0) +
          (permissions[category].execute ? 1 : 0);

        // Ajouter l'objet au tableau
        preparedPermissions.push({
          entity: category,
          action: actions,
        });
      });

      return preparedPermissions;
    },

    createLine() {
      this.isLoading = true;

      // Vérifier les permissions
      if (!this.validatePermissions(this.permissions)) {
        this.isLoading = false;
        this.$toast.add({
          severity: 'warn',
          summary: 'Erreur',
          detail: 'Veuillez remplir toutes les permissions avant de continuer.',
          life: 5000,
        });
        return;
      }

      // Préparer les permissions
      const permissions = this.preparePermissions();
      console.log('datas = ', { ...this.form, permissions })
      this.isLoading = false;
      // Requête POST
      this.$axios.post('/user/add', { ...this.form, permissions })
        .then(response => {
          this.isLoading = false;
          if (response.data !== null) {
            $('#refresh-user').click();
            this.$toast.add({
              severity: 'success',
              detail: 'Enregistrement avec succès !!',
              life: 3000,
            });
            this.dialogRef.close();
          } else {
            response.data.errors.forEach(element => {
              this.$toast.add({
                severity: 'warn',
                summary: 'Oups !',
                detail: element,
                life: 7000,
              });
            });
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$toast.add({
            severity: 'error',
            summary: 'Problème de connexion',
            detail: 'Une erreur s\'est produite lors de la connexion au serveur !',
            life: 5000,
          });
        });
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
        password: '',
        permissions: {
          mobilisation: {
            selectAll: false,
            write: false,
            edit: false,
            delete: false,
          },
          goodies: {
            selectAll: false,
            write: false,
            edit: false,
            delete: false,
          },
          climat: {
            selectAll: false,
            write: false,
            edit: false,
            delete: false,
          },
          incident: {
            selectAll: false,
            write: false,
            edit: false,
            delete: false,
          },
          bureaux: {
            selectAll: false,
            write: false,
            edit: false,
            delete: false,
          },
        },
      }
    }
  }
})
</script>
