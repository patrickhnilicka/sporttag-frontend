<script lang="ts">
import { defineComponent } from 'vue'
import type Student from '@/types/Student'
import type { PropType } from 'vue'
import {Genders} from '@/types/Genders'

export default defineComponent({
  name: 'StudentShow',
  props: {
    student: Object as PropType<Student>
  },
  emits: {
    edit: null
  },
  data() {
    return {
      genders: Object.keys(Genders).map((k) => [k, Genders[k]]),
    }
  },
  methods: {
    getGenderName(key?:string){
      if(key != null)
        return Genders[key]
      return ""
    }
  }
})
</script>

<template>
  <div id="container">
    <div>Vorname: {{ student?.vorname }}</div>
    <div>Nachname: {{ student?.nachname }}</div>
    <div>Geschlecht: {{ getGenderName(student?.geschlecht) }}</div>
    <div>Geburtstag: {{ student?.geburtsdatum }}</div>
    <div>
      <button @click="$emit('edit')" :disabled="student?.id == -1 || typeof student?.id === 'undefined'">Edit</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
#container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 10px;
  gap: 20px;
}
</style>