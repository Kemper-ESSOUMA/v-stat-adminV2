<template>
  <div class="d-flex mb-4">
    <button type="button" class="btn btn-sm btn-info mr-2" @click="download()">
      <i class="fas fa-print"></i> Imprimer
    </button>
  </div>
  <div class="container-fluid" id="fiche">
    <div class="row d-flex justify-content-center align-items-center mb-4">
      <div class="col-3 border-right border-dark">
        <img src="@/assets/UDB.png" class="w-100" style="padding-right: 10%;">
      </div>
      <div class=" col-6">
        <div class="text-left">
          <h3 class="text-primary font-weight-bold">Fiche d'adhésion
          </h3>

        </div>
      </div>
    </div>

    <h2 class="text-center font-bold">Information de l'adhérent</h2><br>
    <div class="row align-items-start justify-content-between">

      <div class="col-auto">
        <h4>N° 00000{{ dialogRef.data.id }}</h4>
        <h4>NIP : {{ dialogRef.data.nip }}</h4>
      </div>


      <div class="col-3 border-start border-dark ps-3">
        <img :src="picture" class="img-fluid" style="max-height: 150px; object-fit: contain;" />
      </div>
    </div>

    <br>
    <div class="container mt-4">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Préfixe :</th>
            <td>{{this.dialogRef.data.prefix}}</td>
          </tr>
          <tr>
            <th>Nom :</th>
            <td>{{this.dialogRef.data.lastname}}</td>
          </tr>
          <tr>
            <th>Prénom :</th>
            <td>
              {{this.dialogRef.data.firstname}}
            </td>
          </tr>
          <tr>
            <th>Téléphone :</th>
            <td>
              {{this.dialogRef.data.phone}}
            </td>
          </tr>
          <tr>
            <th>Résidence :</th>
            <td>
              {{this.dialogRef.data.residence}}
            </td>
          </tr>
          <tr>
            <th>Email :</th>
            <td>
              {{this.dialogRef.data.email}}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Recommandation :</th>
            <td>{{this.dialogRef.data.recommendation}}</td>
          </tr>
          <tr>
            <th>Zone de Code :</th>
            <td>{{this.dialogRef.data.zone_code}}</td>
          </tr>
        </tbody>
      </table> -->

      <!-- Signature Section -->
      <div class="mt-5">
        <h6>Signature</h6>
        <!-- <img src="@/assets/signature.png" class="my-3"> -->
        <img :src="this.signatureImage" alt="Signature graphique" class="my-3" height="200px" >
      </div>
    </div><br><br>
    <div class="pdf-page-break">
      <img :src="doc" class="img-full-page" />
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
export default {
  inject: ['dialogRef'],
  data() {
    return{
      signatureImage: null,
      picture: null,
      doc: null
    }
  },
  mounted(){
    this.signatureImage = "data:image/png;base64," + this.dialogRef.data.signature
    this.photo()
    this.docId()
  },

  methods:{
    download() {
        this.isLoading = true
        html2pdf().set({

            pagebreak: { mode: 'avoid-all' },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            margin: [0.5, 0.5],
            filename: "fiche " + ' ' +  this.dialogRef.data.lastname + ' ' + this.dialogRef.data.firstname,
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
                    pdf.text('v-stats, une vision nouvelle du numérique', pdf.internal.pageSize.getWidth() - 1.05, pdf.internal.pageSize.getHeight() - 0.50, { align: 'right' });
                }
            })
            .save();
        setTimeout(() => {
            this.isLoading = false
        }, 5000)
    },

    photo() {
      this.loading = true;
      this.$axios
        .get(`/img/secure_img/${this.dialogRef.data.nip}.png`, {
          responseType: 'blob'
        })
        .then((response) => {
          this.loading = false;

          // Convertit le blob en URL locale
          this.picture = URL.createObjectURL(response.data);
        })
        .catch((error) => {
          this.loading = false;
          console.error("Erreur de récupération de données :", error);
        });
    },
    docId(){
      this.loading = true;
      this.$axios
      .get(`/img/secure_pdf/${this.dialogRef.data.nip}.png`, {
        responseType: 'blob'
      })
      .then((response) => {
        this.loading = false;

        // Convertit le blob en URL locale
        this.doc = URL.createObjectURL(response.data);
      })
      .catch((error) => {
        this.loading = false;
        console.error("Erreur de récupération de données :", error);
      });
    },

  }
}
</script>

<style>

.pdf-page-break {
  page-break-before: always;
  text-align: center;
  padding: 1in; /* marge interne optionnelle */
}

.img-full-page {
  width: 100%;
  max-width: 100%;
  max-height: 1000px;
  object-fit: contain;
}


</style>

