<script lang="ts">
import StudentEdit from '../components/StudentEdit.vue';
import { defineComponent } from 'vue';
import type Student from './../types/Student';
const url = "http://127.0.0.1:8080";
export default defineComponent({
  name: 'StudentsView',
  components: {
    StudentEdit
  },
  data() {
    return {
      students: [] as Student[],
      prefix: '',
      student: { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '',  sportklassenId: 0, sportlehrerKuerzel: ''} as Student,
      isEdit: false
    }
  },
  beforeMount() {
    this.getStudents();
  },
  computed: {
    filteredStudents() {
      return this.students.filter((n) => { return n.nachname.toLowerCase().startsWith(this.prefix.toLowerCase()) || n.vorname.toLowerCase().startsWith(this.prefix.toLowerCase()) }
      )
    }
  },
  watch: {
    student(student) {
      console.log(student)
    },
    students(student) {
      console.log(student)
    }
  },
  methods: {
    async getStudents() {
      try {
        let response = await fetch(url + "/student")
        this.students = await response.json()
        console.log(this.students)
      } catch (error) {
        console.log(error)
      }
    },
    async saveStudent(student: Student) {
      try {
        await fetch(url + "/student", {
          method: "POST",
          body: JSON.stringify(student),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        this.getStudents()
      }
      catch (error) {
        console.log(error)
      }
    },
    create() {
      this.student = { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date(), klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' }
      this.isEdit = true
    },
    edit(student: Student) {
      console.log("edit")
      this.student = student
      this.isEdit = true
    },
    async del(id: Number) {
      try {
        await fetch(url + "/student/" + id, {
          method: "DELETE",
        })
      }
      catch (error) {
        console.log(error)
      }
      this.getStudents()
    },
    updateStudent(uStudent: Student) {
      console.log("Update Student:")
      console.log(uStudent)
      this.saveStudent(uStudent)
      this.isEdit = false
    },
    abortEdit() {
      this.isEdit = false
    },
    getDisplayName(student: Student) {
      return student.vorname + ' ' + student.nachname
    }
  }
})
</script>

<template>
  <div class="container">
    <div id="studentlist">
      <div>
        <input v-model="prefix" placeholder="Vor- oder Nachnamen filtern" :disabled="isEdit"/>
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
            <td><button @click="edit(s)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentEditModal">Bearbeiten</button><button type="button" class="btn btn-danger" @click="del(s.id)">Löschen</button></td>
          </tr>
        </table>
      </div>
      <!--div>
        <select size="5" v-model="student" :disabled="isEdit">
          <option v-for="student in filteredStudents" :key="student.id.toString" :value="student">{{ getDisplayName(student) }}</option>
        </select>
      </div-->
    </div>
  </div>

  <StudentEdit :show="isEdit" :student="student" @abort-edit="isEdit = false" @save-student="saveStudent"/>
</template>

<style lang="scss" scoped>
</style>