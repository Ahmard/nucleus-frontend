<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-10 col-xl-9">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Projects</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

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
            <div style="min-height: 200px; width: inherit">
              <datatable :endpoint="list_endpoint" :key="tableKey" @row-click="onRowClick">
                <el-table-column type="expand">
                  <template #default="scope">
                    <div class="hidden-md-and-up">
                      <p class="list-item ps-3">Name: {{ scope.row.name }}</p>
                      <p class="list-item ps-3">Description: {{ scope.row.description }}</p>
                      <p class="list-item ps-3">Created At: {{ scope.row.created_at }}</p>
                      <div class="ps-3">
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
                      </div>
                    </div>
                  </template>
                </el-table-column>

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
  </div>
</template>

<script lang="ts" setup>

import {reactive} from "vue";
import {Project} from "~/models/project";
import {useApiUrl} from "~/composables/url";
import {xhrDelete} from "~/helpers/xhr";
import {Expense} from "~/models/expense";
import {formatKobo} from "~/helpers/monetery";
import {getMonthName} from "~/helpers/date_time";

let mode = ref('create');
let tableKey = ref(Date.now())
let selected_project = reactive(Project.fromData({}))
let isCreationDialogOpened = ref(false)
const list_endpoint = useApiUrl('projects')

definePageMeta({
  middleware: 'auth'
})

function onRowClick(data: Project) {
  useRouter().push(`/projects/${data.project_id}`)
}

function openCreationDialog() {
  isCreationDialogOpened.value = true
  mode.value = 'create'
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
