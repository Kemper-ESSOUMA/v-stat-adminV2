import { defineStore } from 'pinia'

export const useSuperviseurStore = defineStore('superviseurs', {
    state: () => ({
        superviseurs: []
    }),
    lists: [],
    updateSuperviseur: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        role: "",
    },
    list: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        role: "",
    },
    actions: {


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
    }
})
