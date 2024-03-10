<script lang="ts">
import type Student from '@/types/Student'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  props: {
    student: Object as PropType<Student>,
    show: Boolean
  },
  emits: {
    // Validate submit event
    saveStudent: (student: Student) => {
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
      id: -1 as Number,
      vorname: '',
      nachname: '',
      geschlecht: '',
      geburtsdatum: new Date(),
      klasse: ''
    }
  },
  watch: {
    student(student: Student) {
      this.id = student.id
      this.vorname = student.vorname
      this.nachname = student.nachname
      this.geschlecht = student.geschlecht
      this.geburtsdatum = student.geburtsdatum
      this.klasse = student.klasse
      console.log(student.geschlecht)
    }
  },

  methods: {
    logstudent() {
      console.log("Studentlocal:" + this.nachname)
    },
    handleSave() {
      console.log("Updating..")
      this.$emit("saveStudent", { id: this.id, vorname: this.vorname, nachname: this.nachname, geschlecht: this.geschlecht, geburtsdatum: this.geburtsdatum, klasse: this.klasse } as Student)
      this.$emit("abortEdit")
    }
  },
  mounted() {

  }
})
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal">
      <div class="modal-container">
        <label>Vorname: <input v-model="vorname"></label>
        <label>Nachname: <input v-model="nachname"></label>
        <label>Geburtstag: <input v-model="geburtsdatum"></label>
        <label>Geschlecht: <select v-model="geschlecht">
            <option disabled value="">Bitte wählen</option>
            <option>m</option>
            <option>f</option>
            <option>a</option>
          </select></label>
        <div class="buttons">
          <button @click="handleSave">Speichern</button>
          <button @click="$emit('abortEdit')">Abbrechen</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>