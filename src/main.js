import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './register/components';
import './package';

const app = createApp(App)

app.use(store).use(router).use(components).mount('#app')
