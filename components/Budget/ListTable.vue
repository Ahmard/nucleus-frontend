<template>
  <div>
    <datatable :endpoint="props.endpoint" :key="tableKey" @row-click="onRowClick">
      <el-table-column type="expand">
        <template #default="scope">
          <div class="hidden-md-and-up">
            <p class="list-item ps-3">Amount: {{ formatKobo(scope.row.amount) }}</p>
            <p class="list-item ps-3">Used Amount: {{ formatKobo(scope.row.amount_used) }}</p>
            <p class="list-item ps-3">Month: {{ getMonthName(scope.row.month - 1) }}</p>
            <p class="list-item ps-3">Year: {{ scope.row.year }}</p>
            <p class="list-item ps-3">Spent At: {{ scope.row.spent_at }}</p>
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

      <el-table-column label="Amount" prop="amount">
        <template #default="scope">{{ formatKobo(scope.row.amount) }}</template>
      </el-table-column>
      <el-table-column label="Used Amount" prop="amount_used">
        <template #default="scope">{{ formatKobo(scope.row.amount_used) }}</template>
      </el-table-column>
      <el-table-column label="Month" prop="month">
        <template #default="scope">{{ getMonthName(scope.row.month - 1) }}</template>
      </el-table-column>
      <el-table-column label="Year" prop="year" />
      <el-table-column label="Comment" prop="comment">
        <template #default="scope">{{ scope.row.comment }}</template>
      </el-table-column>
      <el-table-column label="Captured At" prop="created_at">
        <template #default="scope">{{ scope.row.created_at }}</template>
      </el-table-column>
      <template #action="scope" v-if="withActionButtons">
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
</template>

<script lang="ts" setup>
import {formatKobo} from "~/helpers/monetery";
import {useApiUrl} from "~/composables/url";
import {Budget} from "~/models/budget";
import {xhrDelete} from "~/helpers/xhr";
import {reactive} from "vue";
import {getMonthName} from "~/helpers/date_time";

const emit = defineEmits(['start_edit', 'start_create'])
const props = defineProps({
  withActionButtons: {type: Boolean, default: true},
  endpoint: {type: String, default: useApiUrl('budgets')},
})

let mode = ref('create');
let tableKey = ref('budgets-' + Date.now())
let selected_budget = reactive(Budget.fromData({}))

function handleEdit(index: number, row: Budget) {
  mode.value = 'edit'
  selected_budget = row

  emit('start_edit', row)
}

function onRowClick(data: Budget) {
  useRouter().push(`/budgets/${data.budget_id}`)
}

function handleDelete(index: number, row: Budget) {
  mode.value = 'edit'
  selected_budget = row

  ElMessageBox.confirm(
    `<b>${getMonthName(selected_budget.month)} - ${selected_budget.year} budget</b> will be deleted parmanently, proceed?`,
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      console.log('Hello')
      xhrDelete(useApiUrl(`budgets/${selected_budget.budget_id}`))
        .then(resp => {
          ElNotification({
            title: 'Success',
            message: 'Your budget has been deleted',
            type: 'success',
          })

          tableKey.value = 'budgets-' + Date.now()
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'budget deletion canceled',
      })
    })
}

</script>

<style scoped>

</style>
