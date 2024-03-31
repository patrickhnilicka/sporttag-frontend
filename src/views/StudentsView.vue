<script setup lang="ts">
import type Student from '@/types/Student';
import StudentEdit from '../components/StudentEdit.vue';
import { computed, ref, watch, onMounted, type Ref , inject} from 'vue'
import { useSporttagStore } from '@/stores/sporttag';
import type Sportklasse from "@/types/Sportklasse";
import { storeToRefs } from 'pinia'
import { datereviver, formatDate } from '@/js/utils'

const url = inject('backendurl');

// data
const students: Ref<Student[]> = ref([])
const prefix = ref('')
const student: Ref<Student> = ref({ id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' })
const { sporttag } = storeToRefs(useSporttagStore())
const sportklassen: Ref<Sportklasse[]> = ref([])

// watchers
watch(sporttag, () => {getStudents()})

// computed
const filteredStudents = computed(() => {
  return students.value.filter((n: Student) => { return n.nachname.toLowerCase().startsWith(prefix.value.toLowerCase()) || n.vorname.toLowerCase().startsWith(prefix.value.toLowerCase()) })
})

//lifecycle hooks
onMounted(() => {
  getStudents()
})

//methods
async function getStudents() {
  if(sporttag.value.id == undefined) {
      return
    }
  try {
    const sporttagid = sporttag.value.id
    console.log("getStudents():" + sporttag.value.bezeichnung)
    const fetchurl = url + "/students/" + sporttagid 
    let response = await fetch(fetchurl)
    let newstudents = await response.json()
    students.value = newstudents
    console.log(newstudents)
  } catch (error) {
    console.log(error)
  }
}

async function getSportklassen(){
  try {
    const sporttagid = sporttag.value.id
    const fetchurl = url + "/sportklassen/" + sporttagid 
    let response = await fetch(fetchurl)
    sportklassen.value = await response.json()
    console.log(students)
  } catch (error) {
    console.log(error)
  }
}

async function saveStudent(student: Student) {
  try {
    await fetch(url + "/student", {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    getStudents()
  }
  catch (error) {
    console.log(error)
  }
}

function create() {
  student.value = { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' }
}

function edit(studentEdit: Student) {
  console.log("edit")
  getSportklassen()
  student.value = studentEdit
}

async function del(id: Number) {
  try {
    await fetch(url + "/student/" + id, {
      method: "DELETE",
    })
  }
  catch (error) {
    console.log(error)
  }
  getStudents()
}

function updateStudent(uStudent: Student) {
  console.log("Update Student:")
  console.log(uStudent)
  saveStudent(uStudent)
}

function getDisplayName(student: Student) {
  return student.vorname + ' ' + student.nachname
}
</script>

<template>
  <div class="container">
    <div id="studentlist">
      <div>
        <input v-model="prefix" placeholder="Vor- oder Nachnamen filtern" />
      </div>
      <div class="custom-scrollbar">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Geschlecht</th>
            <th>Geburtstag</th>
            <th>Sportklasse</th>
            <th>Bearbeiten</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in filteredStudents" v-bind:key="s.id.toString">
            <td>{{ s.vorname }}</td>
            <td>{{ s.nachname }}</td>
            <td>{{ s.geschlecht }}</td>
            <!--td>{{ formatDate(s.geburtsdatum) }}</td-->
            <td>{{ formatDate(s.geburtsdatum) }}</td>
            <td>{{ s.sportklasse }}</td>
            <td><button @click="edit(s)" type="button" class="btn btn-link" data-bs-toggle="modal"
                data-bs-target="#studentEditModal"><i class="bi bi-pencil-square" style="color: green"></i></button>
                <button type="button" class="btn btn-link"
                @click="del(s.id)"><i class="bi bi-trash" style="color: red"></i></button></td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>

  <StudentEdit :student="student" :sportklassen="sportklassen" @save-student="saveStudent" />
</template>

<style lang="scss" scoped>
.custom-scrollbar {
position: relative;
height: max-content;
overflow: auto;
}
</style>