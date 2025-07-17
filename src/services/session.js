import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore';

export async function validarSesionActiva() {
  const store = useSessionStore();
  const ip = import.meta.env.VITE_API_URL;

  try {
    const res = await axios.post(ip+'/expiration', {
      sesion_id: store.sesion_id
    });

    return res.data.success;
  } catch {
    return false;
  }
}
