<template>
  <div>
    <el-dialog
      v-model="dialog_state"
      :title="props.mode === 'create' ? 'Create Expense' : 'Update Expense'"
      width="380px"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <span>
      <el-form :model="form" label-position="top" :rules="rules" ref="form_ref">
        <el-form-item label="Spending Amount" prop="amount" required>
          <el-input
            v-model="form.amount"
            type="text"
            size="large"
            maxlength="150"
            show-word-limit
            :disabled="is_submitting"
            :prefix-icon="ElIconDocument"
            placeholder="Example: 1000"
            clearable
          />
        </el-form-item>
        <el-form-item label="Spending Time" prop="spent_at" required>
          <el-date-picker
            class="w-100"
            size="large"
            v-model="form.spent_at"
            type="datetime"
            format="DD-MM-YYYY HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select date and time"
            :shortcuts="date_shortcut()"
          />
        </el-form-item>

        <combobox
          :multiple="false"
          text-key="name"
          name="project_id"
          value-key="project_id"
          label="Choose Project"
          :endpoint="project_endpoint"
          v-model="form.project_id"
          @change="v => form.project_id = v"
        />

        <el-form-item label="Spending Narration" prop="narration" required>
          <el-input
            v-model="form.narration"
            type="textarea"
            size="large"
            maxlength="1000"
            show-word-limit
            :disabled="is_submitting"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :prefix-icon="ElIconDocumentCopy"
            placeholder="Example: Bought back & front doors"
          />
        </el-form-item>
      </el-form>
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button native-type="button" @click="hideDialog">Cancel</el-button>
        <el-button
          native-type="button"
          type="primary"
          @click="submitForm(form_ref)"
          :icon="ElIconCircleCheck"
          :loading="is_submitting">
          {{ props.mode === 'edit' ? 'Update' : 'Create' }}
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {required} from "~/helpers/from_validation";
import {FormInstance} from "element-plus";
import {xhrPost, xhrPut} from "~/helpers/xhr";
import {useApiUrl} from "~/composables/url";
import {PropType} from "@vue/runtime-core";
import {LooseObject} from "~/types/loose.object";
import {date_shortcut, formatInputValue, removeCommas} from "~/helpers/form";
import {cloneDeep} from "lodash";
import {from_cent} from "~/helpers/monetery";
import {Expense} from "~/models/expense";

enum DialogMode {
  CREATE = 'create',
  EDIT = 'edit'
}

const emit = defineEmits(['input', 'created', 'updated'])
const props = defineProps({
  state: {type: Boolean},
  mode: {type: String as PropType<DialogMode>, default: DialogMode.CREATE},
  expense: {type: Object, required: true},
})

let value = toRef(props, 'state')
let expense = toRef(props, 'expense')
let dialog_state = ref(false)
let is_submitting = ref(false)

const project_endpoint = useApiUrl('projects')
const form_ref = ref<FormInstance>()

const date = new Date()
const form = reactive({
  amount: '',
  narration: '',
  project_id: '',
  spent_at: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${new Date().toLocaleTimeString()}`,
})

const amount = toRef(form, 'amount')

const rules = reactive({
  amount: [required('amount')],
  spent_at: [required('spent_at')],
  project_id: [required('spent_at')],
  narration: [required('amount')],
})

watch(value, val => dialog_state.value = val)
watch(dialog_state, val => emit('input', val))
watch(expense, function (p: LooseObject) {
  form.amount = from_cent(p[0].amount).toString()
  form.spent_at = p[0].spent_at
  form.narration = p[0].narration
  form.project_id = p[0].project_id
})

watch(amount, value1 => form.amount = formatInputValue(value1))

function hideDialog() {
  dialog_state.value = false
}

async function submitForm(el_form: FormInstance) {
  await el_form.validate((is_valid, fields) => {
    if (is_valid) {
      is_submitting.value = true

      if (props.mode === DialogMode.CREATE) {
        create();
      }

      if (props.mode === DialogMode.EDIT) {
        update();
      }
    }
  })
}

function create() {
  const payload = cloneDeep(form)
  // @ts-ignore
  payload.amount = removeCommas(payload.amount)
  payload.spent_at = Expense.cleanupTimestamp(payload.spent_at)

  xhrPost(useApiUrl('expenses'), payload)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your expense has been created',
        type: 'success',
      })

      dialog_state.value = false

      emit('created', resp.data)

      form.amount = ""
      form.spent_at = ""
      form.narration = ""
    })
    .finally(() => is_submitting.value = false)
}

function update() {
  const payload = cloneDeep(form)
  // @ts-ignore
  payload.amount = removeCommas(payload.amount)
  payload.spent_at = Expense.cleanupTimestamp(payload.spent_at)

  xhrPut(useApiUrl(`expenses/${expense.value[0]['expense_id']}`), payload)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your expense has been updated',
        type: 'success',
      })

      dialog_state.value = false

      emit('updated', resp.data)

      form.amount = ""
      form.spent_at = ""
      form.narration = ""
    })
    .finally(() => is_submitting.value = false)
}
</script>

<style scoped>

</style>
