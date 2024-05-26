import Keycloak from 'keycloak-js'
import type { KeycloakOnLoad } from 'keycloak-js'

export function logout() {
    const url = import.meta.env.MODE=='production'?'https://login.sporttagimlee.ch':'http://localhost:8080';
    const initOptions = {
    url: url, realm: 'sporttag', clientId: 'sporttag-client', onLoad: 'login-required'
    }
  const keycloak = new Keycloak(initOptions);
  console.log(initOptions);
  keycloak.init({ onLoad: initOptions.onLoad as KeycloakOnLoad });
  const redirectUri = import.meta.env.LOGOUT_REDIRECT_URL;
  const logoutOptions = { redirectUri : redirectUri };
        console.log("--> log: logoutOptions  ", logoutOptions  );
            
        keycloak.logout(logoutOptions).then((success) => {
              console.log("--> log: logout success ", success );
              localStorage.removeItem('token');
        }).catch((error) => {
              console.log("--> log: logout error ", error );
        });
}