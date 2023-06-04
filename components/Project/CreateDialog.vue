<template>
  <div>
    <el-dialog
      class="create-project-dialog"
      v-model="dialog_state"
      :title="props.mode === 'create' ? 'Create Project' : 'Update Project'"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
    <span>
      <el-form :model="form" label-position="top" :rules="rules" ref="form_ref">
        <el-form-item label="Project Name" prop="name" required>
          <el-input
            v-model="form.name"
            type="text"
            size="large"
            maxlength="150"
            show-word-limit
            :disabled="is_submitting"
            :prefix-icon="ElIconDocument"
            placeholder="Example: Building House"
          />
        </el-form-item>
        <el-form-item label="Project Description" prop="description" required>
          <el-input
            v-model="form.description"
            type="textarea"
            size="large"
            maxlength="150"
            show-word-limit
            :disabled="is_submitting"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :prefix-icon="ElIconDocumentCopy"
            placeholder="Example: Building house for a client XXX-01"
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

enum DialogMode {
  CREATE = 'create',
  EDIT = 'edit'
}

const emit = defineEmits(['input', 'created', 'updated'])
const props = defineProps({
  state: {type: Boolean},
  mode: {type: String as PropType<DialogMode>, default: DialogMode.CREATE},
  project: {type: Object, required: true},
})

let value = toRef(props, 'state')
let project = toRef(props, 'project')
let dialog_state = ref(false)
let is_submitting = ref(false)

const form_ref = ref<FormInstance>()

const form = reactive({
  name: '',
  description: '',
})

const rules = reactive({
  name: [required('name')],
  description: [required('name')],
})

watch(value, val => {
  dialog_state.value = val

  if (props.mode === 'create') {
    form.name = ''
    form.description = ''
  }
})
watch(dialog_state, val => emit('input', val))
watch(project, function (p: LooseObject) {
  form.name = p.name
  form.description = p.description
})

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
  xhrPost(useApiUrl('projects'), form)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your project has been created',
        type: 'success',
      })

      dialog_state.value = false

      emit('created', resp.data)

      form.name = ""
      form.description = ""
    })
    .finally(() => is_submitting.value = false)
}

function update() {
  xhrPut(useApiUrl(`projects/${project.value['project_id']}`), form)
    .then(resp => {
      ElNotification({
        title: 'Success',
        message: 'Your project has been updated',
        type: 'success',
      })

      dialog_state.value = false

      emit('updated', resp.data)

      form.name = ""
      form.description = ""
    })
    .finally(() => is_submitting.value = false)
}
</script>

<style>
.create-project-dialog {
  width: 400px;
}

@media (max-width: 568px) {
  .create-project-dialog {
    width: calc(100vw - 10px);
  }
}
</style>
