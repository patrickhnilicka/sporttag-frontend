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

<!-- Modal -->
<div class="modal fade" id="studentEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Schüler bearbeiten</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <label>Vorname: <input v-model="vorname"></label>
        <label>Nachname: <input v-model="nachname"></label>
        <label>Geburtstag: <input v-model="geburtsdatum"></label>
        <label>Geschlecht: <select v-model="geschlecht">
            <option disabled value="">Bitte wählen</option>
            <option>m</option>
            <option>f</option>
            <option>a</option>
          </select></label>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSave">Save changes</button>
      </div>
    </div>
  </div>
</div>

  
</template>


<style lang="scss" scoped></style>