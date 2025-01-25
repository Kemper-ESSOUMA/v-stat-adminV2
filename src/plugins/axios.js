import axios from "axios";

const axiosPlugin = {
    install(App) {
        // Récupère le token depuis le localStorage
        let token = localStorage.getItem("token") || "";

        // Crée une instance Axios
        const axiosInstance = axios.create({
            // baseURL: "https://51.222.158.64:8001/api/",
            baseURL: "http://192.168.2.111:8000/api/",
        });

        // Ajoute le token aux en-têtes si disponible
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        console.log('log tok = ', token)

        // Injecte Axios et une méthode pour mettre à jour le token dans Vue
        App.config.globalProperties.$axios = axiosInstance;
        App.config.globalProperties.$updateToken = (newToken) => {
            token = newToken; // Met à jour la valeur locale du token
            localStorage.setItem("token", newToken); // Sauvegarde le token
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        };
    },
};

export default axiosPlugin;