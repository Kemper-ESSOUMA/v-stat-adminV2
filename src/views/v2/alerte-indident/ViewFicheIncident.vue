<template>
  <div class="d-flex mb-4">
    <button type="button" class="btn btn-sm btn-info mr-2" @click="download()">
      <i class="fas fa-print"></i> Imprimer
    </button>
  </div>
  <div class="container-fluid" id="fiche">
    <div class="row d-flex justify-content-center align-items-center mb-4">
      <div class="col-3 border-right border-dark">
        <img src="@/assets/mni.png" class="w-100" style="padding-right: 10%;">
      </div>
      <div class=" col-6">
        <div class="text-left">
          <h3 class="text-primary font-weight-bold">Election Presidentielle 2025 <br>
          </h3>

        </div>
      </div>
    </div>

    <h2 class="text-center font-bold">Fiche d'Incident</h2><br>
    <div>
      <h4>
        N° 00000{{ this.dialogRef.data.id }}
      </h4>
    </div>
    <br>
    <div class="container mt-4">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Date :</th>
            <td>{{ this.dialogRef.data.date }}</td>
          </tr>
          <tr>
            <th>Zone Code :</th>
            <td>{{ this.dialogRef.data.zone_code }}</td>
          </tr>
          <tr>
            <th>Organisateur :</th>
            <td>
              {{ this.dialogRef.data.supervisor }}
            </td>
          </tr>
          <tr>
            <th>Centre de vote :</th>
            <td>
              {{ this.code }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Evenement :</th>
            <td>{{ this.dialogRef.data.event }}</td>
          </tr>
          <tr>
            <th>Type d'incident :</th>
            <td>{{ this.dialogRef.data.type }}</td>
          </tr>
          <tr>
            <th>Recommandation :</th>
            <td>{{ this.dialogRef.data.description }}</td>
          </tr>
          <tr>
            <th>Action préconisé :</th>
            <td>{{ this.dialogRef.data.criticality_situation }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Signature Section -->
      <div class="text-right mt-5">
        <h6>Signature</h6>
        <!-- <img src="@/assets/signature.png" class="my-3"> -->
        <img :src="this.signatureImage" alt="Signature graphique" class="my-3">
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
    console.log('data = ', this.dialogRef.data)
    this.signatureImage = "data:image/png;base64," + this.dialogRef.data.signature
    this.getCentrebycentre()
  },

  methods: {

    getCentrebycentre() {
      this.$axios.get(`voting_centre/by_code/${this.dialogRef.data.voting_center}`).then(response => {
        console.log('by centre = ', response)
        this.code = response.data.libelle
      })
    },
    download() {
      this.isLoading = true
      html2pdf().set({
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        margin: [0.5, 0.5],
        filename: "fiche incident" + this.dialogRef.data.id,
        html2canvas: { scale: 2 },
        image: { type: 'jpeg', quality: 0.98 },
      }).from(document.getElementById("fiche"))
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
