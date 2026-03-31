import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia} from 'pinia'
import router from './router'
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia).mount('#app')