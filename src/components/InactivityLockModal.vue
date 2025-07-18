<template>
  <div class="modal">
    <h3>Bloqueo por inactividad</h3>
    <input v-model="password" type="password" placeholder="Ingrese contraseña" />
    <button @click="desbloquear">Desbloquear</button>
    <button @click="$emit('cancel')">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore';

const password = ref('');
const emit = defineEmits(['unlock', 'cancel']);
const sessionStore = useSessionStore();
const ip = import.meta.env.VITE_API_URL;

const desbloquear = async () => {

    console.log(sessionStore.username);
    console.log(password.value);

  const res = await axios.post(ip+'/iniciador', {
    username: sessionStore.username,
    password: password.value
  });

  console.log(res.data);
  if (res.data.success) {
    emit('unlock');
  } else {
    alert('Contraseña incorrecta');
  }
};
</script>
