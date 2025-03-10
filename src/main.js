/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primeflex/primeflex.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jquery/dist/jquery";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import DynamicDialog from "primevue/dynamicdialog";
import DialogService from "primevue/dialogservice";
import Dropdown from "primevue/dropdown";
import ProgressSpinner from "primevue/progressspinner";
import Image from "primevue/image";
import FileUpload from "primevue/fileupload";
import Editor from "primevue/editor";
import InputNumber from "primevue/inputnumber";
import AutoComplete from "primevue/autocomplete";
import ProgressBar from "primevue/progressbar";
import DataView from "primevue/dataview";
import InputText from "primevue/inputtext";

import Checkbox from 'primevue/checkbox';

import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Chart from "primevue/chart";
import SelectButton from "primevue/selectbutton";
import SpeedDial from "primevue/speeddial";
import MultiSelect from "primevue/multiselect";

import "primeicons/primeicons.css";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

//empêcher aussi l'inspection avec F12, Ctrl+Shift+I et Ctrl+U et Ctrl+S
// document.addEventListener("contextmenu", (event) => event.preventDefault());

// document.addEventListener("keydown", (event) => {
//   if (
//     event.ctrlKey &&
//     (event.key.toLowerCase() === "u" || // Ctrl + U
//       event.key.toLowerCase() === "s" || // Ctrl + S
//       event.key.toLowerCase() === "i" || // Ctrl + Shift + I
//       event.key.toLowerCase() === "j" || // Ctrl + Shift + J
//       event.key.toLowerCase() === "k" || // Ctrl + Shift + K
//       event.key.toLowerCase() === "c") // Ctrl + Shift + C
//   ) {
//     event.preventDefault();
//   }

//   if (event.key === "F12") {
//     // F12
//     event.preventDefault();
//   }
// });


(function() {
    let isOpen = false; // Variable pour éviter les exécutions répétées

    function detectInspector() {
        const before = performance.now();
        debugger;
        const after = performance.now();

        if (after - before > 100) {
            isOpen = true;
            document.body.innerHTML = ""; // Vide complètement la page
            document.head.innerHTML = ""; // Supprime les scripts
            location.href = "about:blank"; // Redirige immédiatement
        }
    }

    // Vérifie au chargement
    detectInspector();

    // Vérifie en continu pour empêcher l'ouverture après le chargement
    setInterval(() => {
        if (!isOpen) detectInspector();
    }, 500);
})();



const app = createApp(App);
app.use(PrimeVue);

app.use(DialogService);
app.use(ToastService);

app.component("DataTable", DataTable);
app.component("DataTableColumn", Column);
app.component("DataPaginator", Paginator);
app.component("DynamicDialog", DynamicDialog);
app.component("SearchDropdown", Dropdown);
app.component("ProgressSpinner", ProgressSpinner);
app.component("ShowImage", Image);
app.component("FileUpload", FileUpload);
app.component("TextEditor", Editor);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("AutoComplete", AutoComplete);
app.component("ProgressBar", ProgressBar);
app.component("DataView", DataView);
app.component("ShowToast", Toast);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("ChartJS", Chart);
app.component("SelectButton", SelectButton);
app.component("SpeedDial", SpeedDial);
app.component("MultiSelect", MultiSelect);
app.component('CheckboxMulti', Checkbox);
registerPlugins(app);

app.mount("#app");