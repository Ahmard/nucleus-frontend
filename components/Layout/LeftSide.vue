<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo pt-2"
    :class="{'collapsed': props.isCollapsed}"
    :collapse="isCollapsed"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="px-3">
      <img
        class="log top-logo"
        :class="{'collapsed': props.isCollapsed}"
        src="/nucleus-logo-80x50.png"
        alt=""
      />
    </div>
    <el-menu-item index="1" @click="rr('/')">
      <el-icon>
        <el-icon-house/>
      </el-icon>
      <span>Dashboard</span>
    </el-menu-item>
    <el-menu-item index="2" @click="rr('/projects')">
      <el-icon>
        <el-icon-menu/>
      </el-icon>
      <span>Projects</span>
    </el-menu-item>
    <el-menu-item index="2" @click="rr('/expenses')">
      <el-icon>
        <el-icon-wallet/>
      </el-icon>
      <span>Expenses</span>
    </el-menu-item>
    <el-menu-item index="2" @click="rr('/todos')">
      <el-icon>
        <el-icon-list/>
      </el-icon>
      <span>Todo</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {rr} from "~/helpers/url";

const props = defineProps({
  isCollapsed: Boolean
})

// let isCollapsed  = false;


function handleOpen() {

}

function handleClose() {

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
