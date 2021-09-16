import { createApp } from 'vue'
import App from './App.vue'
import routes from "./routes/routes"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App).use(routes).mount('#app')
