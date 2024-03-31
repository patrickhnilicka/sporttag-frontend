<script setup lang="ts">

import type Sporttag from '@/types/Sporttag';
import { computed, ref, watch, onBeforeMount, type Ref , inject} from 'vue'
import { useSporttagStore } from '@/stores/sporttag';

const url = inject('backendurl');
const store = useSporttagStore()

const sporttage: Ref<Sporttag[]> = ref([])

//methods
async function getSporttage() {
    var req = new XMLHttpRequest();
    req.open('GET', url + '/sporttag', true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                  sporttage.value = JSON.parse(req.response) as Sporttag[]
            } else if (req.status == 403) {
                alert('Forbidden');
            }
        }
    }
    req.send();
}

//lifecycle hooks
onBeforeMount(() => {
  getSporttage();
})

</script>

<template>
    <label>Sporttag: <select v-model="store.sporttag">
            <option disabled value="">Bitte wählen</option>
            <option v-for="s in sporttage" v-bind:key="s.id" :value="s">{{ s.bezeichnung }}</option>
          </select></label>
</template>

<style lang="scss" scoped></style>