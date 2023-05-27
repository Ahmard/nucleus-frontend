<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-11 col-xl-11">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Budgets</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="mb-5">
          <div v-if="!is_aggregates_ready" class="p-5" v-loading="!is_aggregates_ready"></div>
          <Aggregate
            v-if="is_aggregates_ready"
            :stats="aggregates"
            :key="aggregate_key"
          />
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase pt-2">Budgets</span>
              <el-button
                class="button"
                type="primary"
                :icon="ElIconPlus"
                @click="openCreationDialog">
                Create Budget
              </el-button>
            </div>
          </template>
          <div class="text item">
            <div style="min-height: 200px; width: inherit">
              <ListTable
                :key="table_key"
                @start_edit="on_start_edit"
              />
            </div>
          </div>
        </el-card>
      </div>

      <BudgetCreateDialog
        :mode="mode"
        :budget="selected_budget"
        :state="isCreationDialogOpened"
        @input="v => isCreationDialogOpened = v"
        @created="handleCreatedBudget"
        @updated="handleCreatedBudget"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {Budget} from "~/models/budget";
import {reactive} from "vue";
import ListTable from "~/components/Budget/ListTable.vue";
import {xhrGet} from "~/helpers/xhr";
import {LooseObject} from "~/types/loose.object";
import Aggregate from "~/components/Budget/Aggregate.vue";

let mode = ref('create');
let isCreationDialogOpened = ref(false)
let table_key = ref('budgets-' + Date.now())
let selected_budget = reactive(Budget.fromData({}))

let is_aggregates_ready = ref(false)
let is_fetching_aggregates = ref(true)
let aggregates: LooseObject = reactive({})
let aggregate_key = ref('aggregate-' + Date.now())

definePageMeta({
  middleware: 'auth'
})

function openCreationDialog() {
  isCreationDialogOpened.value = true
}

function handleCreatedBudget(budget: Budget) {
  table_key.value = 'budgets-' + Date.now()
  // aggregate_key.value = 'aggregate-' + Date.now()

  // fetch_aggregates()
}

function on_start_edit(budget: Budget) {
  mode.value = 'edit'
  selected_budget = budget
  isCreationDialogOpened.value = true
}

function fetch_aggregates() {
  is_aggregates_ready.value = false

  xhrGet(useApiUrl('budgets/aggregates'))
    .then(resp => {
      // aggregates = Budget.format_aggregate(resp.data)
      is_aggregates_ready.value = true
    })
    .finally(() => is_fetching_aggregates.value = false)
}

// fetch_aggregates()
</script>

<style scoped>

</style>
