<script lang="ts">
import type Student from '@/types/Student'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import {Genders} from '@/types/Genders'
export default defineComponent({
  props: {
    student: Object as PropType<Student>
  },
  emits: {
    // Validate submit event
    saveStudent: (student:Student) => {
      if (!student.vorname || !student.nachname) {
        return false
      }
      return true
    },
    abortEdit: null,
    updateStudent: null
  },
  data() {
    return {
      genders: Object.keys(Genders).map((k) => [k, Genders[k]]),
      studentlocal: this.student as Student
    }
  },
  watch: {
    student(studentlocal) {
      console.log(studentlocal)
    }
  },
  methods: {
    logstudent() {
      console.log(this.studentlocal)
    },
    handleSave() {
      console.log("Updating..")
      this.$emit("saveStudent", this.studentlocal)
    },
    handleAbort() {
      this.$emit("abortEdit")
    }
  }
})
</script>

<template>
  <div id="container">
    <label>Vorname: <input v-model="studentlocal.vorname"></label>
    <label>Nachname: <input v-model="studentlocal.nachname"></label>
    <label>Geburtstag: <input v-model="studentlocal.geburtsdatum"></label>
    <label>Geschlecht: <select v-model="studentlocal.geschlecht">
        <option v-for="gender in genders" :key="gender[0]" :value="gender[0]">{{ gender[1] }}</option>
      </select></label>
    <div class="buttons">
      <button @click="handleSave">Speichern</button>
      <button @click="handleAbort">Abbrechen</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>