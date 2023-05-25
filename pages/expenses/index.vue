<template>
  <div class="row">
    <div class="col-md-10 col-sm-10 col-lg-10 col-xl-9">
      <el-card class="box-card" shadow="never">
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
          <div style="min-height: 350px; width: inherit">
            <datatable :endpoint="list_endpoint" :key="tableKey">
              <el-table-column label="Amount" prop="amount">
                <template #default="scope">{{ formatKobo(scope.row[0].amount) }}</template>
              </el-table-column>
              <el-table-column label="Narration" prop="narration">
                <template #default="scope">{{ scope.row[0].narration }}</template>
              </el-table-column>
              <el-table-column label="Project" prop="name">
                <template #default="scope">
                  <nuxt-link :to="`/projects/${scope.row[1].project_id}`">
                    {{ scope.row[1].name }}
                  </nuxt-link>
                </template>
              </el-table-column>
              <el-table-column label="Spent At" prop="spent_at">
                <template #default="scope">{{ scope.row[0].spent_at }}</template>
              </el-table-column>
              <el-table-column label="Captured At" prop="created_at">
                <template #default="scope">{{ scope.row[0].created_at }}</template>
              </el-table-column>
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

    <ExpenseCreateDialog
      :mode="mode"
      :expense="selected_expense"
      :state="isCreationDialogOpened"
      @input="v => isCreationDialogOpened = v"
      @created="handleCreatedExpense"
      @updated="handleCreatedExpense"
    />
  </div>
</template>

<script lang="ts" setup>

import {reactive} from "vue";
import {Expense} from "~/models/expense";
import {useApiUrl} from "~/composables/url";
import {xhrDelete} from "~/helpers/xhr";
import {formatKobo} from "~/helpers/monetery";

let mode = ref('create');
let tableKey = ref('expenses-' + Date.now())
let selected_expense = reactive(Expense.fromData({}))
let isCreationDialogOpened = ref(false)
const list_endpoint = useApiUrl('expenses')

definePageMeta({
  middleware: 'auth'
})

function openCreationDialog() {
  isCreationDialogOpened.value = true
}

function handleCreatedExpense(expense: Expense) {
  tableKey.value = 'expenses-' + Date.now()
}

function handleEdit(index: number, row: Expense) {
  mode.value = 'edit'
  selected_expense = row
  isCreationDialogOpened.value = true
}

function handleDelete(index: number, row: Expense) {
  mode.value = 'edit'
  selected_expense = row

  ElMessageBox.confirm(
    `<b>${selected_expense[0].narration}</b> will be deleted parmanently, proceed?`,
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      xhrDelete(useApiUrl(`expenses/${selected_expense[0].expense_id}`))
        .then(resp => {
          ElNotification({
            title: 'Success',
            message: 'Your expense has been deleted',
            type: 'success',
          })

          tableKey.value = Date.now()
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'expense deletion canceled',
      })
    })
}

</script>

<style scoped>

</style>
