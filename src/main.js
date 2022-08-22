import { createApp } from 'vue'
import App from './App.vue'
import routes from "./routes/routes"
import './assets/scss/main.scss'
import './assets/js/main.js'
import 'aos/dist/aos.css'
import "bootstrap"


createApp(App).use(routes).mount('#app')
