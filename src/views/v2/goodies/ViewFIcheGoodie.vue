<template>
  <div class="d-flex mb-4">
    <button type="button" class="btn btn-sm btn-info mr-2" @click="download()">
      <i class="fas fa-print"></i> Imprimer
    </button>
  </div>
  <div class="container-fluid" id="fiche">
    <div class="row d-flex justify-content-center align-items-center mb-4">
      <div class="col-3 border-right border-dark">
        <img src="@/assets/v-state-lg.png" class="w-100" style="padding-right: 10%;">
      </div>
      <div class=" col-6">
        <div class="text-left">
          <h3 class="text-primary font-weight-bold">Presidentielle 2025 <br> Campagne Brice Clotaire OLIGUI NGUEMA <br>
          </h3>

        </div>
      </div>
    </div>

    <h2 class="text-center font-bold">Fiche de Climat</h2><br>

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
            <th>Satisfaction population :</th>
            <td>
              {{ this.dialogRef.data.population }}
            </td>
          </tr>
          <tr>
            <th>Satisfaction adherant :</th>
            <td>
              {{ this.dialogRef.data.party_members }}
            </td>
          </tr>
          <tr>
            <th>Satisfaction Association :</th>
            <td>
              {{ this.dialogRef.data.associations }}
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Satisfaction Communauté réligieuse :</th>
            <td>{{ this.dialogRef.data.religious_community }}</td>
          </tr>
          <tr>
            <th>Satifaction Auxiliaire :</th>
            <td>{{ this.dialogRef.data.commands_auxiliary }}</td>
          </tr>
          <tr>
            <th>Satifaction Syndicat :</th>
            <td>{{ this.dialogRef.data.unions }}</td>
          </tr>
          <tr>
            <th>Recommandation :</th>
            <td>{{ this.dialogRef.data.observation }}</td>
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
      signatureImage: null
    }
  },
  mounted() {
    console.log('data = ', this.dialogRef.data)
    this.signatureImage = "data:image/png;base64," + this.dialogRef.data.signature
  },

  methods: {
    download() {
      this.isLoading = true
      html2pdf().set({
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        margin: [0.5, 0.5],
        filename: "fiche goodie " + this.dialogRef.data.id,
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
            pdf.text('v-stats, Presidentielle 2025, Campagne Brice Clotaire OLIGUI NGUEMA', pdf.internal.pageSize.getWidth() - 1.05, pdf.internal.pageSize.getHeight() - 0.50, { align: 'right' });
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
