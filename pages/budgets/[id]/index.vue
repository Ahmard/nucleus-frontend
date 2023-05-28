<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10 col-sm-10 col-lg-5 col-xl-5">
        <div class="mt-3 mb-4">
          <el-breadcrumb :separator-icon="ElIconArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/budgets' }">Budgets</el-breadcrumb-item>
            <el-breadcrumb-item>Info</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase">Budget Information</span>
            </div>
          </template>
          <div class="text item" v-loading="is_fetching">
            <div style="min-height: 50px; width: inherit">
              <div class="list-group">
                <div class="list-item">
                  <span class="text-muted">Amount: </span>
                  <span>{{ formatKobo(budget['amount']) }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Amount Used: </span>
                  <span>{{ formatKobo(budget['amount_used']) }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Amount Remaining: </span>
                  <span>{{ formatKobo(budget['amount'] - budget['amount_used']) }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Title: </span>
                  <span>{{ budget['title'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Description: </span>
                  <span>{{ budget['description'] ?? 'N/A' }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Created At: </span>
                  <span>{{ budget['created_at'] }}</span>
                </div>
                <div class="list-item">
                  <span class="text-muted">Last Updated At: </span>
                  <span>{{ budget['updated_at'] }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="row mt-3" v-if="is_found">
      <div class="col-11">

        <el-card class="shadow-sm" shadow="never">
          <template #header>
            <div class="card-header d-flex justify-content-between">
              <span class="text-uppercase">Budget Expenses</span>
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
import {Budget} from "~/models/budget";
import {xhrGet} from "~/helpers/xhr";
import {useApiUrl} from "#imports";
import {formatKobo} from "~/helpers/monetery";
import ListTable from "~/components/Expense/ListTable.vue";

let is_found = ref(false)
let is_fetching = ref(true)
let budget_id = useRoute().params.id
let budget = reactive(Budget.fromData({}))
let list_endpoint = useApiUrl(`budgets/${budget_id}/expenses`)

function fetch_budget() {
  xhrGet(useApiUrl(`budgets/${budget_id}`))
    .then(resp => {
      budget = Budget.fromData(resp.data)
      is_found.value = true
    })
    .finally(() => is_fetching.value = false)
}

fetch_budget()
</script>

<style scoped>
</style>
