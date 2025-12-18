import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import intersect from './directives/intersect'

if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init('7e1beebb63bdf07979bb3578a4101369'); // 🔐 JS 키
}

const app = createApp(App)

app.directive('intersect', intersect)

app.mount('#app')