<template>
  <div>
    <datatable :endpoint="props.endpoint" :key="tableKey" @row-click="onRowClick">
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
import {Expense} from "~/models/expense";
import {xhrDelete} from "~/helpers/xhr";
import {reactive} from "vue";
import {Project} from "~/models/project";

const emit = defineEmits(['start_edit', 'start_create'])
const props = defineProps({
  withActionButtons: {type: Boolean, default: true},
  endpoint: {type: String, default: useApiUrl('expenses')},
})

let mode = ref('create');
let tableKey = ref('expenses-' + Date.now())
let selected_expense = reactive(Expense.fromData({}))

function handleEdit(index: number, row: Expense) {
  mode.value = 'edit'
  selected_expense = row

  emit('start_edit', row)
}

function onRowClick(data: [Expense, Project]) {
  useRouter().push(`/expenses/${data[0].expense_id}`)
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

          tableKey.value = 'expenses-' + Date.now()
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
