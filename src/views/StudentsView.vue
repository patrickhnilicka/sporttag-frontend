<script setup lang="ts">
import type Student from '@/types/Student';
import StudentEdit from '../components/StudentEdit.vue';
import { computed, ref, watch, onBeforeMount, type Ref } from 'vue'
const url = "http://127.0.0.1:8080";

// data
const students: Ref<Student[]> = ref([{ id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' }])
const prefix = ref('')
const student: Ref<Student> = ref({ id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' })


// computed
const filteredStudents = computed(() => {
  return students.value.filter((n: Student) => { return n.nachname.toLowerCase().startsWith(prefix.value.toLowerCase()) || n.vorname.toLowerCase().startsWith(prefix.value.toLowerCase()) })
})

//lifecycle hooks
onBeforeMount(() => {
  getStudents();
})

//watchers
watch(student,
  () => console.log(student)
)

//methods
async function getStudents() {
  try {
    let response = await fetch(url + "/student")
    students.value = await response.json()
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
      <div>
        <table class="table">
          <tr>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Geschlecht</th>
            <th>Geburtstag</th>
            <th>Sportklasse</th>
            <th>Bearbeiten</th>
          </tr>
          <tr v-for="s in filteredStudents" v-bind:key="s.id.toString">
            <td>{{ s.vorname }}</td>
            <td>{{ s.nachname }}</td>
            <td>{{ s.geschlecht }}</td>
            <td>{{ s.geburtsdatum }}</td>
            <td>{{ s.sportklasse }}</td>
            <td><button @click="edit(s)" type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#studentEditModal">Bearbeiten</button><button type="button" class="btn btn-danger"
                @click="del(s.id)">Löschen</button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <StudentEdit :student="student" @save-student="saveStudent" />
</template>

<style lang="scss" scoped></style>