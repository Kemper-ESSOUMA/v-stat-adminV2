<template>
  <div v-if="this.idParams != null">
    <div class="card card-body p-0">
      <table class="table text-sm">
        <thead class="card-header">
          <tr>
            <th scope="col"></th>
            <th v-for="column in this.columns" :key="column.id" scope="col">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <slot name="action_btns" :data="line"></slot>
            </td>
            <td v-for="column in this.columns" :key="column.id">
              <div v-if="column.stringWithKeys">
                <div v-if="column.key" :class="column.class">
                  {{ writeString(line, column.stringWithKeys) }}
                </div>
              </div>
              <div v-else-if="column.format">
                <span v-if="column.format == 'date'">
                  {{ dateFormat(checkIfExist(line, column.key)) }}
                </span>
                <span v-else-if="column.format == 'money'">
                  {{ moneyFormat(checkIfExist(line, column.key)) }}
                </span>
                <span v-else-if="column.format == 'state'"
                  :class="'p-2 rounded-pill badge badge-' + setStateColor(checkIfExist(line, column.key))">
                  <span>{{ checkIfExist(line, column.key) }}</span>
                </span>
              </div>
              <div v-else>
                {{ checkIfExist(line, column.key) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
  <div v-else>
    <div class="w-100" v-if="this.affichage == 'cards'">
      <div class="mb-3">
        <div class="d-flex justify-content-end p-2" v-if="getCountableColumns(columns).length > 0">
          <span class="badge badge-success p-1 mr-2" v-if="this.table == 'courses'">
            Total reste à payer : {{ moneyFormat(getTotalOfColumn('reste_a_payer')) }}
          </span>
          <span class="badge badge-success p-1 mr-2" v-for="column in getCountableColumns(columns)" :key="column.id">
            Total {{ column.label }} : {{ moneyFormat(getTotalOfColumn(column.key)) }}
          </span>
        </div>
        <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>

        <div class="d-flex">
          <div class="mr-2">
            <select v-model="rows" class="form-control form-control-sm" @change="getDatas()">
              <option v-for="option in showEntries" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mr-2">
            <button :id="'refresh' + this.table" class="btn btn-sm btn-outline-dark mr-2" @click="getDatas()">
              <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
              <i v-else class="fa fa-refresh"></i>
              <span> Actualiser</span>
            </button>
          </div>
          <div class="mr-2 d-flex" v-if="selectedLines.length > 0">
            <slot name="action_group_btns" :data="selectedLines"></slot>
          </div>
          <div class="ml-auto">
            <form @submit.prevent="getDatas()" class="form-inline">
              <input type="search" v-model="keyWord" class="form-control form-control-sm" placeholder="Rechercher">
              <button type="submit" class="btn btn-sm btn-outline-dark ml-2">
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3" v-for="data in datas" :key="data.id">
          <div class="card card-body overflow-y-auto bg-yams" style="height: 15rem;">
            <div class="row">
              <div class="col-6" v-for="column in columns" :key="column.key">
                <div v-if="data[column.key] != null">
                  <div v-if="column.format">
                    <span v-if="column.format == 'date'">
                      {{ dateFormat(checkIfExist(data, column.key)) }}
                    </span>
                    <span v-else-if="column.format == 'money'">
                      {{ moneyFormat(checkIfExist(data, column.key)) }}
                    </span>
                    <span v-else-if="column.format == 'state'"
                      :class="'p-2 rounded-pill badge badge-' + setStateColor(checkIfExist(data, column.key))">
                      <span>{{ checkIfExist(data, column.key) }}</span>
                    </span>
                  </div>
                  <div v-else-if="column.stringWithKeys && column.key" :class="column.class">
                    {{ writeString(data, column.stringWithKeys) }}
                  </div>

                  <span v-else>
                    <small class="font-weight-bold">{{ column.label }} :</small> {{ data[column.key] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-2">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            {{ totalRecords }} Lignes
          </div>
          <DataPaginator v-model:first="first" :rows="rows" :totalRecords="totalRecords" @page="getDatas()"
            class="bg-transparent"></DataPaginator>
          <div>
            <ExportTable :table="this.table" :datas="datas" :fields="exportableFields(this.columns)"></ExportTable>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div :class="{ 'card': this.inCard == true }">
        <div class="p-0" :class="{ 'card-body ': this.inCard == true }">
          <div class="d-flex justify-content-end p-2" v-if="getCountableColumns(columns).length > 0">
            <span class="badge badge-warning p-1 mr-2" v-if="this.table == 'courses'">
              Total reste à payer : {{ moneyFormat(getTotalOfColumn('reste_a_payer')) }}
            </span>
            <span class="badge badge-success p-1" v-for="column in getCountableColumns(columns)" :key="column.id"
              :field="column.key">
              Total {{ column.label }} : {{ moneyFormat(getTotalOfColumn(column.key)) }}
            </span>
            <div class="ml-auto" v-if="this.table == 'operations'">
              <span class="badge badge-danger p-1 mr-2">
                Total debit : {{ moneyFormat(getTotalOfColumnBySolde('Debit')) }}
              </span>
              <span class="badge badge-success p-1 mr-2">
                Total credit : {{ moneyFormat(getTotalOfColumnBySolde('Credit')) }}
              </span>
            </div>
          </div>
          <ProgressBar v-if="isLoading === true" mode="indeterminate" style="height: 6px"></ProgressBar>
          <div class="font weight-bold p-1" v-if="selectedLines.length > 0">
            {{ selectedLines.length }} ligne(s) sélectionné(s)
          </div>

          <DataTable :key="key" class="p-datatable-sm" v-model:selection="selectedLines" dataKey="id" :value="datas"
            :rows="rows" :rowsPerPageOptions="showEntries" filterDisplay stripedRows>
            <template #header v-if="!noTopBar">
              <div class="d-flex">
                <div class="mr-2" v-if="!this.perPage">
                  <select v-model="rows" class="form-control form-control-sm" @change="getDatas()">
                    <option v-for="option in showEntries" :key="option" :value="option">{{ option }}</option>
                  </select>
                </div>
                <div class="mr-2">
                  <button :id="'refresh' + this.table" class="btn btn-sm btn-outline-dark mr-2" @click="getDatas()">
                    <span v-if="isLoading == true" class="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"></span>
                    <i v-else class="fa fa-refresh"></i>
                    <span v-if="!this.perPage"> Actualiser</span>
                  </button>
                </div>
                <div class="mr-2 d-flex" v-if="selectedLines.length > 0">
                  <slot name="action_group_btns" :data="selectedLines"></slot>
                </div>
                <div class="ml-auto">
                  <form @submit.prevent="getDatas()" class="form-inline">
                    <input type="search" v-model="keyWord" class="form-control form-control-sm"
                      placeholder="Rechercher">
                    <button type="submit" class="btn btn-sm btn-outline-dark ml-2">
                      <i class="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </template>
            <template #empty> Aucune donnée disponible. </template>
            <DataTableColumn v-if="this.selection === true" selectionMode="multiple" headerStyle="width: 3rem">
            </DataTableColumn>
            <DataTableColumn>
              <template #body="{ data }">
                <div class="d-flex">
                  <slot name="action_btns" :data="data"></slot>
                </div>
              </template>
            </DataTableColumn>
            <DataTableColumn v-for="column in columns" :key="column.id" :field="column.key" :header="column.label">
              <template v-if="column.stringWithKeys" #body="{ data }">
                <div v-if="column.key" :class="column.class">
                  {{ writeString(data, column.stringWithKeys) }}
                </div>
              </template>
              <template v-else-if="column.format" #body="{ data }">
                <span v-if="column.format == 'date'">
                  {{ dateFormat(checkIfExist(data, column.key)) }}
                </span>
                <span v-else-if="column.format == 'money'">
                  {{ moneyFormat(checkIfExist(data, column.key)) }}
                </span>
                <span v-else-if="column.format == 'state'"
                  :class="'p-2 rounded-pill badge badge-' + setStateColor(checkIfExist(data, column.key))">
                  <span>{{ checkIfExist(data, column.key) }}</span>
                </span>
              </template>
            </DataTableColumn>
          </DataTable>

          <div class="px-2">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                {{ totalRecords }} Lignes
              </div>
              <DataPaginator v-model:first="first" :rows="rows" :totalRecords="totalRecords" @page="getDatas()"
                class="bg-transparent"></DataPaginator>
              <div>
                <ExportTable :table="this.table" :datas="datas" :fields="exportableFields(this.columns)"></ExportTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { defineComponent } from 'vue';

export default defineComponent({
  name: "DataTableBackend",
  props: {
    affichage: { type: String },
    table: { type: String },
    url: { type: String },
    perPage: { type: Number },
    columns: { type: Array },
    inCard: { type: Boolean },
    selection: { type: Boolean },
    noTopBar: { type: Boolean },
    idParams: { type: Number },
  },
  data() {
    return {
      initialUrl: '',

      first: 0,
      line: [],
      datas: [],
      selectedLines: [],
      showEntries: [5, 10, 25, 50, 100],
      rows: 5,
      page: 1,
      keyWord: '',
      filters: [],
      isLoading: true,
      period: moment().format('YYYY-MM'),
      currentPeriod: moment().format('YYYY-MM'),
      key: 1,
      totalRecords: 0,
      form: {
        debut: '',
        fin: '',
        conditions: []
      },
      lastItemId: 0,
    };
  },
  created() {
    if (this.perPage) {
      this.rows = this.perPage
    }
    if (this.url) {
      this.initialUrl = this.url
    }
  },
  mounted() {
    if (this.idParams != null) {
      this.getLineDatas();
    } else this.getDatas();
  },
  methods: {
    writeString(arr, tabKeys) {
      let finalResult = ''
      for (let index = 0; index < tabKeys.length; index++) {
        const element = tabKeys[index];
        if (element.var) {
          let result = this.checkIfExist(arr, element.var)
          if (result !== '') {
            if (element.format == 'date') result = this.dateFormat(result)
            else if (element.format == 'money') result = this.moneyFormat(result)
          }
          finalResult = finalResult + ' ' + result
        }
        if (element.text) {
          finalResult = finalResult + ' ' + element.text
        }
      }

      return finalResult
    },
    dateFormat(varDate) {
      if (varDate != '') {
        const newDate = new Date(varDate)
        if (newDate) return moment(newDate).format('DD/MM/YYYY')
      }
    },
    moneyFormat(varMoney) {
      if (varMoney) return new Intl.NumberFormat('de-DE').format(varMoney) + ' FCFA'
    },
    setStateColor(varState) {
      if (varState == 'Confirmé' || varState == 'Terminé' || varState == 'Payé' || varState == 'Accepté' || varState == 'Disponible' || varState == 'Credit') {
        return 'success'
      }
      else if (varState == 'En cours' || varState == 'En course') {
        return 'primary'
      }
      else if (varState == 'Brouillon' || varState == 'Programmé') {
        return 'secondary'
      }
      else if (varState == 'Annulé' || varState == 'En attente' || varState == 'Refusé' || varState == 'Rompu' || varState == 'Debit') {
        return 'danger'
      }
      else return 'light border border-dark'
    },
    checkIfExist(arr, key) {
      const tabSegment = key.split('.')
      let result = arr
      for (let index = 0; index < tabSegment.length; index++) {
        const element = tabSegment[index];
        if (result[element]) {
          result = result[element]
        }
        else result = ''
      }
      return result
    },
    getDatas() {
      this.isLoading = true
      //lister les colonnes pour la requete
      let columns = []
      this.columns.forEach(element => {
        columns.push(element.key)
      });

      //vider le tableau avant de recharger
      this.datas = []
      this.selectedLines = []

      if (this.first <= 0) {
        this.page = 1
      }
      else {
        this.page = (this.first / this.rows) + 1
      }
      let link = this.initialUrl
      if (link !== undefined && link.includes('?')) link = link + '&'
      else link = link + '?'
      this.$axios.get(link + 'page=' + this.page + '&rows=' + this.rows + '&search_by_keyword=' + this.keyWord + '&columns=' + columns).then((response) => {
        this.datas = response.data
        this.totalRecords = response.data.length
        this.$emit('set-total-records', response.data.length)
        this.isLoading = false
        this.key++
      }).catch(() => {
        this.isLoading = false
        // this.$toast.add({
        //   severity: 'error',
        //   summary: 'Probleme de connexion',
        //   detail: 'Une erreur s\'est produite lors de la connexion au serveur !',
        //   life: 5000
        // });
      });
    },
    getLineDatas() {
      this.isLoading = true
      this.axios.get('/api/' + this.table + '/' + this.$route.params.id).then((response) => {
        this.line = response.data
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
    },
    resetPeriod() {
      this.period = this.currentPeriod;
      this.getDatas()
    },

    exportableFields(fields) {
      if (fields && fields.length > 0) {
        return fields.filter(item => item.exportable && item.exportable == true)
      }
    },
    getCountableColumns(cols) {
      return cols.filter(item => item.format == 'money')
    },
    getTotalOfColumn(key) {
      let mt = 0
      for (let index = 0; index < this.datas.length; index++) {
        const element = this.datas[index];
        if (parseFloat(element[key])) {
          mt = mt + parseFloat(element[key])
        }
      }
      return mt
    },
    getTotalOfColumnBySolde(solde) {
      let mt = 0
      for (let index = 0; index < this.datas.length; index++) {
        const element = this.datas[index];
        if (parseFloat(element.montant) && element.solde == solde) {
          mt = mt + parseFloat(element.montant)
        }
      }
      return mt
    },
    addLine() {
      this.lastItemId++
      this.form.conditions.push({
        id: this.lastItemId,
        type: '',
        colonne: '',
        valeur: ''
      })
    },
    removeLine(key) {
      this.form.conditions = this.form.conditions.filter((data, index) => {
        return index != key
      })
    }


  }
})
</script>

<style scoped>
#filtre {
  width: 350px;
}
</style>
