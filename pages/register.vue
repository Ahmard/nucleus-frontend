<template>
  <div class="mt-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-sm-6 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
        <el-card class="box-card link-dark">
          <!--          <div class="text-end">-->
          <!--            <nuxt-link to="/register" class="link-secondary">Register</nuxt-link>-->
          <!--          </div>-->
          <div class="text item p-4">
            <div class="text-center">
              <el-image src="/nucleus-logo-130x80.png">
                <template #error>
                  <div class="image-slot">
                    <el-icon size="100">
                      <el-icon-picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
            <el-form class="mt-3" :model="form" :rules="rules" ref="ref_reg_form">
              <div class="row">
                <div class="col-md-6">
                  <el-form-item size="large" prop="first_name" label-width="0">
                    <label for="first_name">First Name</label>
                    <el-input
                      type="text"
                      id="first_name"
                      :prefix-icon="User"
                      v-model="form.first_name"
                      :disabled="submitting"
                      placeholder="Ex: Jane"
                    />
                  </el-form-item>
                </div>
                <div class="col-md-6">
                  <el-form-item size="large" prop="last_name" label-width="0">
                    <label for="last_name">Last Name</label>
                    <el-input
                      type="text"
                      id="last_name"
                      :prefix-icon="User"
                      v-model="form.last_name"
                      :disabled="submitting"
                      placeholder="Ex: Doe"
                    />
                  </el-form-item>
                </div>
              </div>

              <el-form-item size="large" prop="email" label-width="0">
                <label for="email">Email</label>
                <el-input
                  type="email"
                  id="email"
                  v-model="form.email"
                  :prefix-icon="Message"
                  :disabled="submitting"
                  placeholder="Ex: jane.doe@example.net"
                />
              </el-form-item>

              <div class="row">
                <div class="col-md-6">
                  <el-form-item size="large" prop="password" label-width="0">
                    <label for="password">Password</label>
                    <el-input
                      type="password"
                      show-password
                      id="password"
                      :prefix-icon="Key"
                      v-model="form.password"
                      :disabled="submitting"
                      placeholder="Something secret"
                    />
                  </el-form-item>
                </div>
                <div class="col-md-6">
                  <el-form-item size="large" prop="password_confirmation" label-width="0">
                    <label for="password_confirmation">Confirm Password</label>
                    <el-input
                      type="password"
                      show-password
                      :prefix-icon="Key"
                      :disabled="submitting"
                      id="password_confirmation"
                      v-model="form.password_confirmation"
                      placeholder="Confirm your password"
                    />
                  </el-form-item>
                </div>
              </div>

              <el-form-item label-width="0" size="large" style="margin-top: 30px">
                <el-button
                  native-type="submit"
                  type="primary"
                  class="w-100 el-button-primary"
                  :loading="submitting"
                  @click.prevent="submitForm(ref_reg_form)">Create Account
                </el-button>
              </el-form-item>

              <div class="text-center">Or continue with</div>
              <div class="mt-3">
                <div class="d-flex justify-content-between">
                  <el-button type="primary" class="w-100" size="large" :disabled="submitting">
                    <img src="/microsoft-window-logo.png" style="height: 20px;width: 20px" alt=""> Microsoft Account
                  </el-button>
                </div>
              </div>
              <div class="text-start mt-3">
                Have an account?
                <nuxt-link to="/login" class="link-secondary">Login</nuxt-link>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {Key, Message, User} from '@element-plus/icons-vue'
import {useApiUrl} from "~/composables/url";
import {xhrPost} from "~/helpers/xhr";
import {email, length, required} from "~/helpers/from_validation";
import {FormInstance} from "element-plus";

setPageLayout('plain');

definePageMeta({
  middleware: 'guest'
})

const ref_reg_form = ref<FormInstance>()
let submitting = ref(false);

const form = reactive({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
})

const rules = reactive({
  first_name: [required('first name'), length('first name', 3, 150)],
  last_name: [required('last name'), length('first name', 3, 150)],
  email: [email('email')],
  password: [required('password'), length('first name', 3, 30)],
  password_confirmation: [required('password_confirmation'), length('first name', 3, 30)],
})


async function submitForm(el_form: FormInstance) {
  await el_form.validate((is_valid, fields) => {
    if (is_valid) {
      submitting.value = true;

      xhrPost(useApiUrl('auth/register'), form)
        .then(() => {
          ElMessage({
            message: 'Your account has been created successfully',
            type: 'success',
            duration: 10 * 1000,
            center: true,
            showClose: true,
          })

          useRouter().push("/login");
        })
        .finally(() => submitting.value = false)
    }
  })
}
</script>

<style scoped>

</style>

