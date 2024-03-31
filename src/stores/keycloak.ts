import { defineStore } from 'pinia'
import {ref, type Ref} from 'vue';

export const useKeycloakStore = defineStore('keycloak', () => {
    const token : Ref<string> = ref('')
})