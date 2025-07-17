import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sesion_id: null,
    username: null,
    isAuthenticated: false
  }),
  actions: {
    iniciarSesion(data) {
      this.sesion_id = data.sesion_id;
      this.username = data.username;
      this.isAuthenticated = true;
    },
    cerrarSesion() {
      this.sesion_id = null;
      this.username = null;
      this.isAuthenticated = false;
    }
  }
});
