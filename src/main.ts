import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Keycloak from 'keycloak-js'
import type { KeycloakOnLoad } from 'keycloak-js'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const pinia = createPinia()
const app = createApp(App)
const url = import.meta.env.MODE == 'production' ? 'https://login.sporttagimlee.ch' : 'http://localhost:8080';
const initOptions = {
  url: url, realm: 'sporttag', clientId: 'sporttag-client', onLoad: 'login-required'
}
const keycloak = new Keycloak(initOptions);
console.log(initOptions);
keycloak.init({ onLoad: initOptions.onLoad as KeycloakOnLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");
    localStorage.setItem('token', keycloak.token as string)
    app.use(router)
    app.use(pinia)
    app.mount('#app')
  }
  //Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
      } else {
        let timeSkew = 0
        if (keycloak.timeSkew) {
          timeSkew = keycloak.timeSkew as number
        }
        console.log('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed?.exp as number + timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000);
  keycloak.onAuthLogout =  window.location.reload;
}).catch(() => {
  console.log("Authenticated Failed");
});