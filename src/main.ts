import './assets/main.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Password from 'primevue/password';

import 'primeflex/primeflex.css';
import '@primeuix/themes/aura/';
         

const app = createApp(App);
app.use(PrimeVue,{
    theme:{
        preset:Aura,
        options: {
         darkModeSelector: false || 'none',
        }
    },
});
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Form', Form);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Password', Password);
app.use(router)
app.use(createPinia())
app.mount("#app");
