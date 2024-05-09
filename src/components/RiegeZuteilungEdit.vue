<script setup lang="ts">
import { ref, watch, toRaw} from 'vue'
import type Riege from '@/customtypes/Riege';
import type Riegenzuteilung from '@/customtypes/Riegenzuteilung';

export interface Props {
  riegenzuteilung: Riegenzuteilung,
  show?: boolean,
  riegen?: Riege[]
}

const props = defineProps<Props>()

const emit = defineEmits({
  saveRiegenzuteilung: null,
  abortEdit: null
})

//data 
const riegenzuteilungEdit = ref(props.riegenzuteilung)

//watchers
watch(props, 
() => {riegenzuteilungEdit.value = structuredClone(toRaw(props.riegenzuteilung))})
//methods
function handleSave() {
      console.log("Updating..")
      emit("saveRiegenzuteilung", riegenzuteilungEdit.value)
      emit("abortEdit")
    }
</script>

<template>

<!-- Modal -->
<div class="modal fade" id="riegenzuteilungEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Riegenzuteilung bearbeiten</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
        <label>{{riegenzuteilungEdit.name}}, {{ riegenzuteilungEdit.sportklasse }}: <select v-model="riegenzuteilungEdit.riegeId">
            <option disabled value="">Bitte wählen</option>
            <option v-for="s in props.riegen" v-bind:key="s.id" :value="s.id">{{ s.name }}</option>
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