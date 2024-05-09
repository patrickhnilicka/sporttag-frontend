<script setup lang="ts">

defineProps({
    sporttagid: Number
})

const emit = defineEmits({
  uploadExcel: (file: File) => {
      if (!file) {
        return false
      }
      return true
    }
})

//data 

//watchers

//methods
function handleUploadExcel(){
    const inputElement = document.getElementById("formFile")! as HTMLInputElement;
    const files = inputElement.files as FileList|null;
    if(files !== null){
        emit("uploadExcel", files[0])
    }
}
</script>

<template>

    <!-- Modal -->
    <div class="modal fade" id="studentExcelModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel" accept=".xlsx">Exceldaten einlesen</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="formFile" class="form-label">Bitte Excel auswählen</label>
                    <input class="form-control" type="file" id="formFile">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleUploadExcel">Hochladen</button>
                </div>
            </div>
        </div>
    </div>


</template>


<style lang="scss" scoped></style>