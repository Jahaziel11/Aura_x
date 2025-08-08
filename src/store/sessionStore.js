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

      this.sesion_id = data.sesion_id;
      this.username = data.username;
      this.id_username = data.id_usuario;
      this.menusesion = data.menuUsuario;
      this.lista = data.lists;
      this.conf_sis = data.conf_sis;
      this.isAuthenticated = true;

      localStorage.setItem('session', JSON.stringify({
        sesion_id: this.sesion_id,
        username: this.username,
        id_username: this.id_username,
        menusesion: this.menusesion,
        lista: this.lista,
        conf_sis: this.conf_sis,
        isAuthenticated: this.isAuthenticated
      }));

    },
    cerrarSesion() {
      this.sesion_id = null;
      this.username = null;
      this.id_username = null;
      this.isAuthenticated = false;
      this.menusesion = null;
      this.lista = null;
      this.conf_sis = null;
      localStorage.removeItem('session');
    },
    cargarSesion() {
      const savedSession = localStorage.getItem('session');
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        this.sesion_id = parsedSession.sesion_id;
        this.username = parsedSession.username;
        this.id_username = parsedSession.id_username;
        this.menusesion = parsedSession.menusesion;
        this.isAuthenticated = parsedSession.isAuthenticated;
        this.conf_sis = parsedSession.conf_sis;

        this.lista = parsedSession.lista;
      }
    }
  }
});
