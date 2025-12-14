import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import intersect from './directives/intersect'

const app = createApp(App)

app.directive('intersect', intersect)

app.mount('#app')