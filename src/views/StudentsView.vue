<script setup lang="ts">
import type Student from '@/customtypes/Student';
import StudentEdit from '../components/StudentEdit.vue';
import StudentExcelImport from '../components/StudentExcelImport.vue';
import { computed, ref, watch, onMounted, type Ref } from 'vue'
import { useSporttagStore } from '@/stores/sporttag';
import type Sportklasse from "@/customtypes/Sportklasse";
import { storeToRefs } from 'pinia';
import { formatDate } from '@/js/utils';
import * as services from '@/services/services';


// data
const students: Ref<Student[]> = ref([])
const prefix = ref('')
const student: Ref<Student> = ref({ id: -1, vorname: '', nachname: '', geschlecht: '', geburtsdatum: '', klasse: '', sportklasse: '', sportklassenId: 0, sportlehrerKuerzel: '' } as Student);
const { sporttag } = storeToRefs(useSporttagStore())
const sportklassen: Ref<Sportklasse[]> = ref([])

// watchers
watch(sporttag, () => { getStudents() })

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
  const sporttagid = sporttag.value.id;
  if (sporttagid == undefined) {
    return;
  }
  services.getStudents(sporttagid, (newstuds: Student[]) => {
    students.value = newstuds;
  });
}

async function getSportklassen() {
  const sporttagid = sporttag.value.id;
  if (sporttagid == undefined) {
    return;
  }
  services.getSportklassen(sporttagid, (sportkl: Sportklasse[]) => {
    sportklassen.value = sportkl;
  })
}

async function saveStudent(student: Student) {
  services.saveStudent(student, getStudents);
}

function editStudent(studentEdit: Student) {
  console.log("edit")
  getSportklassen()
  student.value = studentEdit
}

async function deleteStudent(id: number | undefined) {
  if (id == undefined) {
    return;
  }
  services.deleteStudent(id, getStudents);
}

function uploadExcel(file: File) {
  if (sporttag.value.id) {
    services.uploadExcel(file, sporttag.value.id?.toString(), getStudents);
  }
}
</script>

<template>
  <div class="container-xxl">
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-6">
              <input v-model="prefix" placeholder="Vor- oder Nachnamen filtern" />
            </div>
            <div class="col-6">
              <button type="button" data-bs-target="#studentExcelModal" class="btn btn-success"
                data-bs-toggle="modal">Schülerexcel einlesen</button>
            </div>
          </div>
        </div>
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
            <tr v-for="s in filteredStudents" v-bind:key="s.id!.toString">
              <td>{{ s.vorname }}</td>
              <td>{{ s.nachname }}</td>
              <td>{{ s.geschlecht }}</td>
              <td>{{ formatDate(s.geburtsdatum) }}</td>
              <td>{{ s.sportklasse }}</td>
              <td><button @click="editStudent(s)" type="button" class="btn btn-link" data-bs-toggle="modal"
                  data-bs-target="#studentEditModal"><i class="bi bi-pencil-square" style="color: green"></i></button>
                <button type="button" class="btn btn-link" @click="deleteStudent(s.id)"><i class="bi bi-trash"
                    style="color: red"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <StudentEdit :student="student" :sportklassen="sportklassen" @save-student="saveStudent" />
  <StudentExcelImport :sporttagid="sporttag.id" @upload-excel="uploadExcel" />
</template>

<style lang="scss" scoped>
.custom-scrollbar {
  position: relative;
  height: max-content;
  overflow: auto;
}
</style>