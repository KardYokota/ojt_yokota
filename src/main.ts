import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.ts'

// piniaの初期化
const pinia = createPinia()

//プラグインの設定
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
