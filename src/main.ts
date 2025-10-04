import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from "./router/index"
import { createPinia } from 'pinia'
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

const pinia = createPinia()

const app = createApp(App)
app.use(ToastService);
app.use(ConfirmationService);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.use(router)
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark'
        }
    }
});
app.mount('#app')
