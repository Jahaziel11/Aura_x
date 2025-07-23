import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sesion_id: null,
    username: null,
    menusesion: null,
    lista: null,
    isAuthenticated: false
  }),
  actions: {
    iniciarSesion(data) {
      console.log(data);
      this.sesion_id = data.sesion_id;
      this.username = data.username;
      this.menusesion = data.menuUsuario;
      this.lista = data.lists;
      this.isAuthenticated = true;

      localStorage.setItem('session', JSON.stringify({
        sesion_id: this.sesion_id,
        username: this.username,
        menusesion: this.menusesion,
        lista: this.lista,
        isAuthenticated: this.isAuthenticated
      }));

    },
    cerrarSesion() {
      this.sesion_id = null;
      this.username = null;
      this.isAuthenticated = false;
      this.menusesion = null;
      this.lista = null;
      localStorage.removeItem('session');
    },
    cargarSesion() {
      const savedSession = localStorage.getItem('session');
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        this.sesion_id = parsedSession.sesion_id;
        this.username = parsedSession.username;
        this.menusesion = parsedSession.menusesion;
        this.isAuthenticated = parsedSession.isAuthenticated;
        this.lista = parsedSession.lista;
      }
    }
  }
});
