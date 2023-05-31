<template>
  <el-container style="margin: 0!important;">
    <el-aside class="left-sidebar-width shadow-sm">
      <LeftSide
        :is-collapsed="isCollapsed"
        @link-click="onLinkClick"
      />
    </el-aside>

    <el-container>
      <el-header class="shadow-sm">
        <Header
          class="header"
          @toggle_sidebar="toggleSidebar"
        />
      </el-header>

      <el-main class="main">
        <nuxt-loading-indicator/>
        <nuxt-page></nuxt-page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import LeftSide from "~/components/Layout/LeftSide.vue";
import Header from "~/components/Layout/Header.vue";
import {isMobileView} from "~/helpers/dom";

let isCollapsed = ref(false)
let last_clicked_link = ref('')

function onLinkClick(url: string | boolean) {
  if (typeof url === 'string' && isMobileView() && isCollapsed.value) {
    last_clicked_link.value = url
    toggleSidebar(false)
  }
}

function toggleSidebar(state: boolean) {
  isCollapsed.value = state;
}
</script>

<style>
body {
  margin: 0 !important;
  height: 100% !important;
  background-color: #f8f5f5;
}

.left-sidebar-width {
  width: inherit;
}

.main {
  overflow-y: scroll !important;
  overflow-x: hidden;
  height: calc(100vh - 100px) !important;
}

.header {
  top: 0;
  position: sticky;
  background-color: white
}
</style>
