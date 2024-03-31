import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Keycloak from 'keycloak-js'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { useKeycloakStore } from './stores/keycloak'

const pinia = createPinia()
const app = createApp(App)

let initOptions = {
    url: 'http://localhost:8080', realm: 'sporttag', clientId: 'test-client', onLoad: 'login-required'
    }
  let keycloak = new Keycloak(initOptions);
  keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");
        localStorage.setItem('token', keycloak.token)
      app.use(router)
app.use(pinia)

app.mount('#app')

app.provide('backendurl', 'http://127.0.0.1:8081')
    }
//Token Refresh
setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        console.log('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000)
}).catch(() => {
  console.log("Authenticated Failed");
});