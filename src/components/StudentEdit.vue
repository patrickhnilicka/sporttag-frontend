<script setup lang="ts">
import type Sportklasse from '@/types/Sportklasse';
import type Student from '@/types/Student';
import { withDefaults, ref, watch, toRaw} from 'vue'

export interface Props {
  student?: Student,
  show?: boolean,
  sportklassen?: Sportklasse[]
}

/*const props = withDefaults(defineProps<Props>(), {
  student: () => { // has to be defined by factory function
    return {id: undefined,
    vorname: '',
    nachname: '',
    geschlecht: '',
    geburtsdatum: undefined,
    klasse: '',
    sportklasse: '',
    sportklassenId: undefined,
    sportlehrerKuerzel: ''}
  },
  show: true
})*/
const props = defineProps<Props>()

const emit = defineEmits({
  saveStudent: (student: Student) => {
      if (!student.vorname || !student.nachname) {
        return false
      }
      return true
    },
  abortEdit: null,
  updateStudent: null
})

//data 
const studentEdit = ref(props.student)

//watchers
watch(props, 
() => {studentEdit.value = structuredClone(toRaw(props.student))})
//methods
function logstudent() {
      console.log("Studentlocal:" +studentEdit.value)
    }

function handleSave() {
      console.log("Updating..")
      emit("saveStudent", studentEdit.value)
      emit("abortEdit")
    }
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
        <label>Vorname: <input v-model="studentEdit.vorname"></label>
        <label>Nachname: <input v-model="studentEdit.nachname"></label>
        <label>Geburtstag: <input type="date" v-model="studentEdit.geburtsdatum"></label>
        <label>Geschlecht: <select v-model="studentEdit.geschlecht">
            <option disabled value="">Bitte wählen</option>
            <option>m</option>
            <option>w</option>
            <option>a</option>
          </select></label>
          <label>Sportklasse: <select v-model="studentEdit.sportklassenId">
            <option v-for="s in props.sportklassen" v-bind:key="s.id" :value="s.id">{{ s.klassenname }}</option>
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