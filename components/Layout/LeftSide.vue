<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo pt-2"
    :class="{ 'collapsed': props.isCollapsed }"
    :collapse="isCollapsed"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="px-3">
      <img
        class="log top-logo"
        :class="{ 'collapsed': props.isCollapsed }"
        src="/nucleus-logo-80x50.png"
        alt=""
      />
    </div>
    <el-menu-item index="1" @click="onLinkClick('/')">
      <el-icon>
        <el-icon-house/>
      </el-icon>
      <template #title>Dashboard</template>
    </el-menu-item>
    <el-menu-item index="2" @click="onLinkClick('/projects')">
      <el-icon>
        <el-icon-menu/>
      </el-icon>
      <template #title>Projects</template>
    </el-menu-item>
    <el-menu-item index="3" @click="onLinkClick('/budgets')">
      <el-icon>
        <el-icon-money/>
      </el-icon>
      <template #title>Budgets</template>
    </el-menu-item>
    <el-menu-item index="4" @click="onLinkClick('/expenses')">
      <el-icon>
        <el-icon-wallet/>
      </el-icon>
      <template #title>Expenses</template>
    </el-menu-item>
    <el-menu-item index="5" @click="onLinkClick('/todos')">
      <el-icon>
        <el-icon-list/>
      </el-icon>
      <template #title>Todo</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>

import {rr} from "~/helpers/url";

const emit = defineEmits(['linkClick'])
const props = defineProps({
  isCollapsed: Boolean
})

function handleOpen() {

}

function handleClose() {

}

function onLinkClick(url: string) {
  emit('linkClick', url)
  rr(url)
}
</script>

<style>
.el-menu-vertical-demo {
  min-height: calc(100vh - 1px) !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
}

.top-logo.collapsed {
  width: 30px;
}

.left-sidebar-width.collapsed {
  width: 50px;
}
</style>
