<template>
  <div class="d-flex mb-4">
    <button type="button" class="btn btn-sm btn-info mr-2" @click="download">
      <i class="fas fa-print"></i> Imprimer
    </button>
  </div>
  <div class="container-fluid" id="fiche-bureau">
    <div class="row d-flex justify-content-center align-items-center mb-4">
      <div class="col-3 border-end border-dark">
        <img src="@/assets/mni.png" class="w-100" style="padding-right: 10%;">
      </div>
      <div class="col-6">
        <h3 class="text-primary font-weight-bold text-left">
          Election Présidentielle 2025
        </h3>
      </div>
    </div>

    <h2 class="text-center font-bold">Fiche de bureau de vote</h2><br>
    <div>
      <h4>
        N° 00000{{ this.dialogRef.data.id }}
      </h4>
    </div>
    <br>
    <div class="container">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Date :</th>
            <td>{{ this.dialogRef.data.date }}</td>
          </tr>
          <tr>
            <th>Heure d'ouverture :</th>
            <td>{{ this.dialogRef.data.opening_time }}</td>
          </tr>
          <tr>
            <th>Etat :</th>
            <td>{{ this.dialogRef.data.office_climate }}</td>
          </tr>
          <tr>
            <th>Centre de vote :</th>
            <td>{{ this.dialogRef.data.voting_center }}</td>
          </tr>
          <tr>
            <th>Code de la zone :</th>
            <td>{{ this.dialogRef.data.zone_code }}</td>
          </tr>
          <tr>
            <th>Organisateur :</th>
            <td>{{ this.dialogRef.data.supervisor }}</td>
          </tr>
          <tr>
            <th>Observation :</th>
            <td>{{ this.dialogRef.data.observation }}</td>
          </tr>
        </tbody>
      </table>

      <div class="card flex flex-wrap justify-content-center gap-3 p-3">
        <div class="flex align-items-center gap-2">
          <CheckboxMulti v-model="dialogRef.data.electoral_list" invalid binary disabled />
          <label>Affichage de la liste électorale</label>
        </div>

        <div class="flex align-items-center gap-2">
          <CheckboxMulti v-model="dialogRef.data.scrutineers_presence" invalid binary disabled />
          <label>Présence des scrutateurs</label>
        </div>

        <div class="flex align-items-center gap-2">
          <CheckboxMulti v-model="dialogRef.data.situation_material" invalid binary disabled />
          <label>Situation matérielle</label>
        </div>
      </div>

      <!-- Signature Section -->
      <div class="text-right mt-5">
        <h6>Signature</h6>
        <img :src="signatureImage" alt="Signature graphique" class="my-3">
      </div>
    </div>
  </div>
</template>

<script>

import html2pdf from "html2pdf.js";
export default {
  inject: ['dialogRef'],
  data() {
    return {
      signatureImage: null,
      code: ''
    }
  },
  mounted() {
    this.signatureImage = "data:image/png;base64," + this.dialogRef.data.signature
    // this.getCentrebycentre()
  },

  methods: {

    // getCentrebycentre() {
    //   this.$axios.get(`voting_centre/by_province/${this.dialogRef.data.zone_code}`).then(response => {
    //     this.code = response
    //   })
    // },
    download() {
      this.isLoading = true
      html2pdf().set({
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        margin: [0.5, 0.5],
        filename: "fiche bureau vote " + this.dialogRef.data.id,
        html2canvas: { scale: 2 },
        image: { type: 'jpeg', quality: 0.98 },
      }).from(document.getElementById("fiche-bureau"))
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          var totalPages = pdf.internal.getNumberOfPages();
          pdf.setFontSize(10);
          pdf.setTextColor(150);
          for (var i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.text('v-stats, Presidentielle 2025, Campagne Brice Clotaire OLIGUI NGUEMA', pdf.internal.pageSize.getWidth() - 0.50, pdf.internal.pageSize.getHeight() - 0.50, { align: 'right' });
          }
        })
        .save();
      setTimeout(() => {
        this.isLoading = false
      }, 5000)
    },
  }
}
</script>
