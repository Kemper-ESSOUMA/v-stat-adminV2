import axios from "axios";
import { useAppStore } from "@/store/app";
const axiosPlugin = {
    install(App) {
        // Récupère le token depuis le localStorage
        let token = localStorage.getItem("token") || "";
        const ip_dev = "51.222.158.64:8002/api/";
        // const ip_prod = "51.222.158.64:8001/api/";

        // Crée une instance Axios
        const axiosInstance = axios.create({
            //  baseURL: "https://51.222.158.64:8001/api/",
            //  baseURL: "http://192.168.2.111:8000/api/",
            baseURL: `https://${ip_dev}`,
        });

        // URL WebSocket
        const WS_URL = `wss://${ip_dev}ws/ws`;
        //  const WS_URL = "wss://51.222.158.64:8001/api/ws/ws";

        // Ajoute le token aux en-têtes si disponible
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        // Intercepteur pour vérifier les erreurs 401
        axiosInstance.interceptors.response.use(
            (response) => response, // Si la réponse est OK, on la retourne directement
            (error) => {
                if (error.response && error.response.status === 401) {
                    console.warn(
                        "Erreur 401 détectée, redirection vers la page de connexion..."
                    );

                    // Supprime les informations utilisateur (token) dans le localStorage et sessionStorage
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("token");

                    // Récupérer le store via Pinia
                    const appStore = useAppStore(); // Utiliser useAppStore pour accéder au store
                    appStore.logout(); // Déconnecte l'utilisateur en mettant à jour le store

                    // Redirige vers la page de connexion
                    const router = App.config.globalProperties.$router;
                    if (router) {
                        router.push({ name: "Login" }); // Redirige vers la page de connexion
                    }
                }
                return Promise.reject(error);
            }
        );

        console.log("log tok = ", token);

        // Injecte Axios et une méthode pour mettre à jour le token dans Vue
        App.config.globalProperties.$axios = axiosInstance;
        App.config.globalProperties.$wsUrl = WS_URL; // Accès via this.$wsUrl
        App.config.globalProperties.$updateToken = (newToken) => {
            token = newToken; // Met à jour la valeur locale du token
            localStorage.setItem("token", newToken); // Sauvegarde le token
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${newToken}`;
        };
    },
};

export default axiosPlugin;