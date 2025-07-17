import {ref} from 'vue';
import { useSessionStore } from '@/store/sessionStore';
import { useRouter } from 'vue-router';
import axios from 'axios';
import loadingGif from '@/assets/loading.gif';
export default {
  setup() {

    const username = ref('');
    const password = ref(null);
    const error = ref('');
    const router = useRouter();
    const sessionStore = useSessionStore();
    const ip = import.meta.env.VITE_API_URL;
    const tem_login = ref(true)
    const tem_iniciador = ref(false);
    const text = ref('');

    const iniciarSesion = async () => {
      error.value = '';
      try {
        const res = await axios.post(ip + '/login', {
          username: username.value,
          password: password.value
        });
        console.log(res.data);
        if (res.data.success) {
          tem_login.value = false;
          tem_iniciador.value = true;

          const res = await axios.post(ip + '/iniciador', {
            username: username.value,
            password: password.value
          });
          if (res.data.success) {
            sessionStore.iniciarSesion(res.data);
            setTimeout(() => {
              router.push('/AuraF')
            }, 3000);
          }else{
            tem_login.value = true;
            tem_iniciador.value = false;
            error.value = 'Error al iniciar la sesion';
          }
        } else {
          error.value = 'Credenciales incorrectas';
        }
      } catch (e) {
        error.value = 'Error al conectar con el servidor';
        console.log(e);
      }
    };

    return {
      username,
      password,
      tem_login,
      tem_iniciador,
      loadingGif,
      iniciarSesion
    };
  }
};
