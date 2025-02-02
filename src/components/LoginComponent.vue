<template>
  <div class="" style="margin-right: 15%">
    <div class="col-md-4 mx-auto">
      <div>
        <div class="text-center mx-10">
          <img src="@/assets/LOGO V-STATS.png" height="300" alt="Logo" loading="lazy" />
        </div>

        <div class="card login-box">
          <div class="card-body py-5">
            <h2 class="text-center mb-4 text-app">CONNEXION</h2>

            <form @submit.prevent="validate">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa-solid fa-user"></i>
                  </span>
                </div>
                <input placeholder="Code utilisateur" type="text" class="form-control form-control-lg" required
                  autocomplete="email" autofocus v-model="codeUser" />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa-solid fa-lock"></i>
                  </span>
                </div>
                <input placeholder="Mot de passe" type="password" class="form-control form-control-lg" required
                  autocomplete="current-password" v-model="password" />
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-lg btn-block bg-app text-white" :disabled="loading"
                  style="background: #252529">
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from '../store/app';

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      snackbarTimeout: 2000,
      loading: false,
      codeUser: "",
      password: "",
    };
  },
  methods: {

    async validate() {
      if (!this.codeUser || !this.password) {
        this.showSnackbar('Veuillez remplir tous les champs.', 'error');
        return;
      }

      this.loading = true;

      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', this.codeUser);
      formData.append('password', this.password);

      try {
        const response = await this.$axios.post('/auth/login', formData);

        if (response.data?.user && response.data?.token?.access_token) {
          const user = response.data.user;
          const token = response.data.token.access_token;

          const appStore = useAppStore();
          appStore.setLogged(user, token);
          this.$updateToken(token);

          const zoneUser = user.zone;
          const zoneRoutes = {
            "01": '/estuaire',
            "02": '/haut_ogooue',
            "03": '/moyen_ogooue',
            "04": '/ngounie',
            "05": '/nyanga',
            "06": '/ogooue_ivindo',
            "07": '/ogooue_lolo',
            "08": '/ogooue_maritime',
            "09": '/woleu_ntem',
            "10": '/',
          };
          this.$toast.add({
            severity: 'success',
            detail: 'Connexion avec succès !!',
            life: 3000,
          });

          this.$router.push('/');

        } else {
          console.error('Structure inattendue de la réponse :', response);

        }
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Identifiant incorrect',
          detail: 'Code utilisateur ou mot de passe incorrect !',
          life: 5000,
        });
        console.error('Erreur API :', error);

      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-box {
  min-width: 400px;
  max-width: 450px;
  min-height: 300px;
  margin: auto;
}
</style>
