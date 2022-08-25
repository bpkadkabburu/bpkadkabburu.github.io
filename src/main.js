import { createApp } from 'vue'
import App from './App.vue'
import routes from "./routes/routes"
import store from './stores'
import './assets/scss/main.scss'
import './assets/js/main.js'
import 'aos/dist/aos.css'
import "bootstrap"


createApp(App).use(routes).use(store).mount('#app')
