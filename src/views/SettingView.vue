<script setup lang="ts">

import type Sporttag from '@/types/Sporttag';
import { computed, ref, watch, onBeforeMount, type Ref , inject} from 'vue'
import { useSporttagStore } from '@/stores/sporttag';

const url = inject('backendurl');
const store = useSporttagStore()

const sporttage: Ref<Sporttag[]> = ref([])

//methods
async function getSporttage() {
  try {
    let response = await fetch(url + "/sporttag")
    sporttage.value = await response.json() as Sporttag[]
    console.log(sporttage.value)
  } catch (error) {
    console.log(error)
  }
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