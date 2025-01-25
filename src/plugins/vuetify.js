// plugins/vuetify.js

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Crée un thème personnalisé
const customTheme = {
    dark: false, // Utilise un thème clair
    colors: {
        background: "#FFFFFF", // Fond blanc
        surface: "#FFFFFF", // Fond des cartes/blocs en blanc
        primary: "#3242C5", // Bleu (ou la couleur bleue de ton choix)
        secondary: "#4CAF50", // Vert (ou une couleur verte homogène)
        error: "#FF5252", // Rouge pour les erreurs
        info: "#2196F3", // Bleu pour les informations
        success: "#4CAF50", // Vert pour les succès
        warning: "#FB8C00", // Orange pour les avertissements
    },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: "customTheme", // Définit le thème personnalisé par défaut
        themes: {
            customTheme,
        },
    },
});