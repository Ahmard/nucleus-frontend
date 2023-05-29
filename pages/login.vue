<template>
  <div class="mt-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-sm-6 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
        <el-card class="box-card link-dark">
          <!--          <div class="text-end">-->
          <!--            <nuxt-link to="/register" class="link-secondary">Register</nuxt-link>-->
          <!--          </div>-->
          <div class="text item p-4">
            <div class="text-center">
              <nuxt-link to="/">
                <el-image src="/nucleus-logo-130x80.png">
                  <template #error>
                    <div class="image-slot">
                      <el-icon size="100">
                        <el-icon-picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </nuxt-link>
            </div>
            <el-form class="mt-3" @submit.prevent="submitForm">
              <el-form-item size="large" prop="email" label-width="0">
                <label for="email">Email</label>
                <el-input
                  v-model="form.email"
                  type="email"
                  :disabled="submitting"
                  :prefix-icon="Message"
                  placeholder="Ex: me@ahmard.com"
                />
              </el-form-item>

              <el-form-item size="large" prop="password" label-width="0">
                <label for="password">Password</label>
                <el-input
                  v-model="form.password"
                  type="password"
                  :disabled="submitting"
                  :prefix-icon="Key"
                  show-password
                  placeholder="Ex: 1234"
                />
              </el-form-item>

              <el-form-item label-width="0" size="large" style="margin-top: 30px">
                <el-button
                  native-type="submit"
                  type="primary"
                  class="w-100"
                  :loading="submitting">
                  Login
                </el-button>
              </el-form-item>

              <div class="text-center">Or continue with</div>
              <div class="mt-3">
                <div class="d-flex justify-content-between">
                  <el-button type="primary" class="w-100" size="large">
                    <img src="/microsoft-window-logo.png" style="height: 20px;width: 20px" alt=""> Microsoft Account
                  </el-button>
                </div>
              </div>
              <div class="text-start mt-3">
                Not a member?
                <nuxt-link to="/register" class="link-secondary">Register Now</nuxt-link>
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
import {Key, Message} from '@element-plus/icons-vue'
import {axiosHandleError} from "~/helpers/xhr";

setPageLayout('plain');

definePageMeta({
  middleware: 'guest'
})

const nuxt = useNuxtApp();
const submitting = ref(false);
const form = reactive({
  email: '',
  password: '',
})

const rules = []

async function submitForm() {
  submitting.value = true;

  nuxt.$auth.loginWith('laravelJWT', {body: form})
    .then(resp => {
      ElMessage({
        message: 'Logged in successfully',
        type: 'success',
        duration: 5 * 1000,
        center: true,
        showClose: true,
      })

      setTimeout(() => {
        window.location.href = localStorage.getItem('auth.redirect') ?? '/'
      }, 1500);
    })
    .catch(axiosHandleError)
    .finally(() => submitting.value = false)

}

</script>

<style scoped>

</style>

