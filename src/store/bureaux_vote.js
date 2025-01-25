import { defineStore } from 'pinia'
import { axios } from '../plugins/axios'

export const useBureauxVoteStore = defineStore('bureaux_vote', {
  state: () => ({
    bureaux_vote: []
  }),
  actions: {

    async getAllBureaux() {
      axios.get("/pol_sta/all")
        .then((response) => {
          this.bureaux_vote = response.data;
          console.log('allbureau',this.bureaux_vote);
          return response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    get_provinces() {
      axios.get("/province/all")
        .then(response => {
          this.bureaux_vote = response.data
          console.log(this.bureaux_vote)
        })
        .catch(error => {
          console.log(error)
        })
    }
    // async addBurreau() {
    //   axios.post("/pol_sta/add", this.list)
    //     .then((response) => {
    //       console.log(response);
    //       this.list = {};
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.detail);
    //     });
    // },

    // async updated_burrau() {
    //   const { valid } = await this.$refs.form.validate();

    //   if (valid) {
    //     console.log(this.list)

    //     this.updatedBureau.code = this.list.code
    //     this.updatedBureau.libelle = this.list.libelle
    //     this.updatedBureau.registered = this.list.registered
    //     this.updatedBureau.offices = this.list.description


    //     axios.post("/pol_sta/updated", this.updatedBureau)
    //       .then((response) => {
    //         console.log(response);
    //         this.list = {};
    //         this.getAllBureaux();
    //       })
    //       .catch((error) => {
    //         console.log(error.response.data.detail);
    //       });
    //   }
    // },
    // async validate() {
    //   const { valid } = await this.$refs.form.validate();

    //   if (valid) {
    //     console.log(this.list);

    //     await this.addBurreau();
    //     await this.getAllBureaux();
    //     this.dialog = false;
    //   }
    // },
    //faire une fonction qui s'exécute toute les 1 minutes
  }
})
