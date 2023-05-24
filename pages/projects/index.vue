<template>
  <div class="row">
    <div class="col-md-10 col-sm-10 col-lg-10 col-xl-8">
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header d-flex justify-content-between">
            <span class="text-uppercase pt-2">Projects</span>
            <el-button
              class="button"
              type="primary"
              :icon="ElIconPlus"
              @click="openCreationDialog">
              Create Project
            </el-button>
          </div>
        </template>
        <div class="text item">
          <div style="min-height: 350px; width: inherit">
            <datatable :endpoint="list_endpoint" :key="tableKey">
              <el-table-column label="Name" prop="name"/>
              <el-table-column label="Description" prop="description"/>
              <el-table-column label="Created At" prop="created_at"/>
              <template #action="scope">
                <el-button
                  size="small"
                  :icon="ElIconEdit"
                  @click="handleEdit(scope.$index, scope.row)">
                  Edit
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  :icon="ElIconDelete"
                  @click="handleDelete(scope.$index, scope.row)">
                  Delete
                </el-button>
              </template>
            </datatable>
          </div>
        </div>
      </el-card>
    </div>

    <ProjectCreateDialog
      :mode="mode"
      :project="selected_project"
      :state="isCreationDialogOpened"
      @input="v => isCreationDialogOpened = v"
      @created="handleCreatedProject"
      @updated="handleCreatedProject"
    />
  </div>
</template>

<script lang="ts" setup>

import {reactive} from "vue";
import {Project} from "~/models/project";
import {useApiUrl} from "~/composables/url";
import {xhrDelete} from "~/helpers/xhr";

let mode = ref('create');
let tableKey = ref(Date.now())
let selected_project = reactive(Project.fromData({}))
let isCreationDialogOpened = ref(false)
const list_endpoint = useApiUrl('projects')

const getter = function (...x: any[]) {
  console.log(x)
}

function openCreationDialog() {
  isCreationDialogOpened.value = true
}

function handleCreatedProject(project: Project) {
  tableKey.value = Date.now()
}

function handleEdit(index: number, row: Project) {
  mode.value = 'edit'
  selected_project = row
  isCreationDialogOpened.value = true
}

function handleDelete(index: number, row: Project) {
  mode.value = 'edit'
  selected_project = row

  ElMessageBox.confirm(
    `<b>${selected_project.name}</b> will be deleted parmanently, proceed?`,
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      xhrDelete(useApiUrl(`projects/${selected_project.project_id}`))
        .then(resp => {
          ElNotification({
            title: 'Success',
            message: 'Your project has been deleted',
            type: 'success',
          })

          tableKey.value = Date.now()
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'project deletion canceled',
      })
    })
}

</script>

<style scoped>

</style>
