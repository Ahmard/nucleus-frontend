<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-7 col-xl-5">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/projects' }">Projects</el-breadcrumb-item>
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
                  <span>{{ project['name'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Description: </span>
                  <span>{{ project['description'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Created At: </span>
                  <span>{{ project['created_at'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Last Updated At: </span>
                  <span>{{ project['updated_at'] }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="col-xl-7 mt-xl-5">

        <div class="mb-5 pt-xl-2">
          <div v-if="!is_aggregates_ready" class="p-5" v-loading="!is_aggregates_ready"></div>
          <ExpenseAggregate
            v-if="is_aggregates_ready"
            :stats="aggregates"
            :col-md="10"
            :force-resize="true"
            :key="aggregate_key"
          />
        </div>

      </div>
    </div>

    <div class="row mt-3" v-if="is_found">
      <div class="col-11">

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase">Project Expenses</span>
            </div>
          </template>
          <div class="text item hide-btn-icon">
            <ListTable
              :endpoint="list_endpoint"
              :with-action-buttons="false"
            />
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
import ListTable from "~/components/Expense/ListTable.vue";
import {LooseObject} from "~/types/loose.object";

let is_found = ref(false)
let is_fetching = ref(true)
let project_id = useRoute().params.id
let project = reactive(Expense.fromData({}))
let list_endpoint = useApiUrl(`projects/${project_id}/expenses`)

let is_aggregates_ready = ref(false)
let is_fetching_aggregates = ref(true)
let aggregates: LooseObject = reactive({})
let aggregate_key = ref('aggregate-' + Date.now())

function fetch_project() {
  xhrGet(useApiUrl(`projects/${project_id}`))
    .then(resp => {
      project = Expense.fromData(resp.data)
      is_found.value = true
    })
    .finally(() => is_fetching.value = false)
}

function fetch_aggregates() {
  is_aggregates_ready.value = false

  xhrGet(useApiUrl(`projects/${project_id}/aggregates`))
    .then(resp => {
      aggregates = Expense.format_aggregate(resp.data)
      is_aggregates_ready.value = true
    })
    .finally(() => is_fetching_aggregates.value = false)
}

fetch_project()
fetch_aggregates()
</script>

<style scoped>
.list-item {
  padding: 13px;
}
</style>
