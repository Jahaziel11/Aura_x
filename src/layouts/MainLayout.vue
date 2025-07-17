<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useSessionStore } from '@/store/sessionStore'
import { validarSesionActiva } from '@/services/session'
import SessionModal from '@/components/SessionModal.vue'
import InactivityLockModal from '@/components/InactivityLockModal.vue'

const showSessionModal = ref(false)
const showInactivityModal = ref(false)

const sessionStore = useSessionStore()


const eventos = ['mousemove', 'keydown', 'click', 'touchstart']
let inactividadTimer = null
const tiempoInactividad = 10 * 60 * 1000 // 10 minutos

const resetInactividad = () => {
  clearTimeout(inactividadTimer)
  inactividadTimer = setTimeout(() => {
    showInactivityModal.value = true
  }, tiempoInactividad)
}

let verificadorSesionTimer = null
const iniciarVerificacionSesion = () => {
  verificadorSesionTimer = setInterval(async () => {
    const activa = await validarSesionActiva()
    if (!activa) {
      showSessionModal.value = true
    }
  }, 180000) 
}

onMounted(() => {

  eventos.forEach(evt => window.addEventListener(evt, resetInactividad))
  resetInactividad()
  iniciarVerificacionSesion()
})

onBeforeUnmount(() => {

  eventos.forEach(evt => window.removeEventListener(evt, resetInactividad))
  clearTimeout(inactividadTimer)
  clearInterval(verificadorSesionTimer)
})
</script>

<template>
  <SessionModal
    v-if="showSessionModal"
    @reloginSuccess="showSessionModal = false"
    @cancel="sessionStore.cerrarSesion(); $router.push('/login')" />

  <InactivityLockModal
    v-if="showInactivityModal"
    @unlock="showInactivityModal = false"
    @cancel="sessionStore.cerrarSesion(); $router.push('/login')" />
</template>
