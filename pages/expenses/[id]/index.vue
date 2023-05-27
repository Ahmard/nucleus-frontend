<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-7 col-xl-7">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/expenses' }">Expenses</el-breadcrumb-item>
            <el-breadcrumb-item>Info</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase">Project Information</span>
            </div>
          </template>
          <div class="text item" v-loading="is_fetching">
            <div style="min-height: 50px; width: inherit">
              <div class="list-group">
                <div class="list-item">
                  <span class="text-muted">Name: </span>
                  <span>{{ formatKobo(expense['amount']) }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Narration: </span>
                  <span>{{ expense['narration'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Project Name: </span>
                  <span>{{ project['name'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Project Description: </span>
                  <span>{{ project['description'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Created At: </span>
                  <span>{{ expense['created_at'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Last Updated At: </span>
                  <span>{{ expense['updated_at'] }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Expense} from "~/models/expense";
import {xhrGet} from "~/helpers/xhr";
import {useApiUrl} from "#imports";
import {formatKobo} from "~/helpers/monetery";
import {Project} from "~/models/project";

let is_found = ref(false)
let is_fetching = ref(true)
let is_fetching_project = ref(true)
let expense_id = useRoute().params.id
let expense = reactive(Expense.fromData({}))
let project = reactive(Project.fromData({}))

function fetch_expense() {
  xhrGet(useApiUrl(`expenses/${expense_id}`))
    .then(resp => {
      expense = Expense.fromData(resp.data)
      is_found.value = true

      // xhrGet(useApiUrl(`projects/${expense.project_id}`))
      //   .then(resp => project = Project.fromData(resp.data))
      //   .finally(() => is_fetching_project.value = false)
    })
    .finally(() => is_fetching.value = false)
}

fetch_expense()
</script>

<style scoped>
</style>
