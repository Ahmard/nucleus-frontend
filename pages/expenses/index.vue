<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-11 col-xl-11">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Expenses</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="mb-5">
          <div v-if="!is_aggregates_ready" class="p-5" v-loading="!is_aggregates_ready"></div>
          <ExpenseAggregate
            v-if="is_aggregates_ready"
            :stats="aggregates"
            :key="aggregate_key"
          />
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase pt-2">Expenses</span>
              <el-button
                class="button"
                type="primary"
                :icon="ElIconPlus"
                @click="openCreationDialog">
                Create Expense
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

      <CreateDialog
        :mode="mode"
        :expense="selected_expense"
        :state="isCreationDialogOpened"
        @input="v => isCreationDialogOpened = v"
        @created="handleCreatedExpense"
        @updated="handleCreatedExpense"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {Expense} from "~/models/expense";
import {reactive} from "vue";
import ListTable from "~/components/Expense/ListTable.vue";
import CreateDialog from "~/components/Expense/CreateDialog.vue";
import {xhrGet} from "~/helpers/xhr";
import {LooseObject} from "~/types/loose.object";

let mode = ref('create');
let isCreationDialogOpened = ref(false)
let table_key = ref('expenses-' + Date.now())
let selected_expense = reactive(Expense.fromData({}))

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

function handleCreatedExpense(expense: Expense) {
  table_key.value = 'expenses-' + Date.now()
  // aggregate_key.value = 'aggregate-' + Date.now()

  fetch_aggregates()
}

function on_start_edit(expense: Expense) {
  console.log(expense)
  mode.value = 'edit'
  selected_expense = expense
  isCreationDialogOpened.value = true
}

function fetch_aggregates() {
  is_aggregates_ready.value = false

  xhrGet(useApiUrl('expenses/aggregates'))
    .then(resp => {
      aggregates = Expense.format_aggregate(resp.data)
      is_aggregates_ready.value = true
    })
    .finally(() => is_fetching_aggregates.value = false)
}

fetch_aggregates()
</script>

<style scoped>

</style>
