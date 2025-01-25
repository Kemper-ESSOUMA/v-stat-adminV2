<template>
  <div class="m-1">
    <router-link :to="{ name: this.linkName }" class="small-box-footer text-decoration-none">
      <div id="rows_counter" class="card mb-1">
        <div v-if="isLoading === true" class="card-header">
          <ProgressBar mode="indeterminate" style="height: 6px; color: #fff;"></ProgressBar>
        </div>
        <div class="card-body">
          <p>{{ this.premier_titre }}</p>
          <div class="row d-flex align-items-center">
            <div id="icon_animation" class="col-lg-4 col-12 ">
              <img :src=" this.icon" alt="">
            </div>
            <div class="col-lg-8 col-12">
              <h4>{{ compteur }} {{ this.second_titre }}</h4>
              <p>{{ this.description }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end ">
          <small>
            Details <i class="fa-solid fa-chevron-right" style="font-size: 0.5rem; padding: auto;"></i>
          </small>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script >
export default {
  name: 'RowsCounter',
  props: ['premier_titre', 'url', 'icon', 'second_titre', 'description', 'linkName'],
  data() {
    return {
      compteur: 0,
      isLoading: true
    }
  },
  async mounted() {
    await this.$axios.get(this.url).then((response) => {
      this.compteur = response.data.length
      this.isLoading = false
    }).catch(() => {
      this.isLoading = false
      this.$toast.add({
        severity: 'error',
        summary: 'Probleme de connexion',
        detail: 'Une erreur s\'est produite lors de la connexion au serveur !',
        life: 5000
      });
    })
  }
}
</script>
