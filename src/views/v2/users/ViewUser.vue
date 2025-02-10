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
                  <th>Tout</th>
                  <th>Lecture</th>
                  <th>Écriture</th>
                  <th>Exécution</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fiche, index) in allFiches" :key="index">
                  <td>{{ formatFicheName(fiche) }}</td>
                  <td>
                    <input type="checkbox" :checked="hasPermission(fiche, 7)"
                      @change="toggleAllPermissions(fiche, $event.target.checked)" disabled/>
                  </td>
                  <td>
                    <input type="checkbox" :checked="hasPermission(fiche, 4)" @change="togglePermission(fiche, 4)" disabled />
                  </td>
                  <td>
                    <input type="checkbox" :checked="hasPermission(fiche, 2)" @change="togglePermission(fiche, 2)" disabled/>
                  </td>
                  <td>
                    <input type="checkbox" :checked="hasPermission(fiche, 1)" @change="togglePermission(fiche, 1)" disabled/>
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

    <button class="btn btn-sm btn-danger mr-2" @click="deleteUser()">
      <i class="fa-solid fa-trash"></i> Supprimer
      <span v-if="isLoadingdelete" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </button>
    <!-- <button class="btn btn-sm btn-primary mr-2" @click="updatePermission()">
      <i class="fas fa-floppy-disk"></i> Modification des permissions
      <span v-if="isLoadingUpdate" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </button> -->
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import $ from "jquery";
// import { useAppStore } from "@/store/app";
export default defineComponent({
  inject: ['dialogRef'],
  data() {
    return {
      isLoading: false,
      isLoadingdelete: false,
      isLoadingUpdate: false,
      form: {
        id: this.dialogRef.data.id,
        code_user: this.dialogRef.data.code_user,
        firstname: this.dialogRef.data.firstname,
        lastname: this.dialogRef.data.lastname,
        phone: this.dialogRef.data.phone,
        email: this.dialogRef.data.email,
        role: this.dialogRef.data.role,
        zone: this.dialogRef.data.zone,
        permissions: this.dialogRef.data.permissions || []
      },
      allFiches: [
        'mobilization_sheets',
        'electoral_climate_sheets',
        'incident_sheets',
        'polling_station_sheets'
      ],

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
    deleteUser() {
      this.isLoadingdelete = true;
      this.$axios.delete('/user/delete', this.form)
        .then(response => {
          console.log('delete = ', response.data);
        })
        .finally(() => {
          this.isLoadingdelete = false;
        });
    },
    updatePermission() {
      this.isLoadingUpdate = true;

      // Création de l'objet avec 'user_id' en dehors de 'permissions'
      const data = {
        user_id: this.form.id,
        permissions: this.form.permissions
      };
      console.log('permissions = ', this.form.permissions, 'user_id', this.form.id);

      // Envoi de la requête avec le corps (body) contenant l'objet 'data'
      this.$axios.put('/permission/update_by_user_id', data)
        .then(response => {
          this.isLoading = false;

          if (response.data !== null) {
            $('#refresh-user').click();
            this.$toast.add({
              severity: 'success',
              detail: 'Permissions modifiées avec succès !!',
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

          console.log('update permission = ', response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour des permissions:', error);
          this.$toast.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de mettre à jour les permissions.',
            life: 5000,
          });
        });
    },







    formatFicheName(fiche) {
      const ficheNames = {
        mobilization_sheets: 'Fiche de mobilisation',
        goodies_sheets: 'Fiche de goodies',
        electoral_climate_sheets: 'Fiche climat',
        incident_sheets: 'Fiche d\'incident',
        polling_station_sheets: 'Fiche de bureaux de votes'
      };
      return ficheNames[fiche] || fiche;
    },

    hasPermission(fiche, action) {
      const permission = this.form.permissions.find(p => p.entity === fiche);
      if (!permission) return false;

      if (action === 7) {
        // Vérifier si Lecture (4), Écriture (2) et Exécution (1) sont toutes activées
        return (permission.action & 4) !== 0 &&
          (permission.action & 2) !== 0 &&
          (permission.action & 1) !== 0;
      }
      return (permission.action & action) !== 0;
    },

    togglePermission(fiche, action) {
      let permission = this.form.permissions.find(p => p.entity === fiche);

      if (!permission) {
        this.form.permissions.push({ entity: fiche, action });
      } else {
        permission.action ^= action;
        if (permission.action === 0) {
          this.form.permissions = this.form.permissions.filter(p => p.entity !== fiche);
        }
      }
    },

    toggleAllPermissions(fiche, checked) {
      let permission = this.form.permissions.find(p => p.entity === fiche);

      if (checked) {
        if (!permission) {
          this.form.permissions.push({ entity: fiche, action: 7 }); // Active tout (lecture, écriture, exécution)
        } else {
          permission.action = 7;
        }
      } else {
        this.form.permissions = this.form.permissions.filter(p => p.entity !== fiche);
      }
    }



  }
})
</script>
