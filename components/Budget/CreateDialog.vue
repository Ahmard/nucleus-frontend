<template>
  <div>
    <el-dialog
      destroy-on-close
      v-model="dialog_state"
      :title="props.mode === 'create' ? 'Create Budget' : 'Update Budget'"
      width="380px"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <span>
      <el-form :model="form" label-position="top" :rules="rules" ref="form_ref">
        <el-form-item label="Budgeted Amount" prop="amount" required>
          <el-input
            v-model="form.amount"
            type="text"
            size="large"
            :disabled="is_submitting"
            :prefix-icon="ElIconMoney"
            placeholder="Example: 100,000"
            clearable
          />
        </el-form-item>

        <div class="row">
          <div class="col-md-6">
            <combobox
              :multiple="false"
              :items="months"
              name="month"
              text-key="text"
              value-key="id"
              label="Month"
              placeholder="Choose Month"
              :value="form.month"
              @change="v => form.month = v"
            />
          </div>
          <div class="col-md-6">
            <el-form-item label="Year" prop="year" required>
              <el-input
                v-model="form.year"
                type="number"
                size="large"
                :disabled="true"
                clearable
              />
            </el-form-item>
          </div>
        </div>

        <el-form-item label="Budget Comment" prop="comment">
          <el-input
            v-model="form.comment"
            type="textarea"
            size="large"
            maxlength="1000"
            show-word-limit
            :disabled="is_submitting"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :prefix-icon="ElIconDocumentCopy"
            placeholder="Comment for this budget"
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
import {formatInputValue, removeCommas} from "~/helpers/form";
import {cloneDeep} from "lodash";
import {from_cent} from "~/helpers/monetery";
import {generateMonthOptions, getMonthName} from "~/helpers/date_time";

enum DialogMode {
  CREATE = 'create',
  EDIT = 'edit'
}

const emit = defineEmits(['input', 'created', 'updated'])
const props = defineProps({
  state: {type: Boolean},
  mode: {type: String as PropType<DialogMode>, default: DialogMode.CREATE},
  budget: {type: Object, required: true},
})

let value = toRef(props, 'state')
let budget = toRef(props, 'budget')
let dialog_state = ref(false)
let is_submitting = ref(false)

const form_ref = ref<FormInstance>()
const date = new Date()

const form = reactive({
  amount: '',
  comment: '',
  month: date.getMonth(),
  year: date.getFullYear(),
})

const amount = toRef(form, 'amount')
const months = generateMonthOptions()

const rules = reactive({
  amount: [required('amount')],
  month: [required('month')],
  year: [required('year')],
})

watch(value, val => {
  if (props.mode === 'create') {
    form.amount = ''
    form.comment = ''
    form.month = date.getMonth()
    form.year = date.getFullYear()
  }

  dialog_state.value = val
})
watch(dialog_state, val => emit('input', val))
watch(budget, function (p: LooseObject) {
  form.amount = from_cent(p.amount).toString()
  form.comment = p.comment
  form.year = p.year
  form.month = {
    id: p.month,
    text: getMonthName(p.month)
  }
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

function clean_up_form() {
  form.amount = ""
  form.comment = ""
  form.month = date.getMonth()
  form.year = date.getFullYear()
}

function create() {
  const payload = cloneDeep(form)
  // @ts-ignore
  payload.amount = removeCommas(payload.amount, true)

  xhrPost(useApiUrl('budgets'), payload)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your budget has been created',
        type: 'success',
      })

      dialog_state.value = false

      emit('created', resp.data)

      clean_up_form()
    })
    .finally(() => is_submitting.value = false)
}

function update() {
  const payload = cloneDeep(form)
  // @ts-ignore
  payload.amount = removeCommas(payload.amount, true)

  xhrPut(useApiUrl(`budgets/${budget.value['budget_id']}`), payload)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your budget has been updated',
        type: 'success',
      })

      dialog_state.value = false

      emit('updated', resp.data)

      clean_up_form()
    })
    .finally(() => is_submitting.value = false)
}
</script>

<style scoped>

</style>
