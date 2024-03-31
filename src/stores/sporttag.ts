import type Sporttag from '@/types/Sporttag'
import { defineStore } from 'pinia'
import {ref, type Ref} from 'vue';

export const useSporttagStore = defineStore('sporttag', () => {
    const sporttag : Ref<Sporttag> = ref({id: 0, datum: new Date(), bezeichnung: ''})

    function loadSporttag() {
      try {
        console.log(localStorage.getItem('token'))
        return fetch('http://127.0.0.1:8081' + "/currentsporttag", { 'Authorization': 'Bearer ' + localStorage.getItem('token'),'Accept': 'application/json' })
        .then(response => response.json())
        .then(data => {
          sporttag.value = data
          console.log("Data fetched in store: " + data)
        })
        .catch(error => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    }
    loadSporttag()
    return {sporttag}
  })