<template>
  <div class="modal">
    <h3>Sesión expirada</h3>
    <input v-model="password" type="password" placeholder="Ingrese contraseña" />
    <button @click="reautenticar">Reiniciar Sesión</button>
    <button @click="$emit('cancel')">Cancelar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore';

const password = ref('');
const sessionStore = useSessionStore();
const emit = defineEmits(['reloginSuccess', 'cancel'])

console.log(sessionStore);
const ip = import.meta.env.VITE_API_URL;

const reautenticar = async () => {

    console.log(sessionStore.username);
    console.log(password.value);

  const res = await axios.post(ip+'/iniciador', {
    username: sessionStore.username,
    password: password.value
  });

  if (res.data.success) {
    sessionStore.iniciarSesion(res.data);
    password.value = '';
    emit('reloginSuccess');
  } else {
    alert('Contraseña incorrecta');
  }
};
</script>
