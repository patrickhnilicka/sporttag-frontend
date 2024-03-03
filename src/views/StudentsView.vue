<script lang="ts">
import StudentShow from '../components/StudentShow.vue';
import StudentEdit from '../components/StudentEdit.vue';
import { defineComponent } from 'vue';
import type Student from './../types/Student';
const url = "http://127.0.0.1:8080";
export default defineComponent({
  name: 'StudentsView',
  components: {
    StudentShow,
    StudentEdit
  },
  data() {
    return {
      students: [] as Student[],
      prefix: '',
      student: { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date() } as Student,
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
    }
  },
  methods: {
    async getStudents() {
      try {
        let response = await fetch(url + "/student")
        this.students = await response.json()
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
      }
      catch (error) {
        console.log(error)
      }
      this.student = student
    },
    create() {
      this.student = { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date() }
      this.isEdit = true
    },
    edit() {
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
    hasValidInput() {
      return this.student.vorname.trim() && this.student.nachname.trim()
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
        <input v-model="prefix" placeholder="Vor- oder Nachnamen filtern" :disabled="isEdit">
      </div>
      <div>
        <table width="100%">
          <tr align="left">
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
            <td>Sportklasse</td>
            <td><span class="material-symbols-outlined">edit</span><button @click="del(s.id)" v-if="!isEdit"><span class="material-symbols-outlined">delete</span></button></td>
          </tr>
        </table>
      </div>
      <!--div>
        <select size="5" v-model="student" :disabled="isEdit">
          <option v-for="student in filteredStudents" :key="student.id.toString" :value="student">{{ getDisplayName(student) }}</option>
        </select>
      </div-->
    </div>
    <div id="student">
      <StudentShow v-if="!isEdit" :student="student" @edit="edit" />
      <StudentEdit v-else :student="student" @save-student="updateStudent" @abort-edit="abortEdit" />
      <div class="buttons">
        <button @click="create" v-if="!isEdit">New</button>
        <!--button @click="del({{ s.id }})" v-if="!isEdit">Delete</button-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
tr:nth-child(even) {background-color: #f2f2f2;}
th {
  background-color: rgb(35 158 221);
  color: white;
}
</style>