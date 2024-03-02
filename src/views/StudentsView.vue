
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
      student: { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date()} as Student,
      isEdit: false
    }
  },
  beforeMount() {
    this.getStudents();
  },
  computed: {
    filteredStudents() {
      return this.students.filter((n) =>
        n.nachname.toLowerCase().startsWith(this.prefix.toLowerCase())
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
    async saveStudent(student:Student) {
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
      this.student = { id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: new Date()}
      this.isEdit = true
    },
    edit() {
      this.isEdit = true
    },
    del() {
      if (this.student.id != -1) {
        this.students = this.students.filter(p => p.id != this.student.id)
        this.student = this.students[0]
      }
    },
    hasValidInput() {
      return this.student.vorname.trim() && this.student.nachname.trim()
    },
    updateStudent(uStudent:Student) {
      console.log("Update Student:")
      console.log(uStudent)
      this.saveStudent(uStudent)
      this.isEdit = false
    },
    abortEdit() {
      this.isEdit = false
    },
    getDisplayName(student:Student) {
      return student.vorname + ' ' + student.nachname
    }
  }
})
</script>

<template>
  <div class="container">
    <div id="studentlist">
      <div>
        <input v-model="prefix" placeholder="Filter prefix" :disabled="isEdit">
      </div>
      <div>
        <select size="5" v-model="student" :disabled="isEdit">
          <option v-for="student in filteredStudents" :key="student.id.toString" :value="student">{{ getDisplayName(student) }}</option>
        </select>
      </div>
    </div>
    <div id="student">
      <StudentShow v-if="!isEdit" :student="student" @edit="edit" />
      <StudentEdit v-else :student="student" @save-student="updateStudent" @abort-edit="abortEdit" />
      <div class="buttons">
        <button @click="create" v-if="!isEdit">New</button>
        <button @click="del" v-if="!isEdit">Delete</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>