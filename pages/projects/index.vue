<template>
  <div class="row">
    <div class="col-md-7">
      <el-card class="box-card">
        <template #header>
          <div class="card-header d-flex justify-content-between">
            <span class="text-uppercase pt-2">Projects</span>
            <el-button
              class="button"
              type="primary"
              :icon="ElIconPlus">
              Create Project
            </el-button>
          </div>
        </template>
        <div class="text item">
          <div style="min-height: calc(100vh - 300px); width: inherit">
            <el-auto-resizer>
              <template #default="{ height, width }">
                <el-table-v2
                  :columns="columns"
                  :data="users"
                  :width="width"
                  :height="height"
                  fixed
                  :data-getter="getter"
                />
              </template>
            </el-auto-resizer>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {reactive} from "vue";

const columns = reactive([
  {title: '#ID', dataKey: 'id', key: 'id', width: 50},
  {title: 'Full Name', dataKey: 'name', key: 'name', width: 200},
  {title: 'Email', dataKey: 'email', key: 'email', width: 200},
  {title: 'Phone Number', dataKey: 'phone_number', key: 'phone_number', width: 150},
  {title: 'Status', dataKey: 'status', key: 'status', width: 150},
  {title: 'Last Updated At', dataKey: 'last_updated', key: 'last_updated', width: 150},
]);

const users = reactive([]);
const user = {
  id: 1,
  name: 'Ahmad Mustapha',
  email: 'me@ahmard.com',
  phone_number: '07011223344',
  status: 'active',
  last_updated: '2023-05-23 09:02'
}

for (let i = 0; i < 100; i++) {
  const u = user
  u.id = i
  // users.push(u)
}

const getter = function (...x: any[]) {
  console.log(x)
}

</script>

<style scoped>

</style>
