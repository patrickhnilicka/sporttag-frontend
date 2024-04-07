import type Sporttag from '@/types/Sporttag'
import { defineStore } from 'pinia'
import {ref, type Ref} from 'vue';
import { getCurrentSporttag } from '@/services/services';

export const useSporttagStore = defineStore('sporttag', () => {
    const sporttag : Ref<Sporttag> = ref({id: 0, datum: new Date(), bezeichnung: ''})

    function loadSporttag() {
      getCurrentSporttag((st:Sporttag) =>{
        sporttag.value = st;
        console.log("Data fetched in store: " + st);
      })
    }
    loadSporttag();
    return {sporttag}
  })