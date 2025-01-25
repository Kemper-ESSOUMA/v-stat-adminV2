// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        isLogged: false,
        currentUser: null,
        token: null,
        user: null
    }),

    getters: {
        authenticated(state) {
            return state.isLogged;
        },
    },

    actions: {
        // Initialise l'authentification depuis le localStorage
        initializeAuth() {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken && storedUser) {
                this.token = storedToken;
                this.currentUser = JSON.parse(storedUser);
                this.isLogged = true;
            }
        },

        // Définit l'état après la connexion
        setLogged(user, token) {
            this.isLogged = true;
            this.currentUser = user;
            this.token = token;


            // Stocke les informations dans le localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        },

        // Déconnexion
        logout() {
            this.isLogged = false;
            this.currentUser = null;
            this.token = null;

            // Nettoie le localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});