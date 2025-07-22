import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/store/sessionStore';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/macroprocesos',
    name: 'macroprocesos',
    component: () => import('@/pages/macroprocesos/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue')
  },


  
  {
    path: '/AuraF',
    name: 'AuraF',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore();
  sessionStore.cargarSesion();
  if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
    next('/login'); 
  } else {
    next();
  }
});

export default router