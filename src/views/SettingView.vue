<script setup lang="ts">

import type Sporttag from '@/types/Sporttag';
import { computed, ref, watch, onBeforeMount, type Ref , inject} from 'vue'
import { useSporttagStore } from '@/stores/sporttag';
import { getSporttage } from '../services/services';

const store = useSporttagStore()

const sporttage: Ref<Sporttag[]> = ref([])

//lifecycle hooks
onBeforeMount(() => {
  getSporttage((st: Sporttag[])=> {
    sporttage.value = st;
  });
})

</script>

<template>
    <label>Sporttag: <select v-model="store.sporttag">
            <option disabled value="">Bitte wählen</option>
            <option v-for="s in sporttage" v-bind:key="s.id" :value="s">{{ s.bezeichnung }}</option>
          </select></label>
</template>

<style lang="scss" scoped></style>../services/services