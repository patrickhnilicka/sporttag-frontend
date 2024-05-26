<script setup lang="ts">
import type Riegenzuteilung from '@/customtypes/Riegenzuteilung';
import type Riege from '@/customtypes/Riege';
import RiegeZuteilungEdit from '@/components/RiegeZuteilungEdit.vue';
import { computed, ref, watch, onMounted, type Ref } from 'vue'
import { useSporttagStore } from '@/stores/sporttag';
import { storeToRefs } from 'pinia';
import * as services from '@/services/services';

// data
const riegenzuteilungen: Ref<Riegenzuteilung[]> = ref([])
const { sporttag } = storeToRefs(useSporttagStore())
const riegen: Ref<Riege[]> = ref([])
const selectedRiege: Ref<Riege> = ref({ id: -1, name: 'alle' })
const riegenzuteilungEdit: Ref<Riegenzuteilung> = ref({
    studentId: -1,
    riegeId: undefined,
    name: '',
    sportklasse: '',
    riegeNr: undefined
} as Riegenzuteilung)

// watchers
watch(sporttag, () => {
    getZuteilungen();
    getRieges();
})

// computed
const filteredZuteilungen = computed(() => {
    // select all
    if (selectedRiege.value.id === -1) {
        return riegenzuteilungen.value;
    }
    // select ohne Zuteilung
    if (selectedRiege.value.id === -2) {
        return riegenzuteilungen.value.filter((n: Riegenzuteilung) => { return n.riegeId === null })
    }
    // filter
    const zuteilungen = riegenzuteilungen.value.filter((n: Riegenzuteilung) => { return n.riegeId })
    if (zuteilungen === undefined) {
        return [];
    }
    return zuteilungen;
})

//lifecycle hooks
onMounted(() => {
    getZuteilungen()
    getRieges()
})

//methods
async function getZuteilungen() {
    console.log("lade Riegenzuteilungen")
    const sporttagid = sporttag.value.id;
    if (sporttagid == undefined) {
        return;
    }
    services.getRiegenzuteilungen(sporttagid, updateZuteilungen);
}
async function generateExcel() {
    console.log("Generate Excel");
    services.getRiegenExcel(sporttag.value.id, ()=>{});
}

function updateZuteilungen(newzuteilungen: Riegenzuteilung[]) {
    riegenzuteilungen.value = newzuteilungen;
}

async function getRieges() {
    const sporttagid = sporttag.value.id;
    if (sporttagid == undefined) {
        return;
    }
    services.getRieges(sporttagid, updateRieges);
}

function updateRieges(newrieges: Riege[]) {
    riegen.value = newrieges;
}

function editRiegenzuteilung(riegenzuteilung: Riegenzuteilung) {
    riegenzuteilungEdit.value = riegenzuteilung;
}

function saveRiegenzuteilung(riegenzuteilung: Riegenzuteilung) {
    console.log(riegenzuteilung);
    services.saveRiegenzuteilung(riegenzuteilung, sporttag.value.id, getZuteilungen);
}

</script>

<template>
    <div class="row">
        <div class="col-6">
            <label>Riege: <select v-model="selectedRiege">
                    <option v-bind:key="-1" :value="{ id: -1, name: '' }">alle</option>
                    <option v-bind:key="-2" :value="{ id: -2, name: '' }">ohne Zuteilung</option>
                    <option v-for="r in riegen" v-bind:key="r.id" :value="r">{{ r.name }}</option>
                </select>
            </label>
        </div>
        <div class="col-6">
            <button type="button" class="btn btn-success"
                @click="generateExcel">Generiere Riegenexcel</button>
        </div>
    </div>

    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Sportklasse</th>
                <th>Riege</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="s in filteredZuteilungen" v-bind:key="s.studentId">
                <td>{{ s.name }}</td>
                <td>{{ s.sportklasse }}</td>
                <td>{{ s.riegeNr }}</td>
                <td><button @click="editRiegenzuteilung(s)" type="button" class="btn btn-link" data-bs-toggle="modal"
                        data-bs-target="#riegenzuteilungEditModal"><i class="bi bi-pencil-square"
                            style="color: green"></i></button>
                </td>
            </tr>
        </tbody>
    </table>

    <RiegeZuteilungEdit :riegenzuteilung="riegenzuteilungEdit" :riegen="riegen"
        @save-riegenzuteilung="saveRiegenzuteilung" />
</template>

<style lang="scss" scoped>
.custom-scrollbar {
    position: relative;
    height: max-content;
    overflow: auto;
}
</style>